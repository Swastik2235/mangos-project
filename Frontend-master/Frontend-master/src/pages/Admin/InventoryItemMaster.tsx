import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  
  MenuItem,
  Autocomplete,
 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import endpoints from "../../utils/apiEndPoints";
import { apiRequest } from "../../utils/apiclient";
// import { SelectChangeEvent } from "@mui/material/Select";

// import { baseurl } from "../../utils/apiclient";

// const StyledTableContainer = styled(TableContainer)({
//   maxWidth: "90%",
//   margin: "20px auto",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//   borderRadius: "10px",
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

interface Item {
    id: number;
    name: string;
    item_type: string;
    item_descr: string;
    product_no: number;
    quantity: number;
    thickness: number;
    length: number;
    height: number;
    breadth: number;
    material_type: string;
    // unit_of_measure: string;
    created_at: string;
    updated_at: string;
  }
  
  
  
  





const InventoryItemMaster: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

// const [openEditDialog, setOpenEditDialog] = useState(false);

//   const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
// const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

// const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

const [items, setItems] = useState<Item[]>([]);
const [formData, setFormData] = useState<Item>({
    id: 0,
    name: "",
    item_type: "",
    item_descr: "",
    product_no: 0,
    quantity: 0,
    thickness: 0,
    length: 0,
    height: 0,
    breadth: 0,
    material_type: "",
    // unit_of_measure: "",
    created_at: "",
    updated_at: "",
  });
  
  const [itemNames, setItemNames] = useState<{ id: number; name: string }[]>([]);

  
  useEffect(() => {
    fetch("http://43.204.203.153:8000/item-master/get-item-name/")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setItemNames(data.data);
        }
      })
      .catch((err) => console.error("Error fetching item names:", err));
  }, []);
  
  
  
  useEffect(() => {
    apiRequest<{ success: boolean; data: { "item Master": Item[] } }>(
      "GET",
      endpoints.getItemMaster
    )
      .then((data) => {
        if (data.success && Array.isArray(data.data["item Master"])) {
          setItems(data.data["item Master"]);
        }
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

//   const numericFields = ["product_no", "thickness", "Lenght", "width"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Fields that should be numbers
    const numericFields = ["product_no", "quantity", "thickness", "Lenght", "width"];
  
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };
  
  const handleSelectTextChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  
  const handleAddItem = async () => {
    if (!formData.name) {
      alert("Please select the Item Name.");
      return;
    } else if (!formData.item_type) {
      alert("Please enter the Item Type.");
      return;
    } else if (!formData.item_descr) {
      alert("Please enter the Item Description.");
      return;
    } else if (!formData.product_no || isNaN(Number(formData.product_no))) {
      alert("Please enter a valid Product Number.");
      return;
    } else if (!formData.quantity || isNaN(Number(formData.quantity))) {
      alert("Please enter a valid Quantity.");
      return;
    } else if (!formData.thickness || isNaN(Number(formData.thickness))) {
      alert("Please enter a valid Thickness.");
      return;
    } else if (!formData.length || isNaN(Number(formData.length))) {
      alert("Please enter a valid Length.");
      return;
    } else if (!formData.height || isNaN(Number(formData.height))) {
      alert("Please enter a valid Height.");
      return;
    } else if (!formData.breadth || isNaN(Number(formData.breadth))) {
      alert("Please enter a valid Breadth.");
      return;
    } else if (!formData.material_type) {
      alert("Please select the Material Type.");
      return;
    } else if (!formData.created_at) {
      alert("Please select the Created At date.");
      return;
    }
  
    try {
      const response = await apiRequest<{ success: boolean }>(
        "POST",
        endpoints.addItemMaster,
        formData
      );
  
      if (response.success) {
        setOpenAddDialog(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  
  
  
  
  
  
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setEditItem((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              typeof prev[name as keyof Item] === "number" ? Number(value) : value,
          }
        : null
    );
  };

  
  const handleUpdateItem = async () => {
    try {
      if (!editItem) return;
  
      const response = await apiRequest<{ success: boolean }>(
        "PUT",
        `${endpoints.updateItemMaster}?id=${editItem.id}`,
        editItem
      );
  
      if (response.success) {
        setOpenEditDialog(false);
  
        // Refresh item list
        const refreshed = await apiRequest<{ success: boolean; data: { "item Master": Item[] } }>(
          "GET",
          endpoints.getItemMaster
        );
  
        if (refreshed.success) {
          setItems(refreshed.data["item Master"]);
        }
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  
  
  const handleOpenDeleteDialog = (id: number) => {
    setSelectedItemId(id);
    setOpenDeleteDialog(true);
  };
  
  const handleDeleteItem = async () => {
    try {
      if (!selectedItemId) return;
  
      const response = await apiRequest<{ success: boolean }>(
        "POST",
        `${endpoints.deleteItemMaster}?item_id=${selectedItemId}`
      );
  
      if (response.success) {
        setOpenDeleteDialog(false);
        setSelectedItemId(null);
  
        // Refresh the item list
        const refreshed = await apiRequest<{ success: boolean; data: { "item Master": Item[] } }>(
          "GET",
          endpoints.getItemMaster
        );
        if (refreshed.success) {
          setItems(refreshed.data["item Master"]);
        }
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  

  
  return (
        <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
          `, p: 2 }}>
            <CardContent>
              <Paper
            elevation={3}
            style={{
              margin: "20px auto",
              borderRadius: "10px",
              background: "#E7EBF0",
              // boxShadow:
              //   "4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A",
                backgroundColor: "#E7EBF0",  
                padding:"20px 20px"

            }}
            
          >

<Box display="flex" justifyContent="flex-end" p={2}>
  <Button
    variant="contained"
    color="primary"
    onClick={() => setOpenAddDialog(true)}
    sx={{
      minWidth: 120,
      bgcolor: "#E7EBF0",
      color:"black",
      border:"1px solid grey",
      boxShadow:
        "4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A",
    }}
  >
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
    

    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell sx={{fontWeight: "bold" }}>Item Name</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Item Type</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Description</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Product No</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Quantity</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Thickness</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Length</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Height</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Breadth</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Material Type</TableCell>
          {/* <TableCell>Unit</TableCell> */}
          <TableCell sx={{fontWeight: "bold" }}>Created At</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Updated At</TableCell>
          <TableCell sx={{fontWeight: "bold" }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <StyledTableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.item_type}</TableCell>
            <TableCell>{item.item_descr}</TableCell>
            <TableCell>{item.product_no}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.thickness}</TableCell>
            <TableCell>{item.length}</TableCell>
            <TableCell>{item.height}</TableCell>
            <TableCell>{item.breadth}</TableCell>
            <TableCell>{item.material_type}</TableCell>
            {/* <TableCell>{item.unit_of_measure}</TableCell> */}
            <TableCell>{item.created_at.split("T")[0]}</TableCell>
            <TableCell>{item.updated_at.split("T")[0]}</TableCell>
            <TableCell>
              <IconButton onClick={() => { setEditItem(item); setOpenEditDialog(true); }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleOpenDeleteDialog(item.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
            </TableContainer>


      {/* Add Employee Dialog */}
   {/* Add Item Dialog */}
   <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>Add New Item</DialogTitle>
  <DialogContent>
  <Autocomplete
  options={itemNames}
  getOptionLabel={(option) => option.name}
  value={itemNames.find((item) => item.name === formData.name) || null}
  onChange={(_, newValue) => {
    handleSelectTextChange("name", newValue ? newValue.name : "");
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select Item"
      variant="outlined"
      margin="dense"
      fullWidth
    />
  )}
  isOptionEqualToValue={(option, value) => option.id === value.id}
/>




    <TextField
      label="Item Type"
      name="item_type"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.item_type}
    />

    <TextField
      label="Item Description"
      name="item_descr"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.item_descr}
    />

    <TextField
      label="Product No"
      name="product_no"
      type="number"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.product_no}
    />

    <TextField
      label="Quantity"
      name="quantity"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.quantity}
    />

    <TextField
      label="Thickness"
      name="thickness"
      type="number"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.thickness}
    />

    <TextField
      label="Length"
      name="length"
      type="number"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.length}
    />

<TextField
      label="Height"
      name="height"
      type="number"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.height}
    />

    <TextField
      label="Breadth"
      name="breadth"
      type="number"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.breadth}
    />

<TextField
  select
  label="Material Type"
  name="material_type"
  fullWidth
  margin="dense"
  onChange={handleChange}
  value={formData.material_type}
>
  <MenuItem value="plate">Plate</MenuItem>
  <MenuItem value="section">Section</MenuItem>
</TextField>


    {/* <TextField
      label="Unit of Measure"
      name="unit_of_measure"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.unit_of_measure}
    /> */}

    <TextField
      label="Created At"
      name="created_at"
      type="date"
      fullWidth
      margin="dense"
      onChange={handleChange}
      value={formData.created_at}
      InputLabelProps={{ shrink: true }}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenAddDialog(false)} color="secondary">Cancel</Button>
    <Button onClick={handleAddItem} color="primary">Add</Button>
  </DialogActions>
</Dialog>





      {/* Edit Employee Dialog */}
    {/* Edit Item Dialog */}
<Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>Edit Item</DialogTitle>
  <DialogContent>
  {editItem &&
  Object.keys(editItem).map((key) => {
    if (["id", "created_at", "updated_at"].includes(key)) return null;

    const value = (editItem as Record<string, any>)[key];

    if (key === "material_type") {
      return (
        <TextField
          key={key}
          select
          label="Material Type"
          name={key}
          fullWidth
          margin="dense"
          onChange={handleEditChange}
          value={value || ""}
        >
          <MenuItem value="Plate">Plate</MenuItem>
          <MenuItem value="Section">Section</MenuItem>
        </TextField>
      );
    }
    if (key === "name") {
        return (
          <Autocomplete
            key={key}
            options={itemNames}
            getOptionLabel={(option) => option.name}
            value={itemNames.find((item) => item.name === value) || null}
            onChange={(_, newValue) => {
              const syntheticEvent = {
                target: {
                  name: key,
                  value: newValue ? newValue.name : "",
                },
              } as React.ChangeEvent<HTMLInputElement>;
              handleEditChange(syntheticEvent);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Item"
                variant="outlined"
                margin="dense"
                fullWidth
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        );
      }
      
  
    // Default input for all other fields
    return (
      <TextField
        key={key}
        label={key.replace(/_/g, " ").toUpperCase()}
        name={key}
        fullWidth
        margin="dense"
        onChange={handleEditChange}
        value={value || ""}
        type={typeof value === "number" ? "number" : "text"}
      />
    );
  })}

  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
    <Button onClick={handleUpdateItem} color="primary">Update</Button>
  </DialogActions>
</Dialog>


      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} fullWidth maxWidth="xs">
  <DialogTitle>Confirm Deletion</DialogTitle>
  <DialogContent>
    Are you sure you want to delete this employee? This action cannot be undone.
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleDeleteItem} color="error">
      Delete
    </Button>
  </DialogActions>
  </Dialog>

    </Paper>
    </CardContent>
     </Card>
     
  );
 
};

export default InventoryItemMaster;
