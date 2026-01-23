import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem, Card, CardContent } from "@mui/material";
import { Box, styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import endpoints from "../../utils/apiEndPoints";
import { apiRequest } from "../../utils/apiclient";

// const StyledTableContainer = styled(TableContainer)({
//   maxWidth: "90%",
//   margin: "20px auto",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//   borderRadius: "10px",
//   overflow: "hidden",
// });

// const StyledTableHead = styled(TableHead)({
//   backgroundColor: "#3f51b5",
//   "& th": {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(even)": {
    backgroundColor: "#E7EBF0",
  },
});

type MachineMaster = {
  machine_id?: number; 
  id?: number; 
  machine_name: string;
  machine_type: string;
  amc_type: string;
  vendor: string;
  created_at: string;
  updated_at: string;
};


const MachineTable: React.FC = () => {
    const [machines, setMachines] = useState<MachineMaster[]>([]);
const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
useEffect(() => {
  setLoading(true); // ✅ Start loading before fetch

  apiRequest<{ success: boolean; data: { "Machine Master": MachineMaster[] } }>(
    'GET',
    endpoints.getMachineMaster
  )
    .then((data) => {
      if (data.success && Array.isArray(data.data["Machine Master"])) {
        setMachines(data.data["Machine Master"]);
      }
    })
    .catch((error) => console.error("Error fetching machine data:", error))
    .finally(() => setLoading(false)); // ✅ Stop loading when fetch is done
}, []);



  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<MachineMaster | null>(null);
  const [newMachine, setNewMachine] = useState<MachineMaster>({
    machine_id: 0,  // ✅ Ensure id is present
    id:0,
    machine_name: "",
    machine_type: "",
    amc_type: "",
    vendor: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
});

  
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (machine: MachineMaster) => {
    setSelectedMachine(machine);
    setOpenEdit(true);
  };
  const handleOpenVisible = (machine: MachineMaster) => {
    console.log("Navigating with Machine ID:", machine.id);
    navigate("/maintenancerecordid", { state: { machineId: machine.id } });
  };

  const handleOpenVisible2 = (machine: MachineMaster) => {
    console.log("Navigating with Machine ID:", machine.id);
    navigate("/maintenancematerialid", { state: { machineId: machine.id } });
  };
  
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (machine: any) => {
    if (!machine || !machine.id) {
      console.error("Invalid machine data:", machine);
      return;
    }
  
    // Ensure the object contains `machine_id`
    const formattedMachine = {
      ...machine,
      machine_id: machine.id, // Rename "id" to "machine_id"
    };
  
    setSelectedMachine(formattedMachine);
    setOpenDelete(true);
  };
  
  const handleCloseDelete = () => setOpenDelete(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false); // ✅ Add missing state
  

const handleAddMachineMaster = () => {
    const formattedMachine = {
        ...newMachine,
        machine_type: newMachine.machine_type, // Convert to uppercase
    };

    console.log("Submitting Machine:", formattedMachine); // Debug log

    apiRequest<{ success: boolean; id?: number; message?: string }>( // ✅ Make 'message' optional
      "POST",
      endpoints.addMachineMaster,
      formattedMachine
    )
      .then((data) => {
        if (data.success) {
          setMachines([...machines, { ...formattedMachine, machine_id: data.id || 0 }]); // ✅ Fallback id
          setOpenAdd(false);
          setNewMachine({
            machine_id: 0,
            machine_name: "",
            machine_type: "",
            amc_type: "",
            vendor: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        } else {
          alert(`Error: ${data.message ?? "Unknown error occurred"}`); // ✅ Use optional chaining
        }
      })
      .catch((error) => console.error("Error adding machine:", error));
}

const handleUpdateMachine = async () => {
  if (!selectedMachine) {
    console.error("No machine selected!");
    return;
  }

  // Ensure `machine_id` is assigned properly
  const updatedMachine = {
    ...selectedMachine,
    machine_id: selectedMachine.machine_id ?? selectedMachine.id, // Ensure machine_id is set
  };

  if (!updatedMachine.machine_id) {
    console.error("Machine ID is missing or invalid!", updatedMachine);
    return;
  }

  console.log("Updating machine:", updatedMachine);

  try {
    const data = await apiRequest<{ success: boolean; message?: string }>(
      "PUT",
      endpoints.updateMachineMaster, // ✅ Use predefined endpoint
      updatedMachine
    );

    if (data.success) {
      console.log("Machine updated successfully:", data);
      window.location.reload(); // ❌ Consider removing this, instead update state dynamically
      handleCloseEdit();
    } else {
      console.error("Update failed:", data.message ?? "Unknown error");
    }
  } catch (error) {
    console.error("Error updating machine:", error);
  }
};




const handleDeleteMachine = async () => {
  if (!selectedMachine || typeof selectedMachine.id !== "number") {
    console.error("Machine ID is missing or invalid!", selectedMachine);
    return;
  }

  try {
    const data = await apiRequest<{ success: boolean; message?: string }>(
      "DELETE",
      `${endpoints.deleteMachineMaster}?id=${selectedMachine.id}`
    );

    if (data.success) {
      console.log("✅ Machine deleted successfully:", data);
      
      handleCloseDelete(); // ✅ Close the modal first

      // ✅ Refresh the page after a short delay for a smoother UX
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } else {
      console.error("❌ Delete failed:", data.message ?? "Unknown error");
      alert(`❌ Error: ${data.message ?? "Deletion failed."}`);
    }
  } catch (error) {
    console.error("🚨 Error deleting machine:", error);
    alert("⚠️ An error occurred while deleting the machine.");
  }
};



 

  return (
    <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
      4px 4px 20px 0px #6F8CB069,
      -6px -6px 20px 0px #FFFFFF,
      2px 2px 4px 0px #728EAB1A
      `, p: 2 }}>
        <CardContent>
    <Paper elevation={3} style={{
      margin: "20px auto",
      borderRadius: "10px",
      background: "#E7EBF0",
      // boxShadow:
        // "4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A",
        backgroundColor: "#E7EBF0",
        paddingBottom:10,
         padding:"20px 20px"
    }}>
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button variant="contained" color="primary"  onClick={handleOpenAdd}  sx={{
      minWidth: 120,
      bgcolor: "#E7EBF0",
      color:"black",
      border:"1px solid grey",
      boxShadow:
        "4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A",
    }}>
                Add Machine
              </Button>
            </Box>
      
            <TableContainer component={Paper}
              sx={{
                bgcolor: "#E7EBF0",
                p: 1,
                maxWidth: "100%",
                overflowX: "auto",
                whiteSpace: "nowrap",
                "&::-webkit-scrollbar": {
                  height: "5px", // Adjusts the horizontal scrollbar height
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },  
              }}>
    {loading ? (
      <div>Loading...</div> // ✅ Show loader when fetching
    ) : (
      <Table>
         <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>Machine Name</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Machine Type</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>AMC Type</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Vendor</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Maintenance Record</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Maintenance Material</TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center",fontWeight:"bold" }}>Actions</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.length > 0 ? (
            machines.map((machine, index) => (
              <StyledTableRow key={index}>
                <TableCell>{machine.machine_name}</TableCell>
                <TableCell>{machine.machine_type}</TableCell>
                <TableCell>{machine.amc_type}</TableCell>
                <TableCell>{machine.vendor || "N/A"}</TableCell>
                
                <TableCell sx={{  textAlign: "center" }}>

<IconButton   color="primary"  onClick={() => handleOpenVisible(machine)} >
<VisibilityIcon style={{color:"grey"}}/>
</IconButton>

</TableCell>

<TableCell sx={{  textAlign: "center" }}>

<IconButton   color="primary"  onClick={() => handleOpenVisible2(machine)} >
<VisibilityIcon style={{color:"grey"}}/>
</IconButton>

</TableCell>
                <TableCell>
                {/* Edit Button */}
                <IconButton   color="primary"  onClick={() => handleOpenEdit(machine)} >
                <EditIcon style={{color:"grey"}}/>
                </IconButton>

                 <IconButton color="secondary" onClick={() => handleOpenDelete(machine)} >
                  <DeleteIcon style={{color:"grey"}}/>
                  </IconButton>

                  </TableCell>

              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} style={{ textAlign: "center" }}>
                No Machines Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )}
  </TableContainer>

  {/* 🔹 Add Machine Dialog */}
      {/* 🔹 Add Machine Dialog */}
<Dialog open={openAdd} onClose={handleCloseAdd}>
  <DialogTitle>Add New Machine</DialogTitle>
  <DialogContent>
    {/* Machine Name */}
    <TextField
        label="Machine Name"
        fullWidth
        margin="dense"
        value={newMachine.machine_name}
        onChange={(e) =>
            setNewMachine((prev) => ({ ...prev, machine_name: e.target.value }))
        }
        />


    {/* Machine Type Dropdown */}
    <TextField
      label="Machine Type"
      select
      fullWidth
      margin="dense"
      value={newMachine.machine_type}
      onChange={(e) =>
        setNewMachine({ ...newMachine, machine_type: e.target.value })
      }
    >
     <MenuItem value="Electrical Machine" >Electrical</MenuItem>
      <MenuItem value="Mechanical Machine">Mechanical</MenuItem>
      <MenuItem value="Production Machine">Production</MenuItem>

    </TextField>

    {/* AMC Type Dropdown */}
    <TextField
      label="AMC Type"
      select
      fullWidth
      margin="dense"
      value={newMachine.amc_type}
      onChange={(e) =>
        setNewMachine({ ...newMachine, amc_type: e.target.value })
      }
    >
      <MenuItem value="Comprehensive">Comprehensive</MenuItem>
      <MenuItem value="Non-Comprehensive">Non-Comprehensive</MenuItem>
      <MenuItem value="Non-AMC">Non-AMC</MenuItem>
    </TextField>

    {/* Vendor Name */}
    <TextField
      label="Vendor"
      fullWidth
      margin="dense"
      value={newMachine.vendor}
      onChange={(e) =>
        setNewMachine({ ...newMachine, vendor: e.target.value })
      }
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAdd} color="secondary">
      Cancel
    </Button>
    <Button color="primary" onClick={handleAddMachineMaster}>
      Add
    </Button>
  </DialogActions>
</Dialog>


      {/* 🔹 Edit Machine Dialog */}
  {/* 🔹 Edit Machine Dialog */}
<Dialog open={openEdit} onClose={handleCloseEdit}>
  <DialogTitle>Edit Machine</DialogTitle>
  <DialogContent>
    {/* Machine Name */}
    <TextField
      label="Machine Name"
      fullWidth
      margin="dense"
      value={selectedMachine?.machine_name || ""}
      onChange={(e) =>
        setSelectedMachine((prev) => prev ? { ...prev, machine_name: e.target.value } : null)
      }
    />

    {/* Machine Type Dropdown */}
    <TextField
      label="Machine Type"
      select
      fullWidth
      margin="dense"
      value={selectedMachine?.machine_type || ""}
      onChange={(e) =>
        setSelectedMachine((prev) => prev ? { ...prev, machine_type: e.target.value } : null)
      }
    >
      <MenuItem value="Electrical Machine">Electrical</MenuItem>
      <MenuItem value="Mechanical Machine">Mechanical</MenuItem>
      <MenuItem value="Production Machine">Production</MenuItem>
    </TextField>

    {/* AMC Type Dropdown */}
    <TextField
      label="AMC Type"
      select
      fullWidth
      margin="dense"
      value={selectedMachine?.amc_type || ""}
      onChange={(e) =>
        setSelectedMachine((prev) => prev ? { ...prev, amc_type: e.target.value } : null)
      }
    >
      <MenuItem value="Comprehensive">Comprehensive</MenuItem>
      <MenuItem value="Non-Comprehensive">Non-Comprehensive</MenuItem>
      <MenuItem value="Non-AMC">Non-AMC</MenuItem>
    </TextField>

    {/* Vendor */}
    <TextField
      label="Vendor"
      fullWidth
      margin="dense"
      value={selectedMachine?.vendor || ""}
      onChange={(e) =>
        setSelectedMachine((prev) => prev ? { ...prev, vendor: e.target.value } : null)
      }
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={handleCloseEdit} color="secondary">
      Cancel
    </Button>
    <Button color="primary" onClick={handleUpdateMachine}>
      Update
    </Button>
  </DialogActions>
</Dialog>



      {/* 🔹 Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
  <DialogTitle>Delete Machine</DialogTitle>
  <DialogContent>
    Are you sure you want to delete "{selectedMachine?.machine_name}"?
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDelete} color="secondary">
      Cancel
    </Button>
    <Button
      onClick={async () => {
        await handleDeleteMachine(); // ✅ Ensure delete runs before closing
      }}
      color="error"
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>


    </Paper>
    </CardContent>
     </Card>
  );
};

export default MachineTable;
