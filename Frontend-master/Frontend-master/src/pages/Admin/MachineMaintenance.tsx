import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Card, CardContent } from "@mui/material";
import { Box, styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

interface MaintenanceRecord {
    [x: string]: any;
    maintenance_id: number;  // ✅ Corrected from "id" to "maintenance_id"
    description: string;
    machine: number; 
    machine_id: number;
    created_at: string;
    updated_at: string;
}

  
  

// interface Props {
//     machines: MachineMaster[]; // ✅ Use `MachineMaster` interface
//   }


// const machines: MachineMaster[] = [
//   {
//     machine_name: "Lathe Machine",
//     machine_type: "CNC",
//     amc_type: "Full",
//     vendor: "ABC Engineering",
//     created_at: "2024-03-10",
//     updated_at: "2024-03-11",
//   },
// ];


const MachineMaintenanceTable: React.FC = () => {
    // const [machines, setMachines] = useState<MaintenanceRecord[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState("");
// const [maintenanceRecords, setMaintenanceRecords] = useState([]);
const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);


//   const [error, setError] = useState<string | null>(null);
useEffect(() => {
  setLoading(true);
  setError(""); // Reset error on new fetch

  apiRequest<{ success: boolean; data: { Employee: MaintenanceRecord[] } }>(
    "GET",
    endpoints.getMaintenanceRecords
  )
    .then((data) => {
      console.log("Fetched Data:", data); // Debugging log

      if (data.success && Array.isArray(data.data?.Employee)) {
        setMaintenanceRecords(
          data.data.Employee.map((record) => ({
            maintenance_id: record.id,
            description: record.description || "No description",
            machine: record.machine || 0, // ✅ From API
            machine_id: record.machine || 0, // ✅ Mirror `machine` ➝ `machine_id`
            created_at: record.created_at
              ? new Date(record.created_at).toLocaleString()
              : "N/A",
            updated_at: record.updated_at
              ? new Date(record.updated_at).toLocaleString()
              : "N/A",
          }))
        );
      } else {
        setMaintenanceRecords([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching maintenance records:", err);
      setError(err.message);
    })
    .finally(() => setLoading(false));
}, []);





  
  

//   const [formData, setFormData] = useState<MachineMaster>({
//     id: 0, // ✅ Ensure id exists
//     machine_name: "",
//     machine_type: "",
//     amc_type: "",
//     vendor: "",
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   });
  


  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<MaintenanceRecord | null>(null);
  const [newMachine, setNewMachine] = useState<MaintenanceRecord>({
    maintenance_id: 0,  // ✅ Renamed from "id" to "maintenance_id"
    description: "",
    machine:0,
    machine_id: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
});



  
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (machine: MaintenanceRecord) => {
    setSelectedMachine(machine);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (machine: MaintenanceRecord) => {
    setSelectedMachine(machine);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false); // ✅ Add missing state
  

// const handleAddMachineMaster = () => {
//     const formattedMachine = {
//         ...newMachine,
//         machine_type: newMachine.machine_type.toUpperCase(), // Convert to uppercase
//     };

//     console.log("Submitting Machine:", formattedMachine); // Debug log

//     fetch("http://43.204.203.153:8000/machine-master/create-machine-master/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formattedMachine),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             setMachines([...machines, { ...formattedMachine, id: data.id }]);
//             setOpenAdd(false);
//             setNewMachine({
//                 id: 0,
//                 description: "",
//                 machine_id: 0,
//                 created_at: new Date().toISOString(),
//                 updated_at: new Date().toISOString(),
//             });
            
//         } else {
//             alert(`Error: ${data.message}`);
//         }
//     })
//     .catch(error => console.error("Error adding machine:", error));
// };

const handleAddMaintenanceRecord = async () => {
  const formattedData = {
    description: newMachine.description,
    machine: newMachine.machine_id, // ✅ Correct field name for API
    created_at: newMachine.created_at,
    updated_at: newMachine.updated_at,
  };

  try {
    const data = await apiRequest<{ success: boolean; data: MaintenanceRecord }>(
      "POST",
      endpoints.addMaintenanceRecord,
      formattedData
    );

    if (data.success) {
      console.log("✅ Record Added Successfully:", data);
      setMaintenanceRecords((prev) => [...prev, data.data]);
      handleCloseAdd();
      window.location.reload();
    } else {
      console.error("❌ Error: Maintenance record creation failed.");
    }
  } catch (error) {
    console.error("🚨 Error adding maintenance record:", error);
  }
};


  
const handleUpdate = async () => {
  if (!selectedMachine || typeof selectedMachine.maintenance_id !== "number" || selectedMachine.maintenance_id <= 0) {
    alert("Please enter a valid Maintenance ID!");
    return;
  }

  if (!selectedMachine.machine_id || selectedMachine.machine_id <= 0) {
    alert("Please enter a valid Machine ID!");
    return;
  }

  const updateData = {
    maintenance_id: selectedMachine.maintenance_id,
    machine: selectedMachine.machine_id,
    description: selectedMachine.description || "No description",
    updated_at: new Date().toISOString(), // ✅ Send only updated_at
  };

  console.log("Sending update request:", updateData);

  try {
    const data = await apiRequest<{ success: boolean }>(
      "PUT",
      endpoints.updateMaintenanceRecord,
      updateData
    );

    if (data.success) {
      console.log("Maintenance Record Updated:", data);
      handleCloseEdit();
      window.location.reload();
    } else {
      console.error("Update failed:", data);
      alert("Failed to update the maintenance record.");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("An error occurred while updating the record.");
  }
};


  
const handleDelete = async () => {
  if (!selectedMachine?.maintenance_id || selectedMachine.maintenance_id <= 0) {
    alert("Please select a valid Maintenance Record to delete!");
    return;
  }

  console.log("Deleting Maintenance ID:", selectedMachine.maintenance_id);

  try {
    const data = await apiRequest<{ success: boolean }>(
      "DELETE",
      `${endpoints.deleteMaintenanceRecord}?maintenance_id=${selectedMachine.maintenance_id}`
    );

    if (data.success) {
      console.log("Maintenance Record Deleted:", data);
      alert("Maintenance record deleted successfully.");
      handleCloseDelete();
      window.location.reload(); // Refresh the page after deletion
    } else {
      console.error("Delete failed:", data);
      alert("Failed to delete the maintenance record.");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("An error occurred while deleting the record.");
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
              <Button variant="contained" color="primary"  onClick={handleOpenAdd}
               sx={{
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
      
            <TableContainer
             component={Paper}
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
    <div>Loading...</div> // ✅ Show loader
  ) : error ? (
    <div style={{ color: "red", textAlign: "center" }}>{error}</div> // ❌ Show error
  ) : (
    <Table stickyHeader>
  <TableHead>
    <TableRow>
      <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
      <TableCell sx={{ fontWeight: "bold" }}>Machine</TableCell>
      <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {maintenanceRecords.length > 0 ? (
      maintenanceRecords.map((record, index) => (
        <StyledTableRow key={index}>
          <TableCell>{record.description}</TableCell>
          <TableCell>{record.machine}</TableCell> {/* ✅ Changed */}
          <TableCell>
            <IconButton color="primary" onClick={() => handleOpenEdit(record)}>
              <EditIcon style={{ color: "grey" }} />
            </IconButton>
            <IconButton color="secondary" onClick={() => handleOpenDelete(record)}>
              <DeleteIcon style={{ color: "grey" }} />
            </IconButton>
          </TableCell>
        </StyledTableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6} style={{ textAlign: "center" }}>
          No Maintenance Records Found
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
  <DialogTitle>Add Maintenance Record</DialogTitle>
  <DialogContent>
    {/* ID (Read-only) */}
   

    {/* Description */}
    <TextField
      label="Description"
      fullWidth
      margin="dense"
      value={newMachine.description}
      onChange={(e) =>
        setNewMachine((prev) => ({ ...prev, description: e.target.value }))
      }
    />

    {/* Machine ID */}
    <TextField
      label="Machine ID"
      type="number"
      fullWidth
      margin="dense"
      value={newMachine.machine_id}
      onChange={(e) =>
        setNewMachine((prev) => ({ ...prev, machine_id: Number(e.target.value) }))
      }
    />


  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAdd} color="secondary">
      Cancel
    </Button>
    <Button color="primary" onClick={handleAddMaintenanceRecord}>
      Add
    </Button>
  </DialogActions>
</Dialog>





      {/* 🔹 Edit Machine Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
    <DialogTitle>Edit Maintenance Record</DialogTitle>
    <DialogContent>
      {/* ID (Read-only) */}


      {/* Description */}
      <TextField
        label="Description"
        fullWidth
        margin="dense"
        value={selectedMachine?.description || ""}
        onChange={(e) =>
          setSelectedMachine((prev) => ({ ...prev!, description: e.target.value }))
        }
      />

      {/* Machine ID */}
      <TextField
        label="Machine ID"
        type="number"
        fullWidth
        margin="dense"
        value={selectedMachine?.machine_id || ""}
        onChange={(e) =>
          setSelectedMachine((prev) => ({ ...prev!, machine_id: Number(e.target.value) }))
        }
      />

      {/* Created At */}


      {/* Updated At */}

    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseEdit} color="secondary">
        Cancel
      </Button>
      <Button color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </DialogActions>
  </Dialog>




      {/* 🔹 Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
    <DialogTitle>Delete Machine</DialogTitle>
    <DialogContent>
        Are you sure you want to delete this maintenance record?
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseDelete} color="secondary">
            Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
            Delete
        </Button>
    </DialogActions>
</Dialog>

    </Paper>
      </CardContent>
         </Card>
  );
};

export default MachineMaintenanceTable;
