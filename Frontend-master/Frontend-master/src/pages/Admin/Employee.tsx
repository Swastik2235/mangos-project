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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import endpoints from "../../utils/apiEndPoints";
import { apiRequest } from "../../utils/apiclient";
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

interface Employee {
    id: number; // Added id field
    employee_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    employment_type: string;
    department: string;
    designation: string;
    date_of_joining: string;
    is_active: boolean;
    user_name: string;
    password: string;
  }
  





const EmployeeTable: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
// const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

const [formData, setFormData] = useState<Employee>({
    id: 0, // ✅ Add this field (or `null` if backend assigns it)
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    employment_type: "",
    department: "",
    designation: "",
    date_of_joining: "",
    is_active: true,
    user_name: "",
    password: ""
  });
  

  
  
  useEffect(() => {
    apiRequest<{ success: boolean; data: { Employee: Employee[] } }>('GET', endpoints.getEmployeeDetails)
      .then((data) => {
        if (data.success && Array.isArray(data.data?.Employee)) {
          setEmployees(data.data.Employee);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement; // Ensure the target has `name` and `value`
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "date_of_birth" || name === "date_of_joining"
        ? new Date(value).toISOString().split("T")[0] // Format date correctly
        : value
    }));
  };
  
  

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editEmployee) {
      setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
    }
  };

  const handleAddEmployee = () => {
    // Frontend validation
    if (!formData.first_name) {
      alert("First Name is required");
      return;
    } else if (!formData.last_name) {
      alert("Last Name is required");
      return;
    } else if (!formData.email) {
      alert("Email is required");
      return;
    } else if (!formData.phone_number) {
      alert("Phone Number is required");
      return;
    } else if (!formData.date_of_birth) {
      alert("Date of Birth is required");
      return;
    } else if (!formData.gender) {
      alert("Gender is required");
      return;
    } else if (!formData.address) {
      alert("Address is required");
      return;
    } else if (!formData.employment_type) {
      alert("Employment Type is required");
      return;
    } else if (!formData.department) {
      alert("Department is required");
      return;
    } else if (!formData.designation) {
      alert("Designation is required");
      return;
    } else if (!formData.date_of_joining) {
      alert("Date of Joining is required");
      return;
    }
  
    const finalData = {
      ...formData,
      employee_id: formData.employee_id || `EMP${Date.now()}`,
    };
  
    apiRequest<{ success: boolean; id: number }>('POST', endpoints.addEmployee, finalData)
      .then((data) => {
        if (data.success) {
          setEmployees([...employees, { ...finalData, id: data.id }]);
          setOpenAddDialog(false);
          setFormData({
            id: 0,
            employee_id: "",
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            date_of_birth: "",
            gender: "",
            address: "",
            employment_type: "",
            department: "",
            designation: "",
            date_of_joining: "",
            is_active: true,
            user_name: "",
            password: ""
          });
        }
      })
      .catch((error) => {
        // Handle backend validation errors
        if (error.errors) {
          const errorFields = Object.keys(error.errors);
          errorFields.forEach((field) => {
            alert(`${field.toUpperCase()}: ${error.errors[field].join(", ")}`);
          });
        } else {
          alert("Something went wrong. Please try again.");
          console.error("Error adding employee:", error);
        }
      });
  };
  
  
  
  
  
  const handleUpdateEmployee = () => {
    if (editEmployee) {
      console.log("Updating employee:", editEmployee);
  
      // Ensure that `employee_id` is included instead of `id`
      const updatedEmployee = {
        ...editEmployee,
        employee_id: editEmployee.id, // Rename "id" to "employee_id"
      };
  
      apiRequest<{ success: boolean }>('PUT', endpoints.updateEmployee, updatedEmployee)
        .then((data) => {
          if (data.success) {
            setEmployees((prevEmployees) =>
              prevEmployees.map((emp) =>
                emp.employee_id === editEmployee.employee_id ? editEmployee : emp // Compare using "employee_id"
              )
            );
            setOpenEditDialog(false);
          } else {
            console.error("Update failed:", data);
          }
        })
        .catch((error) => console.error("Error updating employee:", error));
    }
  };
  
  
  
  
  
  

// Open dialog
const handleOpenDeleteDialog = (id: number) => {
  setSelectedEmployeeId(id);
  setOpenDeleteDialog(true);
};

// Delete handler
const handleDeleteEmployee = () => {
  if (selectedEmployeeId === null || selectedEmployeeId === undefined) return;

  apiRequest<{ success: boolean }>(
    'DELETE',
    `${endpoints.deleteEmployee}?employee_id=${selectedEmployeeId}`
  )
    .then((data) => {
      if (data.success) {
        setEmployees((prev) =>
          prev.filter((emp) => emp.id !== selectedEmployeeId)
        );
      } else {
        alert("Failed to delete employee.");
        console.error("Delete response:", data);
      }
    })
    .catch((error) => {
      alert("Something went wrong while deleting.");
      console.error("API error:", error);
    })
    .finally(() => {
      setOpenDeleteDialog(false);
      setSelectedEmployeeId(null);
    });
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
    Add Employee
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
                <TableRow
  sx={{
    fontWeight: "bold",
   
  
  }}
>
  {/* <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center",fontWeight:"bold" }}>Employee ID</TableCell> */}
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>First Name</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Last Name</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "left" ,fontWeight:"bold"}}>Email</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Phone</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Date of Birth</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Gender</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Address</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Employment Type</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Department</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Designation</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Date of Joining</TableCell>
  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center", fontWeight: "bold" }}>Username</TableCell>
<TableCell sx={{ whiteSpace: "nowrap", textAlign: "center", fontWeight: "bold" }}>Password</TableCell>

  <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" ,fontWeight:"bold"}}>Actions</TableCell>
</TableRow>

                </TableHead>
                <TableBody>
                {employees.map((employee) => (
                    <StyledTableRow key={employee.employee_id} >
                    {/* <TableCell>{employee.employee_id}</TableCell> */}
                    <TableCell>{employee.first_name}</TableCell>
                    <TableCell>{employee.last_name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone_number}</TableCell>
                    <TableCell>{employee.date_of_birth}</TableCell>
                    <TableCell>{employee.gender}</TableCell>
                    <TableCell>{employee.address}</TableCell>
                    <TableCell>{employee.employment_type}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.date_of_joining}</TableCell>
                    <TableCell>{employee.user_name}</TableCell>
                    <TableCell>{employee.password}</TableCell>

                    <TableCell style={{display:"flex"}}>
                            {/* Edit Button */}
                            <IconButton 
                                color="primary" 
                                onClick={() => { 
                                setEditEmployee(employee); 
                                setOpenEditDialog(true); 
                                }}
                            >
                                <EditIcon style={{color:"grey"}}/>
                            </IconButton>

                            {/* Delete Button */}
                            <IconButton onClick={() => handleOpenDeleteDialog(employee.id)} color="secondary">
                            <DeleteIcon style={{color:"grey"}}/>
                            </IconButton>
                            </TableCell>

                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>


      {/* Add Employee Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>Add New Employee</DialogTitle>
  <DialogContent>
    {Object.keys(formData).map((key) => {
      if (["id", "is_active","employee_id"].includes(key)) return null; // Exclude fields

      return key === "employment_type" ? (
        // Dropdown for employment type
        <TextField
          key={key}
          select
          label="Employment Type"
          name={key}
          fullWidth
          margin="dense"
          value={formData[key] || ""}
          onChange={handleChange}
        >
          <MenuItem value="full_time">Full-Time</MenuItem>
          <MenuItem value="part_time">Part-Time</MenuItem>
          <MenuItem value="contract">Contract</MenuItem>
        </TextField>
      ) : key === "date_of_birth" || key === "date_of_joining" ? (
        // Date fields
        <TextField
          key={key}
          label={key.replace(/_/g, " ").toUpperCase()}
          name={key}
          type="date"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData[key as keyof Employee] || ""}
          InputLabelProps={{ shrink: true }}
        />
      ) : (
        // Default text fields
        <TextField
          key={key}
          label={key.replace(/_/g, " ").toUpperCase()}
          name={key}
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData[key as keyof Employee] || ""}
        />
      );
    })}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenAddDialog(false)} color="secondary">Cancel</Button>
    <Button onClick={handleAddEmployee} color="primary">Add</Button>
  </DialogActions>
       </Dialog>


      {/* Edit Employee Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
        {editEmployee &&
            Object.keys(editEmployee).map((key) => {
            if (["id", "employee_id", "is_active", "created_at", "updated_at"].includes(key)) return null; // Exclude fields

            return (
                <TextField
                key={key}
                label={key.replace(/_/g, " ").toUpperCase()}
                name={key}
                fullWidth
                margin="dense"
                onChange={handleEditChange}
                value={(editEmployee as Record<string, any>)[key] || ""} // FIXED TypeScript error
                />
            );
            })}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdateEmployee} color="primary">Update</Button>
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
    <Button onClick={handleDeleteEmployee} color="error">
      Delete
    </Button>
  </DialogActions>
  </Dialog>

    </Paper>
    </CardContent>
     </Card>
     
  );
 
};

export default EmployeeTable;
