import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  CircularProgress,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { Box, styled } from "@mui/system";
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
interface MaintenanceRecord {
// maintenance_id?: number;
  id: number;
  machine: number;
  description: string;
  machine_name: string;
  machine_type: string;
  amc_type: string;
  vendor: string;
  created_at: string;
  updated_at: string;
  machine_id: number;
};

const Maintenancerecordid: React.FC = () => {
  const location = useLocation();
  const machineId = location.state?.machineId;

  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);



  const [openAdd, setOpenAdd] = useState(false);
const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<MaintenanceRecord | null>(null);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  const handleOpenEdit = (machine: MaintenanceRecord) => {
    console.log("Selected Machine for Editing:", machine); // ✅ Debugging
    setSelectedMachine(machine);
    setOpenEdit(true);
  };
  
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (machine: MaintenanceRecord) => {
    setSelectedMachine(machine);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  // Fetch maintenance records
  useEffect(() => {
    if (!machineId) {
      setError("Invalid Machine ID");
      setLoading(false);
      return;
    }

    const fetchMaintenanceRecords = async () => {
      try {
          const response = await apiRequest<{ success: boolean; data?: { maintenance_record?: MaintenanceRecord[] } }>(
              "GET",
              `${endpoints.getMaintenanceRecordsById}?machine_id=${machineId}`
          );
  
          setMaintenanceRecords(response?.data?.maintenance_record || []);
      } catch (error) {
          setError("Error fetching maintenance records");
      } finally {
          setLoading(false);
      }
  };

    fetchMaintenanceRecords();
  }, [machineId]);


  const [newMachine, setNewMachine] = useState<MaintenanceRecord>({
    id: 0, // ✅ Added a placeholder value for id
    // maintenance_id: 0,
    machine_id: machineId || 0,
    description: "",
    machine_name: "",
    machine_type: "",
    amc_type: "",
    vendor: "",
    machine: 0, 
  
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  
  
  const handleAddMaintenanceRecord = async () => {
    if (!newMachine.machine_id) {
        setError("Machine ID is required");
        return;
    }

    try {
        const response = await apiRequest<{ success: boolean; errors?: { machine_id?: string[] } }>(
            "POST",
            endpoints.addMaintenanceRecord,
            newMachine
        );

        if (response.success) {
            setMaintenanceRecords((prev) => [...prev, newMachine]); // ✅ Add new record safely
            handleCloseAdd();
            window.location.reload();
        } else {
            setError(response.errors?.machine_id?.[0] || "Failed to add maintenance record."); // ✅ Handle errors properly
        }
    } catch (error) {
        setError("Error adding maintenance record.");
    }
};


const handleUpdate = async () => {
  if (!selectedMachine) {
    alert("No machine selected!");
    return;
  }

  const maintenanceId = Number(selectedMachine.id);
  if (!maintenanceId || maintenanceId <= 0) {
    alert("Please enter a valid Maintenance ID!");
    return;
  }

  const machine = Number(selectedMachine.machine);
  if (!machine || machine <= 0) {
    alert("Please enter a valid Machine ID!");
    return;
  }

  const updateData = {
    maintenance_id: maintenanceId,
    machine: machine,
    description: selectedMachine.description || "No description",
    created_at: selectedMachine.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  console.log("Sending update request:", updateData);

  try {
    const response = await apiRequest<{ success: boolean; errors?: any }>(
      "PUT",
      endpoints.updateMaintenanceRecord,
      updateData
    );

    if (response.success) {
      console.log("✅ Maintenance Record Updated:", response);
      handleCloseEdit();
      window.location.reload();
    } else {
      // alert(response.message || "Failed to update maintenance record.");
      console.error("❌ Update Error:", response.errors);
    }
  } catch (error) {
    console.error("🚨 API Request Error:", error);
    alert("An error occurred while updating the maintenance record.");
  }
};




  
  
const handleDelete = async () => {
  if (!selectedMachine?.id) {
      alert("Invalid Maintenance ID!");
      return;
  }

  try {
      const response = await apiRequest<{ success: boolean; message?: string }>(
          "DELETE",
          `${endpoints.deleteMaintenanceRecord}?maintenance_id=${selectedMachine.id}`
      );

      if (response.success) {
          console.log("✅ Deleted Record ID:", selectedMachine.id);
          setMaintenanceRecords((prev) =>
              prev.filter((rec) => rec.id !== selectedMachine.id)
          );

          alert("Maintenance record deleted successfully.");
          handleCloseDelete();
      } else {
          throw new Error(response.message || "Failed to delete maintenance record.");
      }
  } catch (error) {
      console.error("🚨 Delete Error:", error);
      alert("An error occurred while deleting the maintenance record.");
  }
};

  
  
  return (
     <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
          `, p: 2 }}>
            <CardContent>
    <Paper elevation={3} style={{ margin: "20px auto", borderRadius: "10px", background: "#E7EBF0", paddingBottom: 10,padding:"20px 20px" }}>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="primary" onClick={handleOpenAdd} sx={{
      minWidth: 120,
      bgcolor: "#E7EBF0",
      color:"black",
      border:"1px solid grey",
      boxShadow:
        "4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A",
    }}>
          Add Record
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{
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
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box textAlign="center" color="red">
            {error}
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell sx={{fontWeight:"bold"}}>Description</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {maintenanceRecords.length > 0 ? (
                maintenanceRecords.map((record) => (
                  <StyledTableRow key={record.id}>
                    {/* <TableCell>{record.id}</TableCell> */}
                    <TableCell>{record.description}</TableCell>
                    
                    <TableCell>
                {/* Edit Button */}
                <IconButton color="primary" onClick={() => handleOpenEdit(record)}>
                  <EditIcon style={{color:"grey"}} />
                </IconButton>

                {/* Delete Button */}
                <IconButton color="secondary" onClick={() => handleOpenDelete(record)}>
                  <DeleteIcon style={{color:"grey"}}/>
                </IconButton>
              </TableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} style={{ textAlign: "center" }}>
                    No Maintenance Records Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Add Maintenance Record Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
  <DialogTitle>Add Maintenance Record</DialogTitle>
  <DialogContent>
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
  value={newMachine.machine}
  onChange={(e) =>
    setNewMachine((prev) => ({ ...prev, machine: Number(e.target.value) }))
  }
/>



        <TextField
          label="Created At"
          name="created_at"
          type="date"
          fullWidth
          margin="dense"
          onChange={ (e) =>
            setNewMachine((prev) => ({ ...prev, created_at: e.target.value }))
          }
          value={new Date(newMachine.created_at).toLocaleString()}
          InputLabelProps={{ shrink: true }}
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

<TextField
  label="Machine ID"
  type="number"
  fullWidth
  margin="dense"
  value={selectedMachine?.machine || ""}
  onChange={(e) =>
    setSelectedMachine((prev) => ({ ...prev!, machine: Number(e.target.value) }))
  }
/>

<TextField
  label="Created At"
  type="datetime-local"
  fullWidth
  margin="dense"
  value={selectedMachine?.created_at || ""}
  onChange={(e) =>
    setSelectedMachine((prev) => ({ ...prev!, created_at: e.target.value }))
  }
/>
   
            {/* Machine ID */}
            {/* <TextField
              label="Machine ID"
              type="number"
              fullWidth
              margin="dense"
              value={selectedMachine?.machine_id || ""}
              onChange={(e) =>
                setSelectedMachine((prev) => ({ ...prev!, machine_id: Number(e.target.value) }))
              }
            /> */}
      
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

export default Maintenancerecordid;
