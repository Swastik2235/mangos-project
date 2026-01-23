import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography, Card, CardContent } from "@mui/material";
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

interface MachineMaterial {
    id?: number;
    material_name: string;
    machine_id?: number | null;  // ✅ Allow null values
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


const MachineMaterialTable: React.FC = () => {
    // const [machines, setMachines] = useState<MachineMaterial[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [materials, setMaterials] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
// const [machines, setMachines] = useState<{ id: number; machine_name: string }[]>([]);
const [error, setError] = useState<string | null>(null);
const [newMachine, setNewMachine] = useState<MachineMaterial>({
    id: undefined,
    material_name: "",
    machine_id: null,  // ✅ No TypeScript error now
    created_at: new Date().toISOString().slice(0, 16),
    updated_at: new Date().toISOString().slice(0, 16),
});


// useEffect(() => {
//     setLoading(true);
//     fetch("http://43.204.203.153:8000/machine-material/get-machine-material/")
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Failed to fetch machine materials");
//             }
//             return response.json();
//         })
//         .then((data) => {
//             if (data.success && data.data["Machine Material"]) {
//                 setMaterials(data.data["Machine Material"]);
//             } else {
//                 setMaterials([]);
//             }
//         })
//         .catch((err) => setError(err.message))
//         .finally(() => setLoading(false));
// }, []);

  
useEffect(() => {
  setLoading(true);
  setError(""); // Reset error before fetching

  apiRequest<{ success: boolean; data: { "Machine Material": MachineMaterial[] } }>(
    "GET",
    endpoints.getMachineMaterials
  )
    .then((data) => {
      console.log("Fetched Machine Materials:", data); // Debugging log

      if (data.success && Array.isArray(data.data?.["Machine Material"])) {
        setMaterials(data.data["Machine Material"]);
      } else {
        setMaterials([]); // Handle empty data case
      }
    })
    .catch((err) => {
      console.error("Error fetching machine materials:", err);
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
  const [selectedMachine, setSelectedMachine] = useState<MachineMaterial | null>(null);



  
 
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (machine: MachineMaterial) => {
    setSelectedMachine(machine);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (machine: MachineMaterial) => {
    setSelectedMachine(machine);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false); // ✅ Add missing state
  

const handleAddMachineMaterial = () => {
  if (!newMachine.machine_id || isNaN(newMachine.machine_id) || newMachine.machine_id <= 0) {
    alert("Please enter a valid Machine ID!");
    return;
  }

  const formattedData = {
    ...newMachine,
    machine: newMachine.machine_id, // ✅ Rename for backend
  };

  delete formattedData.machine_id; // ❌ Remove the incorrect field

  apiRequest<{ success: boolean; errors?: { machine?: string[] } }>(
    "POST",
    endpoints.addMachineMaterial,
    formattedData
  )
    .then((data) => {
      if (data.success) {
        console.log("✅ Machine Material Added:", data);
        window.location.reload(); // ✅ Refresh the page
      } else {
        console.error("❌ Error:", data.errors);
        alert(`Error: ${data.errors?.machine?.[0] || "Something went wrong!"}`);
      }
    })
    .catch((error) => {
      console.error("🚨 Fetch Error:", error);
      setError("Network error, please try again.");
    });
};





const handleUpdateMachineMaterial = () => {
  if (!selectedMachine?.machine_id || selectedMachine.machine_id <= 0) {
    alert("Please enter a valid Machine ID!");
    return;
  }

  const updateData = {
    material_id: selectedMachine.id, // ✅ This stays as material_id
    machine: selectedMachine.machine_id, // ✅ Rename machine_id ➝ machine
    material_name: selectedMachine.material_name,
    updated_at: new Date().toISOString(),
  };

  apiRequest<{ success: boolean; errors?: any }>(
    "PUT",
    endpoints.updateMachineMaterial,
    updateData
  )
    .then((data) => {
      if (data.success) {
        console.log("✅ Machine Material Updated:", data);
        handleCloseEdit();
        window.location.reload();
      } else {
        console.error("❌ Update Error:", data.errors);
        alert("Failed to update machine material.");
      }
    })
    .catch((error) => console.error("🚨 Fetch Error:", error));
};



const handleDeleteMachineMaterial = () => {
    if (!selectedMachine?.id || selectedMachine.id <= 0) {
        alert("Invalid Machine ID!");
        return;
    }

    console.log("Deleting Machine Material with ID:", selectedMachine.id); // Debugging

    apiRequest<{ success: boolean; message?: string }>(
        "DELETE",
        `${endpoints.deleteMachineMaterial}?material_id=${selectedMachine.id}`
    )
    .then((data) => {
        console.log("API Response:", data); // Debugging
        if (data.success) {
            console.log("Machine Material Deleted:", data);
            handleCloseDelete(); // Close modal
            window.location.reload(); // Refresh page
        } else {
            alert(data.message || "Failed to delete the machine material.");
        }
    })
    .catch((error) => console.error("Fetch Error:", error));
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
        <div>Loading...</div>
      ) : (
        
        <Table>
            {error && <Typography color="error" style={{ textAlign: "center", marginBottom: "10px" }}>{error}</Typography>}

          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:"bold"}}>Material Name</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Machine ID</TableCell>  
              <TableCell sx={{fontWeight:"bold"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.length > 0 ? (
              materials.map((material, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{material.material_name}</TableCell>
                  <TableCell>{material.machine}</TableCell>
                  
                  <TableCell>
                                            {/* Edit Button */}
                        <IconButton color="primary" onClick={() => handleOpenEdit(material)}>
                            <EditIcon style={{color:"grey"}}/>
                            </IconButton>


                 <IconButton color="secondary"  onClick={() => handleOpenDelete(material)}>
                      <DeleteIcon style={{color:"grey"}}/>
                     </IconButton>
                    </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>
                  No Materials Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>

        {/* 🔹 Add Machine Dialog */}
    {/* 🔹 Add Machine Material Dialog */}
                <Dialog open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>Add Machine Material</DialogTitle>
            <DialogContent>
                {/* Material Name */}
                <TextField
                    label="Machine Name"
                    fullWidth
                    margin="dense"
                    value={newMachine.material_name}
                    onChange={(e) => setNewMachine(prev => ({ ...prev, material_name: e.target.value }))}
                />

                <TextField
                    label="Machine ID"
                    fullWidth
                    margin="dense"
                    type="number"
                    value={newMachine.machine_id || ""}
                    onChange={(e) => setNewMachine((prev) => ({ ...prev, machine_id: Number(e.target.value) }))}
                />





                {/* Created At */}
                

                {/* Updated At */}
               
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAdd} color="secondary">
                Cancel
                </Button>
                <Button color="primary" onClick={handleAddMachineMaterial}>
                Add
                </Button>
            </DialogActions>
            </Dialog>




      {/* 🔹 Edit Machine Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
  <DialogTitle>Edit Machine Material</DialogTitle>
  <DialogContent>
    {/* Material Name */}
    <TextField
      label="Material Name"
      fullWidth
      margin="dense"
      value={selectedMachine?.material_name || ""}
      onChange={(e) =>
        setSelectedMachine((prev) => ({ ...prev!, material_name: e.target.value }))
      }
    />

    {/* Machine ID */}
    <TextField
      label="Machine ID"
      fullWidth
      margin="dense"
      type="number"
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
    <Button color="primary" onClick={handleUpdateMachineMaterial}>
      Update
    </Button>
  </DialogActions>
</Dialog>


      {/* 🔹 Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
    <DialogTitle>Delete Machine</DialogTitle>
    <DialogContent>
        Are you sure you want to delete "{selectedMachine?.material_name}"?
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseDelete} color="secondary">
            Cancel
        </Button>
        <Button color="error" onClick={handleDeleteMachineMaterial}>
            Delete
        </Button>
    </DialogActions>
</Dialog>

    </Paper>
      </CardContent>
         </Card>
  );
};

export default MachineMaterialTable;
