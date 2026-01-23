// import { FC, useState } from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   Button,
//   Modal,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   SelectChangeEvent,
// } from "@mui/material";
// import fileimg from "../../assets/Frame 1000004623.png";
// import Collection from "../../components/features/Collection";
// import { Folder } from "lucide-react";
// import { useNavigate } from 'react-router-dom';



// const DatasetsCollection: FC = () => {
//   const navigate = useNavigate();
//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 800,
//     bgcolor: "background.default",
//     borderRadius: 2,
//     boxShadow: 24,
//     p: 4,
//   };

//   const innerShadow = `
//     inset 2.5px 2.5px 5px 0px #A7AABB80,
//     inset -2.5px -2.5px 5px 0px #FAFBFF
//   `;

//   const inputStyles = {
//     "& .MuiOutlinedInput-root": {
//       backgroundColor: "#E7EBF0",
//       boxShadow: innerShadow,
//       borderRadius: "8px",
//       "& fieldset": {
//         border: "none",
//       },
//     },
//     "& .MuiOutlinedInput-input": {
//       padding: "12px 16px",
//     },
//   };

//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     datasetName: "",
//     templateDataset: "",
//   });

//   const templateDataset = ["Template A", "Template B", "Template C"];

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // The event type is adjusted for both TextField and SelectChangeEvent
//   const handleChange = (field: keyof typeof formData) => (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
//   ) => {
//     setFormData({ ...formData, [field]: event.target.value });
//   };

//   const handleSubmit = () => {
//     console.log("Form Data:", formData);
//     handleClose();
//   };

  
//   const collections = [
//     { project: "Project A", jobtitle: ["Job Card1", "Job Card2", "Job Card3", "Job Card4" ] },
//     { project: "Project B", jobtitle: ["Job Card1", "Job Card2"] },
//     { project: "Project C", jobtitle: ["Job Card1", "Job Card2"] },
//     { project: "Project D", jobtitle: ["Job Card1", "Job Card2"] },
//   ];

//   return (
//     <>
//       <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
     
//         <Typography variant="h6" sx={{ mb: 1 }}>
//           Collections
//         </Typography>

//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<Folder size={18} />}
//           sx={{
//             textTransform: "none",
//             borderRadius: "10px",
//             width: 180,
//             py: 1,
//             background: "linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.73) 100%)",
//             "&:hover": {
//               background: "linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.8) 100%)",
//             },
//           }}
//           onClick={handleOpen}
//         >
//           Add Collection
//         </Button>
//       </Box>

//       <Modal open={open} onClose={handleClose}>
//         <Box sx={modalStyle}>
//           <Typography variant="h6" sx={{ mb: 3 }}>
//             Add Task
//           </Typography>

//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//             <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
//               <Box sx={{ flex: "1" }}>
//                 <InputLabel>Dataset Name</InputLabel>
//                 <TextField
//                   sx={inputStyles}
//                   fullWidth
//                   type="text"
//                   value={formData.datasetName}
//                   onChange={handleChange("datasetName")}
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Box>
//               <Box sx={{ flex: "1" }}>
//                 <InputLabel>Search for template</InputLabel>
//                 <FormControl fullWidth sx={inputStyles}>
//                   <Select value={formData.templateDataset} onChange={handleChange('templateDataset')}>
//                     {templateDataset.map((status) => (
//                       <MenuItem key={status} value={status}>
//                         {status}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Box>
//             </Box>

//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//               <Button
//                 onClick={handleClose}
//                 sx={{
//                   border: "1px solid #2564E6",
//                   color: "#2564E6",
//                   px: 3,
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSubmit}
//                 sx={{
//                   bgcolor: "#2564E6",
//                   color: "white",
//                   px: 3,
//                   "&:hover": {
//                     bgcolor: "#1a47b8",
//                   },
//                 }}
//               >
//                 Create Dataset
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>

//       <Grid container spacing={3}>
//         {collections.map((collection, index) => (
//           <Grid item xs={12} sm={6} md={2} key={index} >
//             <div  onClick={() => navigate('/datasets')}>
//             <Collection
//               project={collection.project}
//               jobtitle={collection.jobtitle}
//               icon={
//                 <img
//                   src={fileimg}
//                   alt="File Icon"
//                   style={{ width: 20, height: 20 }}
//                 />
//               }
              
//             />
//             </div>
//           </Grid>
//         ))}
//       </Grid>

//     </>
//   );
// };

// export default DatasetsCollection;


import { FC, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import fileimg from "../../assets/Frame 1000004623.png";
import Collection from "../../components/features/Collection";
import { Folder } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../utils/apiclient';
import endpoints from '../../utils/apiEndPoints';


interface Project {
  id: number;
  name: string;
}

interface ApiResponse {
  success: boolean;
  status: number;
  message: string;
  data: Project[];
}

const DatasetsCollection: FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    datasetName: "",
    templateDataset: "",
  });

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.default",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const innerShadow = `
    inset 2.5px 2.5px 5px 0px #A7AABB80,
    inset -2.5px -2.5px 5px 0px #FAFBFF
  `;

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#E7EBF0",
      boxShadow: innerShadow,
      borderRadius: "8px",
      "& fieldset": {
        border: "none",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "12px 16px",
    },
  };

  const templateDataset = ["Template A", "Template B", "Template C"];

 useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiRequest<ApiResponse>(
          "GET",
          endpoints.getprojectdetailsname
        );
        if (response.success) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    handleClose();
  };

  return (
    <>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Projects
        </Typography>

        <Button
          variant="contained"
          fullWidth
          startIcon={<Folder size={18} />}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            width: 180,
            py: 1,
            background: "linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.73) 100%)",
            "&:hover": {
              background: "linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.8) 100%)",
            },
          }}
          onClick={handleOpen}
        >
          Add Collection
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Add Task
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <Box sx={{ flex: "1" }}>
                <InputLabel>Dataset Name</InputLabel>
                <TextField
                  sx={inputStyles}
                  fullWidth
                  type="text"
                  value={formData.datasetName}
                  onChange={handleChange("datasetName")}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ flex: "1" }}>
                <InputLabel>Search for template</InputLabel>
                <FormControl fullWidth sx={inputStyles}>
                  <Select 
                    value={formData.templateDataset} 
                    onChange={handleChange('templateDataset')}
                  >
                    {templateDataset.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                onClick={handleClose}
                sx={{
                  border: "1px solid #2564E6",
                  color: "#2564E6",
                  px: 3,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                sx={{
                  bgcolor: "#2564E6",
                  color: "white",
                  px: 3,
                  "&:hover": {
                    bgcolor: "#1a47b8",
                  },
                }}
              >
                Create Dataset
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={2} key={project.id}>
            <div onClick={() => navigate('/datasets', { state: { projectId: project.id } })}>
              <Collection
                project={project.name}
                jobtitle={["Job Card1", "Job Card2", "Job Card3", "Job Card4"]}
                icon={
                  <img
                    src={fileimg}
                    alt="File Icon"
                    style={{ width: 20, height: 20 }}
                  />
                }
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DatasetsCollection;
