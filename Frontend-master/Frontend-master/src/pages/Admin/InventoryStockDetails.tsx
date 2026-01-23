import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import endpoints from "../../utils/apiEndPoints";
import { apiRequest } from "../../utils/apiclient";

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(even)": {
    backgroundColor: "#E7EBF0",
  },
});

export interface StockMovement {
  id: number;
  reciept_no: number;
  name: string;
  movement_type: string;
  supplier: string | null;
  warehouse: string | null;
  length: number;
  width: number;
  thickness: number;
  height: number;
  breadth: number;
  material_type: string;
  quantity_available_kg: string;
  quantity_available_pc: string;
  created_at: string;
  item_id: number;
  material_item: number;
  project: {
    id: number;
    name: string;
  };
  previous_project: {
    id: number;
    name: string;
  } | null; 
}

interface StockMovementForm {
  reciept_no: string;
  name: string;
  movement_type: string;
  supplier: string;
  warehouse: string;
  length: string;
  height: string;
  breadth: string;
  thickness: string;
  quantity_available_kg: string;
  quantity_available_pc: string;
  created_at: string;
  material_type: string;
  item_id: string;
  id: string;
  project: string;
  material_item: string;
}

const initialFormState: StockMovementForm = {
  reciept_no: "",
  name: "",
  movement_type: "",
  supplier: "",
  warehouse: "",
  length: "",
  height: "",
  breadth: "",
  thickness: "",
  quantity_available_kg: "",
  quantity_available_pc: "",
  created_at: "",
  material_type: "",
  item_id: "",
  id: "",
  project: "",
  material_item: "",
};

const InventoryStockDetails: React.FC = () => {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovementId, setSelectedMovementId] = useState<number | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);
  const [itemNames, setItemNames] = useState<{ id: number; name: string }[]>([]);
  const [newMovement, setNewMovement] = useState<StockMovementForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, itemsRes, movementsRes] = await Promise.all([
          fetch("http://43.204.203.153:8000/project-details/get-project-names/"),
          fetch("http://43.204.203.153:8000/item-master/get-item-name/"),
          apiRequest<{ success: boolean; data: { stock_movements: StockMovement[] } }>(
            "GET",
            endpoints.getStockMovements
          )
        ]);

        const projectsData = await projectsRes.json();
        if (projectsData.success && Array.isArray(projectsData.data)) {
          setProjects(projectsData.data);
        }

        const itemsData = await itemsRes.json();
        if (itemsData.success && Array.isArray(itemsData.data)) {
          setItemNames(itemsData.data);
        }

        if (movementsRes.success && movementsRes.data.stock_movements) {
          setStockMovements(movementsRes.data.stock_movements);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateForm = (): boolean => {
    const requiredFields: Array<keyof StockMovementForm> = [
      'reciept_no', 'name', 'movement_type', 'supplier', 'warehouse',
      'length', 'height', 'breadth', 'thickness', 'quantity_available_kg',
      'quantity_available_pc', 'created_at', 'material_type', 'project'
    ];

    for (const field of requiredFields) {
      if (!newMovement[field]) {
        alert(`Please fill in ${field.replace('_', ' ')}`);
        return false;
      }

      const numericFields: Array<keyof StockMovementForm> = [
        'length', 'height', 'breadth', 'thickness', 
        'quantity_available_kg', 'quantity_available_pc'
      ];
      
      if (numericFields.includes(field) && isNaN(Number(newMovement[field]))) {
        alert(`Please enter a valid number for ${field.replace('_', ' ')}`);
        return false;
      }
    }

    return true;
  };

  const handleDialogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setNewMovement((prev) => ({
      ...prev,
      [name]: parseInt(value), // convert to number
    }));
  };
  

  const handleSelectTextChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setNewMovement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMovement = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
        const payload = {
            ...newMovement,
            reciept_no: parseInt(newMovement.reciept_no),
            length: parseFloat(newMovement.length),
            height: parseFloat(newMovement.height),
            breadth: parseFloat(newMovement.breadth),
            thickness: parseFloat(newMovement.thickness),
            quantity_available_kg: parseFloat(newMovement.quantity_available_kg),
            quantity_available_pc: parseFloat(newMovement.quantity_available_pc),
            item_id: parseInt(newMovement.item_id), // should be a number
            material_item: parseInt(newMovement.material_item), // number
            // id: newMovement.id ? parseInt(newMovement.id.toString()) : undefined,
            project_id:parseInt(newMovement.project) // must be an object with `id`
           
          };
          
          

      const response = await apiRequest<{ success: boolean }>(
        "POST",
        endpoints.addStockMovement,
        payload
      );

      if (response.success) {
        setOpenDialog(false);
        setNewMovement(initialFormState);
        // Refresh data
        const movementsRes = await apiRequest<{ success: boolean; data: { stock_movements: StockMovement[] } }>(
          "GET",
          endpoints.getStockMovements
        );
        if (movementsRes.success) {
          setStockMovements(movementsRes.data.stock_movements);
        }
      }
    } catch (error) {
      console.error("Error adding stock movement:", error);
      alert("Failed to add stock movement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStockMovement = async () => {
    if (!selectedMovementId) return;

    try {
      const response = await apiRequest<{ success: boolean }>(
        'DELETE',
        `${endpoints.deleteStockMovement}?id=${selectedMovementId}`
      );

      if (response.success) {
        setStockMovements((prev) =>
          prev.filter((movement) => movement.id !== selectedMovementId)
        );
      }
    } catch (error) {
      console.error("Error deleting stock movement:", error);
      alert("Failed to delete stock movement.");
    } finally {
      setOpenDeleteDialog(false);
      setSelectedMovementId(null);
    }
  };

  return (
    <Card sx={{ 
      bgcolor: '#E7EBF0', 
      borderRadius: 2, 
      boxShadow: `4px 4px 20px 0px #6F8CB069,-6px -6px 20px 0px #FFFFFF,2px 2px 4px 0px #728EAB1A`, 
      p: 2 
    }}>
      <CardContent>
        <Paper
          elevation={3}
          style={{
            margin: "20px auto",
            borderRadius: "10px",
            backgroundColor: "#E7EBF0",
            padding: "20px"
          }}
        >
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
              sx={{
                minWidth: 120,
                bgcolor: "#E7EBF0",
                color: "black",
                border: "1px solid grey",
                boxShadow: "4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A",
              }}
            >
              Add Movement
            </Button>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                bgcolor: "#E7EBF0",
                p: 1,
                maxWidth: "100%",
                overflowX: "auto",
                whiteSpace: "nowrap",
                "&::-webkit-scrollbar": {
                  height: "5px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Receipt No</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Item Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Project</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Previous Project</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Movement Type</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Supplier</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Warehouse</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Length</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Height</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Breadth</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Thickness</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Material Type</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Qty (Kg)</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Qty (Pc)</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Created At</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center", fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockMovements.map((item) => (
                    <StyledTableRow key={item.id}>
                      <TableCell>{item.reciept_no}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.project?.name}</TableCell>
                      <TableCell>{item.previous_project?.name || "—"}</TableCell>
                      <TableCell>{item.movement_type}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.warehouse}</TableCell>
                      <TableCell>{item.length}</TableCell>
                      <TableCell>{item.height}</TableCell>
                      <TableCell>{item.breadth}</TableCell>
                      <TableCell>{item.thickness}</TableCell>
                      <TableCell>{item.material_type}</TableCell>
                      <TableCell>{item.quantity_available_kg}</TableCell>
                      <TableCell>{item.quantity_available_pc}</TableCell>
                      <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                      <TableCell style={{ display: "flex" }}>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            setSelectedMovementId(item.id);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <DeleteIcon style={{ color: "grey" }} />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
            <DialogTitle>Add Stock Movement</DialogTitle>
            <DialogContent sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr", mt: 2 }}>
              <TextField
                name="reciept_no"
                label="Receipt No"
                value={newMovement.reciept_no}
                onChange={handleDialogChange}
                type="number"
              />
              <Select
                name="name"
                value={newMovement.name}
                onChange={handleSelectTextChange}
                fullWidth
                displayEmpty
                margin="dense"
              >
                <MenuItem value="">Select Item</MenuItem>
                {itemNames.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <Select
                    name="project"
                    value={newMovement.project.toString()} // ensure it's string for Select
                    onChange={handleSelectChange}
                    fullWidth
                    displayEmpty
                    margin="dense"
                    >
                    <MenuItem value="">Select Project name</MenuItem>
                    {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id.toString()}>
                        {project.name}
                        </MenuItem>
                    ))}
                    </Select>

              <TextField
                name="movement_type"
                label="Movement Type"
                select
                value={newMovement.movement_type}
                onChange={handleDialogChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="in">IN</MenuItem>
                <MenuItem value="out">OUT</MenuItem>
              </TextField>
              <TextField
                name="supplier"
                label="Supplier"
                value={newMovement.supplier}
                onChange={handleDialogChange}
              />
              <TextField
                name="warehouse"
                label="Warehouse"
                value={newMovement.warehouse}
                onChange={handleDialogChange}
              />
              <TextField
                select
                label="Material Type"
                name="material_type"
                fullWidth
                margin="dense"
                onChange={handleDialogChange}
                value={newMovement.material_type}
              >
                <MenuItem value="Plate">Plate</MenuItem>
                <MenuItem value="Section">Section</MenuItem>
              </TextField>
              <TextField
                name="length"
                label="Length"
                value={newMovement.length}
                onChange={handleDialogChange}
                type="number"
              />
              <TextField
                name="breadth"
                label="Breadth"
                value={newMovement.breadth}
                onChange={handleDialogChange}
                type="number"
              />
              <TextField
                name="height"
                label="Height"
                value={newMovement.height}
                onChange={handleDialogChange}
                type="number"
              />
              <TextField
                name="thickness"
                label="Thickness"
                value={newMovement.thickness}
                onChange={handleDialogChange}
                type="number"
              />
              <TextField
                name="quantity_available_kg"
                label="Qty (Kg)"
                value={newMovement.quantity_available_kg}
                onChange={handleDialogChange}
                type="number"
              />
              <TextField
                name="quantity_available_pc"
                label="Qty (Pc)"
                value={newMovement.quantity_available_pc}
                onChange={handleDialogChange}
                type="number"
              />
              <TextField
                name="material_item"
                label="Material Item ID"
                value={newMovement.material_item}
                onChange={handleDialogChange}
                type="number"
              />
               <TextField
                name="item_id"
                label="Item ID"
                value={newMovement.item_id}
                onChange={handleDialogChange}
                type="number"
              />
              <TextField
                label="Created At"
                name="created_at"
                type="date"
                fullWidth
                margin="dense"
                onChange={handleDialogChange}
                value={newMovement.created_at}
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                onClick={handleAddMovement}
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Save'}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this stock movement? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleDeleteStockMovement} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default InventoryStockDetails;