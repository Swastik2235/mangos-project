import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import endpoints from "../../utils/apiEndPoints";
import { apiRequest } from "../../utils/apiclient";


// Styled Components
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

// TypeScript Interface
type MachineMaterial = {
  id: number;
  material_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  machine_id: number;
};

const MaintenanceMaterialId: React.FC = () => {
  const [machineMaterials, setMachineMaterials] = useState<MachineMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState<MachineMaterial | null>(null);
  // Get machineId from navigation state
  const machineId = location.state?.machineId ?? 0;

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

  // Fetch machine materials
  useEffect(() => {
    if (!machineId) {
        console.error("🚨 Error: Machine ID is required.");
        return;
    }

    const fetchMachineMaterials = async () => {
        console.log("📡 Fetching machine materials for Machine ID:", machineId);

        try {
            setLoading(true);
            const response = await apiRequest<{ success: boolean; data?: { machine_material?: MachineMaterial[] } }>(
                "GET",
                `${endpoints.getMachineMaterialById}?machine_id=${machineId}`
            );

            if (response.success) {
                console.log("✅ Fetched data:", response.data);
                setMachineMaterials(response.data?.machine_material || []);
            } else {
                throw new Error("Failed to fetch machine materials.");
            }
        } catch (error) {
            console.error("🚨 Error fetching machine materials:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchMachineMaterials();
}, [machineId]);

  
  const [newMachine, setNewMachine] = useState<MachineMaterial>({
    id: 0,
    material_name: "",
    description: "",
    machine_id: 0,  // ✅ No TypeScript error now
    created_at: new Date().toISOString().slice(0, 16),
    updated_at: new Date().toISOString().slice(0, 16),
});
const handleAddMachineMaterial = async () => {
  if (!newMachine.machine_id || isNaN(newMachine.machine_id) || newMachine.machine_id <= 0) {
    alert("🚨 Please enter a valid Machine ID!");
    return;
  }

  const payload = {
    material_name: newMachine.material_name,
    machine: newMachine.machine_id, // ✅ Backend expects 'machine'
    description: newMachine.description || "",
    created_at: newMachine.created_at,
    updated_at: new Date().toISOString(),
  };

  try {
    const response = await apiRequest<{ success: boolean; errors?: { machine?: string[] } }>(
      "POST",
      endpoints.addMachineMaterial,
      payload
    );

    if (response.success) {
      console.log("✅ Machine Material Added:", response);
      window.location.reload();
    } else {
      console.error("❌ Error:", response.errors);
      alert(`Error: ${response.errors?.machine?.[0] || "Something went wrong!"}`);
    }
  } catch (error) {
    console.error("🚨 Fetch Error:", error);
    alert("Network error, please try again.");
  }
};





const handleUpdateMachineMaterial = async () => {
  if (!selectedMachine?.id || selectedMachine.id <= 0) {
    alert("🚨 Please enter a valid Machine ID!");
    return;
  }

  const updateData = {
    material_id: selectedMachine.id,
    machine: selectedMachine.machine_id, // ✅ Correct key
    material_name: selectedMachine.material_name,
    updated_at: new Date().toISOString(),
  };

  try {
    const response = await apiRequest<{ success: boolean; message?: string }>(
      "PUT",
      endpoints.updateMachineMaterial,
      updateData
    );

    if (response.success) {
      console.log("✅ Machine Material Updated:", response);
      alert("🎉 Machine material updated successfully!");
      handleCloseEdit();
      window.location.reload();
    } else {
      console.error("❌ Error:", response.message || "Update failed");
      alert(`❌ Error: ${response.message || "Update failed"}`);
    }
  } catch (error) {
    console.error("🚨 Fetch Error:", error);
    alert("⚠️ An error occurred while updating. Please try again.");
  }
};




const handleDeleteMachineMaterial = async () => {
  if (!selectedMachine?.id || selectedMachine.id <= 0) {
    alert("🚨 Invalid Machine ID!");
    return;
  }

  const deleteUrl = `${endpoints.deleteMachineMaterial}?material_id=${selectedMachine.id}`;
  console.log("🗑️ Deleting Machine Material with URL:", deleteUrl);

  try {
    const response = await apiRequest<{ success: boolean; message?: string }>(
      "DELETE",
      deleteUrl
    );

    console.log("🛠️ API Response:", response);

    if (response.success) {
      console.log("✅ Machine Material Deleted:", response);
      alert("🎉 Machine material deleted successfully!");
      handleCloseDelete();
      window.location.reload();
    } else {
      alert(`❌ Error: ${response.message || "Failed to delete the machine material."}`);
    }
  } catch (error) {
    console.error("🚨 Fetch Error:", error);
    alert("⚠️ An error occurred while deleting. Please try again.");
  }
};



  return (
        <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
          `, p: 2 }}>
            <CardContent>
    <Paper elevation={3} style={{ margin: "20px auto", borderRadius: "10px", background: "#E7EBF0", paddingBottom: 10,  padding:"20px 20px" }}>
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
                      Add Material
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
          <div>Loading...</div>
        ) : (
          <Table>
            {/* Table Header */}
            <TableHead>
              <TableRow>
               
                <TableCell sx={{fontWeight:"bold"}}>Material Name</TableCell>
                 {/* <TableCell sx={{fontWeight:"bold"}}>Machine ID</TableCell> */}
                 <TableCell sx={{fontWeight:"bold"}}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {machineMaterials.length > 0 ? (
                machineMaterials.map((material) => (
                  <StyledTableRow key={material.id}>
                    
                    <TableCell>{material.material_name}</TableCell>
                    
                    {/* <TableCell>{material.machine_id}</TableCell> */}
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
                  <TableCell colSpan={5} style={{ textAlign: "center" }}>
                    No Machine Materials Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
         {/* 🔹 Add Machine Material Dialog */}
         <Dialog open={openAdd} onClose={handleCloseAdd}>
  <DialogTitle>Add Machine Material</DialogTitle>
  <DialogContent>
    <TextField
      label="Material Name"
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
      onChange={(e) => setNewMachine(prev => ({ ...prev, machine_id: Number(e.target.value) }))}
    />

 

    <TextField
      label="Created At"
      type="datetime-local"
      fullWidth
      margin="dense"
      value={newMachine.created_at}
      onChange={(e) => setNewMachine(prev => ({ ...prev, created_at: e.target.value }))}
    />
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
        <DialogTitle>Edit Material Name</DialogTitle>
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
          <DialogTitle>Delete Material</DialogTitle>
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

export default MaintenanceMaterialId;
