import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { apiRequest } from "../../utils/apiclient";
import endpoints from "../../utils/apiEndPoints";

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(even)": {
    backgroundColor: "#E7EBF0",
  },
});

interface InventoryItem {
  id: number;
  item_name: string;
  item_code: string;
  quantity_available_kg: string;
  quantity_available_pc: string;
  last_updated: string;
  item_id: string;
  category: string;
  category_name?: string;
}

interface StockItem {
  id: number;
  product_name: string;
  project_name: string;
  quantity_available_kg: string;
  quantity_available_pc: string;
  length: string;
  width: string;
  breadth: string;
  material_type: string;
  inventory: string;
  project: string;
  movement: string;
}

interface Project {
  id: number;
  name: string;
}


const InventoryTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewItem, setViewItem] = useState<StockItem[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [transferFormData, setTransferFormData] = useState<StockItem | null>(null);
  
  const [transferInput, setTransferInput] = useState({
    project: "",
    item: "",
    name: "",
    receipt_no: "",
    movement_type: "IN",
    supplier: "",
    quantity_available_pc: "",
    warehouse: "",
    length: "",
    height: "",
    breadth: "",
    thickness: "",
    material_type: "",
    created_at: "",
  });


  const [projects, setProjects] = useState<Project[]>([]);
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://43.204.203.153:8000/project-details/get-project-names/");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching project names:", error);
    }
  };

  fetchProjects();
}, []);
  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      try {
        const data = await apiRequest<{ success: boolean; data: { "Inventory item": InventoryItem[] } }>(
          "GET",
          endpoints.getInventoryItems
        );
        if (data.success && Array.isArray(data.data["Inventory item"])) {
          const formatted = data.data["Inventory item"].map((item) => ({
            ...item,
            last_updated: new Date(item.last_updated).toISOString(),
          }));
          setInventoryItems(formatted);
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, []);

  const filteredInventory = inventoryItems.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.item_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = async (id: number) => {
    try {
      setOpenViewDialog(true);
      setViewItem(null);

      const response = await apiRequest<{ success: boolean; data: { stock_item: StockItem[] } }>(
        "GET",
        `${endpoints.getStockDetailsByInventoryId}?inventory_id=${id}`
      );

      if (response.success && response.data.stock_item) {
        setViewItem(response.data.stock_item);
      } else {
        alert("Failed to fetch stock item.");
        setOpenViewDialog(false);
      }
    } catch (error) {
      console.error("View error:", error);
      alert("Something went wrong while fetching the item.");
      setOpenViewDialog(false);
    }
  };

  const handleTransferClicks = async (inventoryId: number) => {
    try {
      const response = await apiRequest<{ success: boolean; data: { stock_item: StockItem[] } }>(
        "GET",
        `${endpoints.getStockDetailsByInventoryId}?inventory_id=${inventoryId}`
      );
      
      if (response.success && response.data.stock_item.length > 0) {
        const stockItem = response.data.stock_item[0];
        setTransferFormData(stockItem);
        setTransferInput({
          project: stockItem.project?.toString() || "",
          item: stockItem.id?.toString() || "",
          name: stockItem.product_name || "",
          receipt_no: "",
          movement_type: "IN",
          supplier: "",
          warehouse: "",
          length: stockItem.length || "",
          quantity_available_pc: stockItem.quantity_available_pc || "",
          height: "",
          breadth: stockItem.breadth || "",
          thickness: "",
          material_type: stockItem.material_type || "",
          created_at: new Date().toISOString(),
        });
        setOpenTransferDialog(true);
      } else {
        alert("No stock item found.");
      }
    } catch (error) {
      console.error("Transfer view error:", error);
      alert("Something went wrong while fetching transfer data.");
    }
  };

  const handleTransferSubmit = async () => {
    if (!transferFormData) return;
  
    try {
      const payload = {
        project: Number(transferInput.project),
        item: Number(transferInput.item),
        name: transferInput.name.trim(),
        receipt_no: transferInput.receipt_no.trim(),
        movement_type: "IN",
        supplier: transferInput.supplier.trim(),
        warehouse: transferInput.warehouse.trim(),
        length: Number(transferInput.length) || 0,
        height: Number(transferInput.height) || 0,
        breadth: Number(transferInput.breadth) || 0,
        thickness: Number(transferInput.thickness) || 0,
        material_type: transferInput.material_type.trim(),
        quantity_available_kg: Number(transferFormData.quantity_available_kg) || 0,
        quantity_available_pc: Number(transferFormData.quantity_available_pc) || 0,
        created_at: transferInput.created_at || new Date().toISOString(),
        current_project_id: Number(transferInput.project),
      };
  
      const response = await apiRequest<{ success: boolean; message?: string }>(
        "POST",
        `${endpoints.transferStockMovement}?project_id=${transferInput.project}&current_project_id=${transferInput.project}`,
        payload
      );
  
      if (response.success) {
        alert("Transfer successful!");
        setOpenTransferDialog(false);
        setTransferInput({
          project: "",
          item: "",
          name: "",
          receipt_no: "",
          movement_type: "IN",
          supplier: "",
          quantity_available_pc: "",
          warehouse: "",
          length: "",
          height: "",
          breadth: "",
          thickness: "",
          material_type: "",
          created_at: "",
        });
        setTransferFormData(null);
      } else {
        alert(response.message || "Transfer failed");
      }
    } catch (error: any) {
      console.error("Transfer error:", error);
      alert(`Transfer failed: ${error.message}`);
    }
  };
  

  return (
    <Card sx={{ 
      bgcolor: '#E7EBF0', 
      borderRadius: 2, 
      boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A`, 
      p: 2 
    }}>
      <CardContent>
        <Paper elevation={3} style={{
          margin: "20px auto",
          borderRadius: "10px",
          backgroundColor: "#E7EBF0",
          paddingBottom: 10,
          padding: "20px 20px"
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2} flexWrap="wrap" gap={2}>
            <TextField
              label="Search Inventory"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 250 }}
            />
          </Box>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <TableContainer component={Paper} sx={{
              bgcolor: "#E7EBF0",
              p: 1,
              maxWidth: "100%",
              overflowX: "auto",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": { height: "5px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Qty (kg)</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Qty (pc)</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Stock Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <StyledTableRow key={item.id}>
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.item_code}</TableCell>
                      <TableCell>{item.quantity_available_kg}</TableCell>
                      <TableCell>{item.quantity_available_pc}</TableCell>
                      <TableCell>     
                        <IconButton color="primary" onClick={() => handleViewClick(item.id)}>
                          <VisibilityIcon style={{ color: "grey" }} />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* View Stock Details Dialog */}
          <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} fullWidth maxWidth="sm">
            <DialogTitle sx={{fontWeight: "bold" }}>Stock Item Details</DialogTitle>
            <DialogContent>
              {Array.isArray(viewItem) && viewItem.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{fontWeight: "bold" }}>Product Name</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Project Name</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Qty (kg)</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Qty (pc)</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Length</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Width</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Breadth</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Material Type</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Inventory</TableCell>
                      <TableCell sx={{fontWeight: "bold" }}>Movement</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap",fontWeight: "bold" }}>Stock Transfer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {viewItem.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>{item.project_name}</TableCell>
                        <TableCell>{item.quantity_available_kg}</TableCell>
                        <TableCell>{item.quantity_available_pc}</TableCell>
                        <TableCell>{item.length}</TableCell>
                        <TableCell>{item.width}</TableCell>
                        <TableCell>{item.breadth}</TableCell>
                        <TableCell>{item.material_type}</TableCell>
                        <TableCell>{item.inventory}</TableCell>
                        <TableCell>{item.movement ?? "N/A"}</TableCell>
                        <TableCell style={{ alignItems: "center", display: "flex", justifyContent: "space-around" }}>
                          <IconButton color="primary" onClick={() => handleTransferClicks(Number(item.inventory))}>
                            <CompareArrowsIcon style={{ color: "blue" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>Loading...</p>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewDialog(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Transfer Stock Dialog */}
          <Dialog open={openTransferDialog} onClose={() => setOpenTransferDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle>Transfer Stock Movement</DialogTitle>
            <DialogContent>
              {transferFormData ? (
                <Grid container spacing={2}>
                  {/* <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">ID:</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.id ?? "N/A"}</Typography>
                </Grid> */}
                <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">Project Name:</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.project_name ?? "N/A"}</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">Qty (kg):</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.quantity_available_kg ?? "N/A"}</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">Qty (pcs):</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.quantity_available_pc ?? "N/A"}</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">Length:</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.length ?? "N/A"}</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">Breadth:</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.breadth ?? "N/A"}</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">Material Type:</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.material_type ?? "N/A"}</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">Inventory:</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.inventory ?? "N/A"}</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: "flex" }}>
                  <Typography variant="subtitle2">Project:</Typography>
                  <Typography style={{ marginLeft: "15px" }}>{transferFormData.project ?? "N/A"}</Typography>
                </Grid>

                  

                  {/* Editable Fields */}
                  {/* <Grid item xs={12} sm={6}>
                    <TextField 
                      label="Project ID" 
                      fullWidth 
                      name="project" 
                      value={transferInput.project} 
                      onChange={(e) => setTransferInput(prev => ({ ...prev, project: e.target.value }))} 
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} sm={6}>
                    <TextField 
                      label="Item ID" 
                      fullWidth 
                      name="item" 
                      value={transferInput.item} 
                      onChange={(e) => setTransferInput(prev => ({ ...prev, item: e.target.value }))} 
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} sm={6}>
                    <TextField 
                      label="Name" 
                      fullWidth 
                      name="name" 
                      value={transferInput.name} 
                      onChange={(e) => setTransferInput(prev => ({ ...prev, name: e.target.value }))} 
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Name</InputLabel>
                      <Select
                        label="Name"
                        name="name"
                        value={transferInput.name}
                        onChange={(e) =>
                          setTransferInput((prev) => ({ ...prev, name: e.target.value }))
                        }
                      >
                        {projects.map((project) => (
                          <MenuItem key={project.id} value={project.id.toString()}>
                          {project.name}
                        </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField 
                      label="quantity available pc" 
                      fullWidth 
                      name="quantity_available_pc" 
                      value={transferInput.quantity_available_pc} 
                      onChange={(e) => setTransferInput(prev => ({ ...prev, quantity_available_pc: e.target.value }))} 
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <TextField 
                      label="Supplier" 
                      fullWidth 
                      name="supplier" 
                      value={transferInput.supplier} 
                      onChange={(e) => setTransferInput(prev => ({ ...prev, supplier: e.target.value }))} 
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} sm={6}>
                    <TextField 
                      label="Warehouse" 
                      fullWidth 
                      name="warehouse" 
                      value={transferInput.warehouse} 
                      onChange={(e) => setTransferInput(prev => ({ ...prev, warehouse: e.target.value }))} 
                    />
                  </Grid> */}
                  {/* <Grid item xs={3}>
                    <TextField
                      label="Length"
                      fullWidth
                      name="length"
                      value={transferInput.length}
                      onChange={(e) => setTransferInput(prev => ({ ...prev, length: e.target.value }))}
                    />
                  </Grid> */}
                  {/* <Grid item xs={3}>
                    <TextField
                      label="Height"
                      fullWidth
                      name="height"
                      value={transferInput.height}
                      onChange={(e) => setTransferInput(prev => ({ ...prev, height: e.target.value }))}
                    />
                  </Grid> */}
                  {/* <Grid item xs={3}>
                    <TextField
                      label="Breadth"
                      fullWidth
                      name="breadth"
                      value={transferInput.breadth}
                      onChange={(e) => setTransferInput(prev => ({ ...prev, breadth: e.target.value }))}
                    />
                  </Grid> */}
                  {/* <Grid item xs={3}>
                    <TextField
                      label="Thickness"
                      fullWidth
                      name="thickness"
                      value={transferInput.thickness}
                      onChange={(e) => setTransferInput(prev => ({ ...prev, thickness: e.target.value }))}
                    />
                  </Grid> */}
                  {/* <Grid item xs={6}>
                    <TextField
                      label="Material Type"
                      fullWidth
                      name="material_type"
                      value={transferInput.material_type}
                      onChange={(e) => setTransferInput(prev => ({ ...prev, material_type: e.target.value }))}
                    />
                  </Grid> */}
                  {/* <Grid item xs={6}>
                    <TextField
                      label="Created At"
                      type="datetime-local"
                      fullWidth
                      name="created_at"
                      value={transferInput.created_at}
                      onChange={(e) => setTransferInput(prev => ({ ...prev, created_at: e.target.value }))}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid> */}
                </Grid>
              ) : (
                <Typography>Loading...</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenTransferDialog(false)} color="secondary">Cancel</Button>
              <Button onClick={handleTransferSubmit} color="primary">Submit Transfer</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;