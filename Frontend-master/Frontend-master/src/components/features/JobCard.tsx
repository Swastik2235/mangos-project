import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Paper,
  TableContainer,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

// import uploadIcon from "../../assets/file_upload.png";
// import { MoreVerticalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiRequest } from "../../utils/apiclient";
import endpoints from "../../utils/apiEndPoints";


interface FileRow {
  id: number;
  file_name: string;
  file_path: string;
  uploaded_at: string;
  project: number;
  uploaded_by: number;
}

interface JobCardProps {
  projectId: number;
  
}


// interface FileViewerCellProps {
//   fileId: number; // you pass this from the row
// }

const JobCard: React.FC<JobCardProps> = ({ projectId}) => {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
// const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
const [openDeleteFileDialog, setOpenDeleteFileDialog] = useState(false);


  useEffect(() => {
    if (projectId) {
      axios
        .get(`http://43.204.203.153:8000/file/get-files/?project_id=${projectId}`)
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
        });
    }
  }, [projectId]);


    const handleOpenDialog = (id: number, name: string) => {
    setSelectedFileId(id);
    setSelectedFileName(name);
    setOpenDialog(true);
  };
  
    const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFileId(null);
    setSelectedFileName('');
  };

const handleUpdateFile = async () => {
  if (!selectedFileId || !selectedFileName.trim()) {
    console.error("File ID or name is missing");
    return;
  }

  const updatedFile = {
    id: selectedFileId,
    file_name: selectedFileName,
  };

  console.log("Updating file:", updatedFile);

  try {
    const data = await apiRequest<{ success: boolean; message?: string }>(
      "PUT",
      endpoints.updateFile, // Define this in your endpoints config
      updatedFile
    );

    if (data.success) {
      console.log("File updated successfully:", data);
      const res = await axios.get(`http://43.204.203.153:8000/file/get-files/?project_id=${projectId}`);
      setFiles(res.data); // Dynamically update UI instead of reload
      handleCloseDialog();
    } else {
      console.error("Update failed:", data.message ?? "Unknown error");
    }
  } catch (error) {
    console.error("Error updating file:", error);
  }finally {
    setLoading(false);
  }
};







const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file_name", file.name);
  formData.append("file_path", file);
  formData.append("project_id", projectId.toString());
  // const userId = localStorage.getItem("user_id") || "0";
  // formData.append("uploaded_by", userId);
  formData.append("id", "46");

  try {
    // Upload file
    const response = await fetch("http://43.204.203.153:8000/file/add-files/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed: ${errorData.detail || response.statusText}`);
    }

    // Parse response data
    const newFile = await response.json();
    
    // Update state with new file
    setFiles(prevFiles => [...prevFiles, newFile]);
    console.log("File uploaded successfully");

  } catch (error) {
    console.error("Error uploading file:", error);
  }
};





const handleOpenDeleteFileDialog = (id: number) => {
  setSelectedFileId(id);
  setOpenDeleteFileDialog(true);
};

  
  // Delete handler
const handleDeleteFile = () => {
  if (selectedFileId === null) return;

  apiRequest<{ success: boolean }>(
    'DELETE',
    `http://43.204.203.153:8000/file/delete-files/?id=${selectedFileId}`
  )
    .then((data) => {
      if (data.success) {
        // Optional: update state before reload if needed
        setFiles((prevFiles) => prevFiles.filter(file => file.id !== selectedFileId));

        // Reload the page after successful delete
        window.location.reload();
      } else {
        alert("Failed to delete file.");
        console.error("Delete response:", data);
      }
    })
    .catch((error) => {
      alert("Something went wrong while deleting.");
      console.error("API error:", error);
    })
    .finally(() => {
      setOpenDeleteFileDialog(false);
      setSelectedFileId(null);
    });
};


  // interface TableRowData {
  //   slNo: number;
  //   particulars: string;
  //   section: string;
  //   quantity: string;
  //   unitWeight: string;
  // }

  // const tableData: TableRowData[] = [
  //   {
  //     slNo: 1,
  //     particulars: "Aadhar Card",
  //     section: "1.76 MB",
  //     quantity: "15",
  //     unitWeight: "200 kg",
  //   },
  //   {
  //     slNo: 2,
  //     particulars: "Pan Card",
  //     section: "6.25 MB",
  //     quantity: "10",
  //     unitWeight: "250 kg",
  //   },
  //   {
  //     slNo: 3,
  //     particulars: "Voter Id Card / Election Card",
  //     section: "2.00 MB",
  //     quantity: "20",
  //     unitWeight: "100 kg",
  //   },
  //   // Add more rows as needed
  // ];

   const [open, setOpen] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const [file, setFile] = useState<FileRow | null>(null);
const handleOpen = async () => {
  if (selectedFileId === null) {
    setError("No file selected");
    return;
  }
  setOpen(true);
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`http://43.204.203.153:8000/file/get-files-by-id/?id=${selectedFileId}`);
    if (!response.ok) throw new Error("Failed to fetch file");
    const data: FileRow = await response.json();
    setFile(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unknown error occurred");
    }
  } finally {
    setLoading(false);
  }
};


  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setError(null);
  };


  return (
    <>
      <Card
        sx={{
          boxShadow: `
            4px 4px 20px 0px #6F8CB069,
            -6px -6px 20px 0px #FFFFFF,
            2px 2px 4px 0px #728EAB1A
          `,
          background: "#E7EBF0",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography variant="h3">Galva Job Card Documents List</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Grid item>
                <Box
                  sx={{
                    width: 108,
                    height: 32,
                    backgroundColor: "#E7EBF0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: `
                      4px 4px 20px 0px #6F8CB069,
                      -6px -6px 20px 0px #FFFFFF,
                      2px 2px 4px 0px #728EAB1A
                    `,
                    borderRadius: "8px",
                    padding: "1.5px",
                    textAlign: "center",
                    gap: "8px", // Add space between icon and text
                  }}
                >
                  <label htmlFor="upload-file">
        <input
          id="upload-file"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <button type="button" onClick={() => document.getElementById("upload-file")?.click()}>
          Upload File
        </button>
      </label>
                </Box>
              </Grid>
            </Box>
          </Box>
        </CardContent>
        {/* <TableContainer
          component={Paper}
         
        >
          <Table sx={{ backgroundColor:'#E7EBF0' }}>
            <TableHead>
              <TableRow >
                <TableCell align="left" sx={{ fontWeight: 700 ,color:'#505576'}}>
                  ID
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 700 ,color:'#505576' }}>
                  NAME
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 700 ,color:'#505576' }}>
                  Size
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 700 ,color:'#505576' }}>
                  Check
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 700 ,color:'#505576' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.slNo}>
                  <TableCell align="left">{row.slNo}</TableCell>
                  <TableCell align="left">{row.particulars}</TableCell>
                  <TableCell align="left">{row.section}</TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left"> <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>View Details</span>
              <MoreVerticalIcon/>
            </Box>
            </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
       <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table sx={{ backgroundColor: "#E7EBF0", tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px" }}>NAME</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px" }}>Uploaded At</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px" }}>Check</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px" }}>View</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell sx={{ fontSize: 12 }}>{file.id}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{file.file_name}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{new Date(file.uploaded_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
               <TableCell>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => {
            setSelectedFileId(file.id); // <-- use the actual file id here
            handleOpen();
          }}
        >
          View Details
        </span>
      </Box>
    </TableCell>

                   <TableCell style={{display:"flex"}}>
                                                {/* Edit Button */}
                                               {files.map((file) => (
                                <div key={file.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  {/* <span>{file.file_name}</span> */}
                                  <IconButton
                                    color="primary"
                                    onClick={() => handleOpenDialog(file.id, file.file_name)}
                                  >
                                    <EditIcon style={{ color: 'grey' }} />
                                  </IconButton>
                                </div>
                              ))}
                    
                                                {/* Delete Button */}
               
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDeleteFileDialog(file.id)} // call function with the file ID
                  >
                    <DeleteIcon style={{ color: "grey" }} />
                  </IconButton>


                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Update File Name</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="File Name"
            value={selectedFileName}
            onChange={(e) => setSelectedFileName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateFile}
            variant="contained"
            color="primary"
            disabled={loading || selectedFileName.trim() === ''}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

        <Dialog
  open={openDeleteFileDialog}
  onClose={() => setOpenDeleteFileDialog(false)}
  fullWidth
  maxWidth="xs"
>
  <DialogTitle>Confirm File Deletion</DialogTitle>
  <DialogContent>
    Are you sure you want to delete this file? This action cannot be undone.
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDeleteFileDialog(false)} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleDeleteFile} color="error">
      Delete
    </Button>
  </DialogActions>
</Dialog>

 <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Document Viewer</DialogTitle>
        <DialogContent dividers>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          {file && (
            <Box>
              {/* Construct full URL */}
              {file.file_name.endsWith(".pdf") ? (
                <iframe
                  src={`${"http://43.204.203.153:8000"}${file.file_path}`}
                  title={file.file_name}
                  width="100%"
                  height="500px"
                  style={{ border: "none" }}
                />
              ) : (
                <img
                  src={`${"http://43.204.203.153:8000"}${file.file_path}`}
                  alt={file.file_name}
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                />
              )}

              <Typography variant="body2" mt={2}>
                File Name: {file.file_name}
              </Typography>
              <Typography variant="body2">
                Uploaded At: {new Date(file.uploaded_at).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      </Card>
    </>
  );
};

export default JobCard;
