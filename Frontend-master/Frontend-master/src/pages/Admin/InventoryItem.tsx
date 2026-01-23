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

type InventoryItem = {
    id: number;
    inventory_item_id?: number | null;
    item_name: string;
    item_code: string;
    description: string;
    unit_of_measure: string;
    quantity_available: number;
    min_stock_level: number;
    max_stock_level: number;
    reorder_level: number;
    supplier: string;
    purchase_price: number;
    category: number; 
    last_updated: string;
    
  };



const InventoryItemTable: React.FC = () => {
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    // const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = (item: InventoryItem) => {
        setSelectedItem(item);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = (item: InventoryItem) => {
        setSelectedItem(item);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => setOpenDelete(false);

    
    const [newItem, setNewItem] = useState({
        item_name: "",
        item_code: "",
        description: "",
        unit_of_measure: "",
        quantity_available: 0,
        min_stock_level: 0,
        max_stock_level: 0,
        reorder_level: 0,
        supplier: "",
        purchase_price: 0,
        category: 5,
        last_updated: new Date().toISOString(),
      });
      

    // useEffect(() => {
    //     fetch("http://43.204.203.153:8000/inventory-item/get-inventory-item-details/")
    //       .then(response => response.json())
    //       .then(data => {
    //         if (data.success && data.data && data.data["Inventory item"]) {
    //           setInventoryItems(data.data["Inventory item"]);
    //         } else {
    //           console.error("Invalid data structure:", data);
    //         }
    //       })
    //       .catch(error => console.error("Error fetching inventory items:", error))
    //       .finally(() => setLoading(false));
    //   }, []);
    const fetchInventoryItems = async () => {
      setLoading(true); // ✅ Ensure loading state is set at the start
      setError(""); // ✅ Clear previous errors
  
      try {
          const data = await apiRequest<{ success: boolean; data?: { "Inventory item"?: InventoryItem[] } }>(
              "GET",
              endpoints.getInventoryItem
          );
  
          console.log("✅ Fetched Inventory Data:", data); // Debugging log
  
          if (data?.data && Array.isArray(data.data["Inventory item"])) {
              setInventoryItems(data.data["Inventory item"]);
          } else {
              console.error("❌ Unexpected response format:", data);
              setInventoryItems([]); // ✅ Prevents app crashes
          }
      } catch (error) {
          console.error("❌ Error fetching inventory:", error);
          setError("Failed to fetch inventory items. Please try again."); // ✅ Display user-friendly error
      } finally {
          setLoading(false); // ✅ Ensure loading is stopped
      }
  };
  
    
     

    
    
      
      // Call fetch on mount
      useEffect(() => {
        fetchInventoryItems();
      }, []);
      
      const handleAddInventoryItem = async () => {
        if (!newItem.item_name || !newItem.item_code) {
            alert("Item Name and Item Code are required!");
            return;
        }
    
        const itemData = {
            item_name: newItem.item_name,
            item_code: newItem.item_code,
            description: newItem.description || "No description", 
            unit_of_measure: newItem.unit_of_measure || "N/A",
            quantity_available: newItem.quantity_available || 0,
            min_stock_level: newItem.min_stock_level || 0,
            max_stock_level: newItem.max_stock_level || 0,
            reorder_level: newItem.reorder_level || 0,
            supplier: newItem.supplier || "Unknown",
            purchase_price: newItem.purchase_price || 0.0,
            category: newItem.category ?? 5, 
            last_updated: new Date().toISOString(),
        };
    
        console.log("🚀 Sending data:", itemData);
    
        try {
            const result = await apiRequest<{ 
                success: boolean; 
                id?: number; 
                created_at?: string; 
                updated_at?: string; 
                error?: string; 
            }>("POST", endpoints.createInventoryItem, itemData);
    
            console.log("✅ API Response:", result);
    
            if (!result.success) {
                throw new Error(result.error || "Failed to add item.");
            }
    
            alert("✅ Item added successfully!");
            fetchInventoryItems(); // Refresh data
            handleCloseAdd(); // Close modal
        } catch (error) {
            console.error("❌ Error:", error);
            // alert(error.message || "An error occurred. Please try again.");
        }
    };
    
    
      
      
      
    
    
    
    

    const handleUpdateInventoryItem = async () => {
      if (!selectedItem) return;
  
      try {
          const response = await apiRequest<{ success: boolean; message?: string }>(
              "PUT",
              endpoints.updateInventoryItem,
              selectedItem
          );
  
          console.log("🔄 Update Response:", response);
  
          if (response.success) {
              setInventoryItems(inventoryItems.map(item => 
                  item.id === selectedItem.id ? selectedItem : item
              ));
              setOpenEdit(false);
          } else {
              alert(`Error: ${response.message || "Failed to update inventory item."}`);
          }
      } catch (error) {
          console.error("🚨 Error updating inventory item:", error);
          alert("An error occurred while updating the inventory item.");
      }
  };
  
  
  const handleDeleteInventoryItem = async () => {
      if (!selectedItem || !selectedItem.id) {
          alert("❌ No item selected for deletion!");
          return;
      }
  
      console.log("📤 Deleting Item:", selectedItem.id);
  
      try {
          const response = await apiRequest<{ success: boolean; message?: string }>(
              "DELETE",
              `${endpoints.deleteInventoryItem}?inventory_item_id=${selectedItem.id}`
          );
  
          console.log("🔍 API Response:", response);
  
          if (response.success) {
              setInventoryItems(inventoryItems.filter(item => item.id !== selectedItem.id));
              setOpenDelete(false);
          } else {
              alert(`Error: ${response.message || "Failed to delete inventory item."}`);
          }
      } catch (error) {
          console.error("🚨 Error deleting inventory item:", error);
          alert("An error occurred while deleting the inventory item.");
      }
  };
  
    
    


  
  
  
  

  return (
    <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A
        `, p: 2 }}>
          <CardContent>
          {error && <p className="text-red-500">{error}</p>}

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
                Add Inventory Item
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
                <TableCell sx={{fontWeight:"bold"}}>Item Name</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Item Code</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Description</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Unit of Measure</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Quantity Available</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Min Stock Level</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Max Stock Level</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Reorder Level</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Supplier</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Purchase Price</TableCell>
                {/* <TableCell>Last Updated</TableCell> */}
                <TableCell sx={{fontWeight:"bold"}}>Actions</TableCell>
            </TableRow>
        </TableHead>
        
        <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={12} style={{ textAlign: "center" }}>
                        Loading...
                    </TableCell>
                </TableRow>
            ) : inventoryItems.length > 0 ? (
                inventoryItems.map((item, index) => (
                    <StyledTableRow key={index}>
                        <TableCell>{item.item_name}</TableCell>
                        <TableCell>{item.item_code}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.unit_of_measure}</TableCell>
                        <TableCell>{item.quantity_available}</TableCell>
                        <TableCell>{item.min_stock_level}</TableCell>
                        <TableCell>{item.max_stock_level}</TableCell>
                        <TableCell>{item.reorder_level}</TableCell>
                        <TableCell>{item.supplier || "N/A"}</TableCell>
                        <TableCell>{item.purchase_price}</TableCell>
                        {/* <TableCell>{item.last_updated}</TableCell> */}
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
                    <TableCell colSpan={12} style={{ textAlign: "center" }}>
                        No Inventory Items Found
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
  <DialogTitle>Add New Inventory Item</DialogTitle>
  <DialogContent>
    {/* Item Name */}
    <TextField
      label="Item Name"
      fullWidth
      margin="dense"
      value={newItem.item_name}
      onChange={(e) =>
        setNewItem((prev) => ({ ...prev, item_name: e.target.value }))
      }
    />

    {/* Item Code */}
    <TextField
      label="Item Code"
      fullWidth
      margin="dense"
      value={newItem.item_code}
      onChange={(e) =>
        setNewItem((prev) => ({ ...prev, item_code: e.target.value }))
      }
    />

    {/* Description */}
    <TextField
      label="Description"
      fullWidth
      multiline
      rows={2}
      margin="dense"
      value={newItem.description}
      onChange={(e) =>
        setNewItem((prev) => ({ ...prev, description: e.target.value }))
      }
    />
   


    {/* Unit of Measure */}
    <TextField
      label="Unit of Measure"
      fullWidth
      margin="dense"
      value={newItem.unit_of_measure}
      onChange={(e) =>
        setNewItem((prev) => ({ ...prev, unit_of_measure: e.target.value }))
      }
    />

 {/* Quantity Available */}
<TextField
  label="Quantity Available"
  type="number"
  fullWidth
  margin="dense"
  value={newItem.quantity_available}
  onChange={(e) =>
    setNewItem((prev) => ({
      ...prev,
      quantity_available: Number(e.target.value), // Convert to number
    }))
  }
/>


<TextField
  label="Min Stock Level"
  type="number"
  fullWidth
  margin="dense"
  value={newItem.min_stock_level}
  onChange={(e) =>
    setNewItem((prev) => ({
      ...prev,
      min_stock_level: Number(e.target.value), // Convert to number
    }))
  }
/>


<TextField
  label="Max Stock Level"
  type="number"
  fullWidth
  margin="dense"
  value={newItem.max_stock_level}
  onChange={(e) =>
    setNewItem((prev) => ({
      ...prev,
      max_stock_level: Number(e.target.value), // Convert to number
    }))
  }
/>


<TextField
  label="Reorder Level"
  type="number"
  fullWidth
  margin="dense"
  value={newItem.reorder_level}
  onChange={(e) =>
    setNewItem((prev) => ({
      ...prev,
      reorder_level: Number(e.target.value), // Convert to number
    }))
  }
/>




    {/* Supplier */}
    <TextField
      label="Supplier"
      fullWidth
      margin="dense"
      value={newItem.supplier}
      onChange={(e) =>
        setNewItem((prev) => ({ ...prev, supplier: e.target.value }))
      }
    />

    {/* Purchase Price */}
   
<TextField
  label="Purchase Price"
  type="number"
  fullWidth
  margin="dense"
  value={newItem.purchase_price}
  onChange={(e) =>
    setNewItem((prev) => ({
      ...prev,
      purchase_price: Number(e.target.value), // Convert to number
    }))
  }
/>
<TextField
  label="Last Updated"
  fullWidth
  margin="dense"
  value={newItem.last_updated}
  InputProps={{
    readOnly: true, // Make it non-editable
  }}
/>




  </DialogContent>

  <DialogActions>
    <Button onClick={handleCloseAdd} color="secondary">
      Cancel
    </Button>
    <Button color="primary" onClick={handleAddInventoryItem}>
      Add
    </Button>
  </DialogActions>
</Dialog>



<Dialog open={openEdit} onClose={handleCloseEdit}>
  <DialogTitle>Edit Inventory Item</DialogTitle>
  <DialogContent>
    {/* Item Name */}
    <TextField
      label="Item Name"
      fullWidth
      margin="dense"
      value={selectedItem?.item_name || ""}
      onChange={(e) =>
        setSelectedItem((prev) => ({ ...prev!, item_name: e.target.value }))
      }
    />

    {/* Item Code */}
    <TextField
      label="Item Code"
      fullWidth
      margin="dense"
      value={selectedItem?.item_code || ""}
      onChange={(e) =>
        setSelectedItem((prev) => ({ ...prev!, item_code: e.target.value }))
      }
    />

    {/* Description */}
    <TextField
      label="Description"
      fullWidth
      multiline
      rows={2}
      margin="dense"
      value={selectedItem?.description || ""}
      onChange={(e) =>
        setSelectedItem((prev) => ({ ...prev!, description: e.target.value }))
      }
    />

    {/* Unit of Measure */}
    <TextField
      label="Unit of Measure"
      fullWidth
      margin="dense"
      value={selectedItem?.unit_of_measure || ""}
      onChange={(e) =>
        setSelectedItem((prev) => ({ ...prev!, unit_of_measure: e.target.value }))
      }
    />

    {/* Quantity Available */}
    {/* Quantity Available */}
<TextField
  label="Quantity Available"
  type="number"
  fullWidth
  margin="dense"
  value={selectedItem?.quantity_available ?? ""}
  onChange={(e) =>
    setSelectedItem((prev) => prev ? { ...prev, quantity_available: Number(e.target.value) } : null)
  }
/>

{/* Min Stock Level */}
<TextField
  label="Min Stock Level"
  type="number"
  fullWidth
  margin="dense"
  value={selectedItem?.min_stock_level ?? ""}
  onChange={(e) =>
    setSelectedItem((prev) => prev ? { ...prev, min_stock_level: Number(e.target.value) } : null)
  }
/>

{/* Max Stock Level */}
<TextField
  label="Max Stock Level"
  type="number"
  fullWidth
  margin="dense"
  value={selectedItem?.max_stock_level ?? ""}
  onChange={(e) =>
    setSelectedItem((prev) => prev ? { ...prev, max_stock_level: Number(e.target.value) } : null)
  }
/>

{/* Reorder Level */}
<TextField
  label="Reorder Level"
  type="number"
  fullWidth
  margin="dense"
  value={selectedItem?.reorder_level ?? ""}
  onChange={(e) =>
    setSelectedItem((prev) => prev ? { ...prev, reorder_level: Number(e.target.value) } : null)
  }
/>

    {/* Supplier */}
    <TextField
      label="Supplier"
      fullWidth
      margin="dense"
      value={selectedItem?.supplier || ""}
      onChange={(e) =>
        setSelectedItem((prev) => ({ ...prev!, supplier: e.target.value }))
      }
    />

    {/* Purchase Price */}
    <TextField
  label="Purchase Price"
  type="number"
  fullWidth
  margin="dense"
  value={selectedItem?.purchase_price ?? ""}
  onChange={(e) =>
    setSelectedItem((prev) => prev ? { ...prev, purchase_price: Number(e.target.value) } : null)
  }
/>
  </DialogContent>

  <DialogActions>
    <Button onClick={handleCloseEdit} color="secondary">
      Cancel
    </Button>
    <Button color="primary" onClick={handleUpdateInventoryItem}>
      Update
    </Button>
  </DialogActions>
</Dialog>

      {/* 🔹 Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Machine</DialogTitle>
        <DialogContent>
          Are you sure you want to delete ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">
            Cancel
          </Button>
          <Button color="error" onClick={handleDeleteInventoryItem}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
     </CardContent>
         </Card>
  );
};

export default InventoryItemTable;
