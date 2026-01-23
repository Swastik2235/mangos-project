import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Card, CardContent } from "@mui/material";
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

interface InventoryDetails {
    id?: number; // ✅ Updated ID field
    name: string;
    description: string;
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


const InventoryCategoryTable: React.FC = () => {
    // const [machines, setMachines] = useState<MachineMaster[]>([]);
// const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
const [inventoryDetails, setInventoryDetails] = useState<InventoryDetails[]>([]);

const [loading, setLoading] = useState(true);
const [selectedInventory, setSelectedInventory] = useState<InventoryDetails | null>(null);
    const navigate = useNavigate();
  const handleOpenVisible = (item: InventoryDetails) => {
    console.log("Navigating with Machine ID:", item.id);
    navigate("/inventoryitemid", { state: { categoryId: item.id } });
  };

  useEffect(() => {
    setLoading(true);

    apiRequest<{ success: boolean; data: { "Inventory Details": InventoryDetails[] } }>(
        "GET",
        endpoints.getInventoryCategoryDetails
    )
    .then((data) => {
        console.log("✅ Full API Response:", data); // Debugging Step 1

        const inventoryData = data?.data?.["Inventory Details"];

        if (!Array.isArray(inventoryData)) {
            console.error("❌ Expected an array, but got:", inventoryData);
            setInventoryDetails([]);
        } else {
            console.log("✅ Parsed Inventory Data:", inventoryData); // Debugging Step 2

            // Check if items have `id`
            inventoryData.forEach((item, index) => {
                if (!item.id) console.warn(`⚠️ Missing ID in item at index ${index}:`, item);
            });

            setInventoryDetails(inventoryData);
        }
    })
    .catch((error) => {
        console.error("❌ Error fetching inventory:", error);
        setInventoryDetails([]);
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
//   const [selectedMachine, setSelectedMachine] = useState<InventoryDetails | null>(null);

const [newMachine, setNewMachine] = useState<InventoryDetails>({
    id: 0,  // ✅ Use id instead of id
    name: "",
    description: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
});

  
  



  
  
  
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (inventory: InventoryDetails) => {
    if (!inventory.id) {
        console.error("❌ Selected inventory is missing an ID:", inventory);
        alert("Error: Inventory ID is missing.");
        return;
    }
    setSelectedInventory(inventory);
    setOpenEdit(true);
};

  const handleCloseEdit = () => setOpenEdit(false);

  // 🔹 Open and Close Delete Dialog
  const handleOpenDelete = (inventory: InventoryDetails) => {
    setSelectedInventory(inventory);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);


  const handleAddInventoryRecord = () => {
    const formattedInventory: InventoryDetails = {
        id: 0, // Placeholder until API response provides the ID
        name: newMachine.name.trim(),
        description: newMachine.description.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    console.log("🚀 Submitting Inventory Record:", formattedInventory);

    apiRequest<{ success: boolean; id?: number; created_at?: string; updated_at?: string; error?: string }>(
        "POST",
        endpoints.addInventoryCategory,
        { name: formattedInventory.name, description: formattedInventory.description }
    )
    .then((data) => {
        console.log("✅ API Response:", data); // Debugging Step 1

        if (data.success) {
            setInventoryDetails((prev) => [
                ...prev,
                { 
                    ...formattedInventory, 
                    id: data.id || 0, // ✅ Ensure ID is not undefined
                    created_at: data.created_at || new Date().toISOString(), 
                    updated_at: data.updated_at || new Date().toISOString(), 
                }
            ]);

            setOpenAdd(false);
            setNewMachine({ id: 0, name: "", description: "", created_at: "", updated_at: "" });
        } else {
            alert(`❌ Error: ${data.error || "Unexpected response from the server."}`);
        }
    })
    .catch((error) => {
        console.error("❌ Error adding inventory record:", error);
        alert("Failed to add inventory record. Please try again.");
    });
};



const handleUpdateInventory = () => {
  console.log("🔍 Selected Inventory Before Update:", selectedInventory);

  if (!selectedInventory?.id) {
      console.error("❌ Missing ID in selectedInventory:", selectedInventory);
      alert("Error: Inventory ID is missing. Please refresh the page.");
      return;
  }

  const updateData = {
      id: selectedInventory.id,
      name: selectedInventory.name.trim(),
      description: selectedInventory.description.trim(),
      updated_at: new Date().toISOString(), // ✅ Only send updated_at
  };

  apiRequest<{ success: boolean; message?: string }>(
      "PUT",
      endpoints.updateInventoryCategory,
      updateData
  )
  .then((data) => {
      if (data.success) {
          console.log("✅ Inventory updated successfully:", data);

          setInventoryDetails((prev) =>
              prev.map((item) => 
                  item.id === selectedInventory.id ? { ...item, ...updateData } : item
              )
          );

          handleCloseEdit();
      } else {
          alert(`❌ Error: ${data.message || "Failed to update inventory."}`);
      }
  })
  .catch((error) => {
      console.error("❌ Error updating inventory:", error);
      alert("Network error. Please try again.");
  });
};

// 🔹 Handle Delete Inventory
const handleDeleteInventory = () => {
  if (!selectedInventory?.id) {
      console.error("❌ Missing ID:", selectedInventory);
      alert("Error: Inventory ID is missing. Please refresh the page.");
      return;
  }

  apiRequest<{ success: boolean; message?: string }>(
      "DELETE",
      `${endpoints.deleteInventoryCategory}?inventory_category_id=${selectedInventory.id}`
  )
  .then((data) => {
      if (data.success) {
          console.log("✅ Inventory deleted successfully:", data);

          setInventoryDetails((prev) =>
              prev.filter((item) => item.id !== selectedInventory.id)
          );

          handleCloseDelete();
      } else {
          alert(`❌ Error: ${data.message || "Failed to delete inventory."}`);
      }
  })
  .catch((error) => {
      console.error("❌ Error deleting inventory:", error);
      alert("Network error. Please try again.");
  });
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
          paddingBottom:10,overflow:"hidden",
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
                Add Inventory Category
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
      <div>Loading...</div> // ✅ Show loader when fetching
    ) : (
        <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Description</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Inventory Item</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Actions</TableCell>
             
          </TableRow>
        </TableHead>
        <TableBody>
          {inventoryDetails.length > 0 ? (
            inventoryDetails.map((item) => (
              <StyledTableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                             <IconButton   color="primary" onClick={() => handleOpenVisible(item)}  >
                            <VisibilityIcon style={{color:"grey"}}/>
                               </IconButton>
                                  
                             </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenEdit(item)}>
                    <EditIcon style={{color:"grey"}}/>
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleOpenDelete(item)}>
                    <DeleteIcon style={{color:"grey"}}/>
                  </IconButton>
                </TableCell>
                
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                No Inventory Records Found
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
  <DialogTitle>Add New Inventory Record</DialogTitle>
  <DialogContent>
    {/* Name */}
    <TextField
      label="Name"
      fullWidth
      margin="dense"
      value={newMachine.name}
      onChange={(e) =>
        setNewMachine((prev) => ({ ...prev, name: e.target.value }))
      }
    />

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
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAdd} color="secondary">
      Cancel
    </Button>
    <Button color="primary" onClick={handleAddInventoryRecord}>
      Add
    </Button>
  </DialogActions>
</Dialog>



      {/* 🔹 Edit Machine Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Inventory</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={selectedInventory?.name || ""} 
            onChange={(e) => setSelectedInventory({ ...selectedInventory!, name: e.target.value })} />
          <TextField label="Description" fullWidth margin="dense" value={selectedInventory?.description || ""} 
            onChange={(e) => setSelectedInventory({ ...selectedInventory!, description: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">Cancel</Button>
          <Button color="primary" onClick={handleUpdateInventory}>Update</Button>
        </DialogActions>
      </Dialog>



      {/* 🔹 Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Inventory</DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">Cancel</Button>
          <Button color="error" onClick={handleDeleteInventory}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
     </CardContent>
         </Card>
  );
};

export default InventoryCategoryTable;
