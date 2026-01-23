import { Box, Typography, TextField, Button, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, MenuItem, FormControl, Select, SelectChangeEvent, Avatar } from '@mui/material';
import { Upload, Plus, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import endpoints from "../../utils/apiEndPoints";
import { apiRequest } from "../../utils/apiclient";

const outerShadow = `
  4px 4px 20px 0px #6F8CB069,
  -6px -6px 20px 0px #FFFFFF,
  2px 2px 4px 0px #728EAB1A
`;

const innerShadow = `
  inset 2.5px 2.5px 5px 0px #A7AABB80,
  inset -2.5px -2.5px 5px 0px #FAFBFF
`;

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#E7EBF0',
    boxShadow: innerShadow,
    borderRadius: '8px',
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px 16px',
  },
};

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
};

type MachineMaster = {
  id: number;
  machine_name: string;
};

interface Client {
  id: number;
  client_name: string;
}

// interface Project {
//   id: number;
//   name: string;
// }

interface Workflow {
  id: number;
  name: string;
}

const CreateProject = () => {
  // Refs for file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bomFileInputRef = useRef<HTMLInputElement>(null);
  const [projectName, setProjectName] = useState<string>("");

  // Form state
  // const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [consignmentId, setConsignmentId] = useState<string>("");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedMachine, setSelectedMachine] = useState<string>("");
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [bomFile, setBomFile] = useState<File | null>(null);

  const resetForm = () => {
  setProjectName('');
  setConsignmentId('');
  setSelectedClient('');
  setSelectedWorkflowId('');
  setStartDate("null");
  setEndDate("null");
  setDescription('');
  setSelectedEmployee('');
  setSelectedMachine('');
  setUploadedFiles([]);
  setBomFile(null);
  setFileInputs([]);
};

  // Popup state
  const [openClientPopup, setOpenClientPopup] = useState(false);
  const [openFilePopup, setOpenFilePopup] = useState(false);
  const [fileInputs, setFileInputs] = useState<{ id: number; file: File | null; name: string }[]>([
    { id: Date.now(), file: null, name: '' }
  ]);
  // const [selectedProjectId, setSelectedProjectId] = useState<number | "">("");

  // Data state
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [machines, setMachines] = useState<MachineMaster[]>([]);
  // const [projects, setProjects] = useState<Project[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | number>('');

  // Fetch data effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employees
        const empResponse = await apiRequest<{ success: boolean; data: { Employee: Employee[] } }>(
          'GET',
          endpoints.getEmployeeDetails
        );
        console.log('Employee API Response:', empResponse);
        if (empResponse.success && Array.isArray(empResponse.data?.Employee)) {
          setEmployees(empResponse.data.Employee);
        }

        // Fetch machines
        const machineResponse = await apiRequest<{ success: boolean; data: { "Machine Master": MachineMaster[] } }>(
          'GET',
          endpoints.getMachineMaster
        );
        if (machineResponse.success && Array.isArray(machineResponse.data?.["Machine Master"])) {
          setMachines(machineResponse.data["Machine Master"]);
        }

        // Fetch projects
        // const projectResponse = await apiRequest<{ success: boolean; data: Project[] }>(
        //   'GET',
        //   'project-details/get-project-names/'
        // );
        // if (projectResponse.success && Array.isArray(projectResponse.data)) {
        //   setProjects(projectResponse.data);
        // }

        // Fetch workflows
        const workflowResponse = await apiRequest<{ success: boolean; data: Workflow[] }>(
          'GET',
          'workflow/get-workflow/'
        );
        if (workflowResponse.success && Array.isArray(workflowResponse.data)) {
          setWorkflows(workflowResponse.data);
        }

        // Fetch clients
        const clientResponse = await apiRequest<{ success: boolean; data?: { Employee?: Client[] } }>(
          "GET",
          endpoints.getClientDetails
        );
        if (clientResponse.success && clientResponse.data?.Employee && Array.isArray(clientResponse.data.Employee)) {
          setClients(clientResponse.data.Employee);
        }

        // Load saved client ID
        const savedClientId = localStorage.getItem('selectedClientId');
        if (savedClientId) {
          setSelectedClient(Number(savedClientId));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Client dialog handlers
  const handleOpenClient = () => setOpenClientPopup(true);
  const handleCloseClient = () => setOpenClientPopup(false);

  // File dialog handlers
  // const handleOpenFile = () => setOpenFilePopup(true);
  const handleCloseFile = () => {
    setFileInputs([{ id: Date.now(), file: null, name: '' }]);
    setOpenFilePopup(false);
  };

  // File input handlers
  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const updatedFiles = [...fileInputs];
      updatedFiles[index].file = event.target.files[0];
      setFileInputs(updatedFiles);
    }
  };

  const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFiles = [...fileInputs];
    updatedFiles[index].name = event.target.value;
    setFileInputs(updatedFiles);
  };

  const addFileInput = () => {
    setFileInputs([...fileInputs, { id: Date.now(), file: null, name: '' }]);
  };

  const removeFileInput = (index: number) => {
    if (fileInputs.length > 1) {
      setFileInputs(fileInputs.filter((_, i) => i !== index));
    }
  };

  // Client selection handler
  const handleClientChange = (event: SelectChangeEvent<string | number>) => {
    const value = event.target.value;
    setSelectedClient(value);
    localStorage.setItem('selectedClientId', value.toString());
  };

  // File upload triggers
  const triggerFileInput = () => fileInputRef.current?.click();
  const triggerBomFileInput = () => bomFileInputRef.current?.click();

  // Project creation handler
  const handleCreateProject = async () => {
    const formData = new FormData();

    function formatDate(dateObj: Date | string) {
      if (!dateObj) return null;
      const d = new Date(dateObj);
      if (isNaN(d.getTime())) return null;
      return d.toISOString().split("T")[0]; // returns YYYY-MM-DD
    }
  
    // const projectName = setProjectName || '';


    // Required fields
  
      formData.append('name', projectName);
      if (!projectName ) {
        console.error("Project name and consignment ID are required.");
        return;
      }

    formData.append('consignment_id', consignmentId);
    if (selectedClient) {
      formData.append('client_id', selectedClient.toString());
    }
  
    // Optional fields
    formData.append('workflow', selectedWorkflowId);
    const formattedStartDate = formatDate(startDate);
      if (formattedStartDate) {
        formData.append('start_date', formattedStartDate);
      }

      const formattedEndDate = formatDate(endDate);
      if (formattedEndDate) {
        formData.append('end_date', formattedEndDate);
      }
    formData.append('description', description);
    formData.append('employee', selectedEmployee);
    formData.append('machine', selectedMachine);
  
    // Files
    // if (uploadedFile) formData.append('files', uploadedFile);
    uploadedFiles.forEach((file) => {
  formData.append('files', file); // use 'files[]' if your backend expects that
});

    if (bomFile) formData.append('bom_sheet', bomFile);
  
    fileInputs.forEach(input => {
      if (input.file) {
        formData.append('files', input.file);
        if (input.name) formData.append('file_names', input.name);
      }
    });
  
    // Debug logs
    console.log('Sending to API:', {
      name: projectName,
      consignment_id: consignmentId,
      client_id: selectedClient,
    });
  
   try {
  const res = await apiRequest(
    'POST',
    'project-details/create-project/',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    } 
  );
  console.log('Project created successfully:', res);
  window.alert('Project created successfully!');
  resetForm();
 
  // window.location.reload(); // Refresh the page
} catch (err) {
  console.error('Error creating project:', err);
  window.alert('Failed to create project. Please try again.');
}
  };
  
  

  return (
    <Box sx={{ p: 3, maxWidth: '100%', bgcolor: '#E7EBF0' }}>
      <Typography variant="h2" sx={{ mb: 4 }}>Create Project</Typography>

      {/* Consignment Initiation Section */}
      <Box sx={{ mb: 4, bgcolor: '#E7EBF0', p: 3, borderRadius: 2, boxShadow: outerShadow, maxWidth: { xs: '100%', sm: '100%', lg: '80%' }}}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <Box sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#E7EBF0',
            boxShadow: innerShadow,
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14
          }}>
            1
          </Box>
          <Typography variant="h3">Consignment initiation</Typography>
        </Box>

        {/* Project & Consignment ID */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, ml: 4 }}>
            <Box sx={{ flex: 1 }}>
            <InputLabel>Project name</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter project name"
             value={projectName}
              onChange={(e) => setProjectName(e.target.value)}

              sx={inputStyles}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <InputLabel>Consignment ID</InputLabel>
            <TextField
              fullWidth
              placeholder="P-104"
              value={consignmentId}
              onChange={(e) => setConsignmentId(e.target.value)}
              sx={inputStyles}
            />
          </Box>
        </Box>

        {/* Workflow */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, ml: 4 }}>
          <Box sx={{ flex: 1 }}>
            <InputLabel>Workflow</InputLabel>
            <TextField
              fullWidth
              select
              value={selectedWorkflowId}
              onChange={(e) => setSelectedWorkflowId(e.target.value)}
              sx={inputStyles}
            >
              <MenuItem value="">Select a workflow</MenuItem>
              {workflows.map((wf) => (
                <MenuItem key={wf.id} value={wf.id}>
                  {wf.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Dates */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, ml: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <InputLabel>Start date</InputLabel>
            <TextField
              fullWidth
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={inputStyles}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <InputLabel>End date</InputLabel>
            <TextField
              fullWidth
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={inputStyles}
            />
          </Box>
        </Box>

        {/* Description */}
        <Box sx={{ mb: 3, ml: 4 }}>
          <InputLabel>Project description</InputLabel>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={inputStyles}
          />
        </Box>

        {/* File upload */}
<Box sx={{ mb: 3, ml: 4 }}>
  <InputLabel>Files</InputLabel>
  <Box
    sx={{
      border: '1px dashed #A7AABB',
      borderRadius: 1,
      p: 3,
      textAlign: 'center',
      bgcolor: '#E7EBF0'
    }}
  >
    <Typography sx={{ color: '#6B7280', mb: 1 }}>
      Drag and drop important files related to project
    </Typography>
    <Typography sx={{ color: '#6B7280', mb: 2 }}>or</Typography>
    <Button
      startIcon={<Upload size={20} />}
      onClick={triggerFileInput}
      sx={{
        color: '#2564E6',
        bgcolor: 'transparent',
        border: '1px solid #2564E6',
        '&:hover': { bgcolor: 'rgba(37, 100, 230, 0.04)' }
      }}
    >
      Upload files
    </Button>
    <input
      ref={fileInputRef}
      type="file"
      hidden
      multiple
      onChange={(e) => {
        const files = e.target.files;
        if (files) {
          setUploadedFiles(Array.from(files));
        }
      }}
    />

    {uploadedFiles.length > 0 && (
      <Box sx={{ mt: 2 }}>
        {uploadedFiles.map((file, index) => (
          <Typography key={index} sx={{ color: '#4B5563' }}>
            📎 {file.name}
          </Typography>
        ))}
      </Box>
    )}
  </Box>
</Box>



        {/* BOM file upload */}
  <Box sx={{ mb: 3, ml: 4 }}>
  <InputLabel>BOM Sheet</InputLabel>
  <Box
    sx={{
      border: '1px dashed #A7AABB',
      borderRadius: 1,
      p: 3,
      textAlign: 'center',
      bgcolor: '#E7EBF0'
    }}
  >
    <Typography sx={{ color: '#6B7280', mb: 1 }}>
      Drag and drop BOM file
    </Typography>
    <Typography sx={{ color: '#6B7280', mb: 2 }}>or</Typography>
    <Button
      startIcon={<Upload size={20} />}
      onClick={triggerBomFileInput}
      sx={{
        color: '#2564E6',
        bgcolor: 'transparent',
        border: '1px solid #2564E6',
        '&:hover': { bgcolor: 'rgba(37, 100, 230, 0.04)' }
      }}
    >
      Upload BOM file
    </Button>
    <input
      ref={bomFileInputRef}
      type="file"
      hidden
      onChange={(e) => setBomFile(e.target.files?.[0] || null)}
    />

    {/* ✅ Show BOM file name if selected */}
    {bomFile && (
      <Typography sx={{ mt: 2, color: '#4B5563' }}>
        Selected BOM file: <strong>{bomFile.name}</strong>
      </Typography>
    )}
  </Box>
</Box>

      </Box>

      {/* Onboard Client Section */}
      <Box sx={{ mb: 4, bgcolor: '#E7EBF0', p: 3, borderRadius: 2, boxShadow: outerShadow, maxWidth: { xs: '100%', sm: '100%', lg: '80%' }}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#E7EBF0',
              boxShadow: innerShadow,
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
            }}>
              2
            </Box>
            <Typography variant="h3">Onboard client</Typography>
          </Box>

          <Button
            startIcon={<Plus size={18} />}
            onClick={handleOpenClient}
            sx={{
              color: '#242A54',
              bgcolor: '#E7EBF0',
              '&:hover': { bgcolor: 'rgba(37, 100, 230, 0.04)' },
              boxShadow: outerShadow,
            }}
          >
            Add client
          </Button>
        </Box>

        {/* Show selected client details */}
        {selectedClient && (
          <Box sx={{ display: 'flex', gap: 2, ml: 1, mt: 3 }}>
            {clients
              .filter((client) => client.id === selectedClient)
              .map((client) => (
                <Box
                  key={client.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    width: '100%',
                  }}
                >
                  <Avatar sx={{ width: 40, height: 40 }}>
                    {client.client_name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      {client.client_name}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        )}
      </Box>

      {/* Allocation Section */}
      <Box sx={{ mb: 4, bgcolor: '#E7EBF0', p: 3, borderRadius: 2, boxShadow: outerShadow, maxWidth: { xs: '100%', sm: '100%', lg: '80%' }}}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <Box sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#E7EBF0',
            boxShadow: innerShadow,
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14
          }}>
            3
          </Box>
          <Typography variant="h3">Allocation</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, ml: 4 }}>
          <Box sx={{ flex: 1 }}>
            <InputLabel>Manpower</InputLabel>
            <TextField
              fullWidth
              select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              sx={inputStyles}
            >
              <MenuItem value="">Select Employee</MenuItem>
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.first_name} {emp.last_name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputLabel>Machine</InputLabel>
            <TextField
              fullWidth
              select
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              sx={inputStyles}
            >
              <MenuItem value="">Select Machine</MenuItem>
              {machines.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.machine_name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ mb: 3, ml: 4 }}>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: '10px',
              py: 1.5,
              background: 'linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.73) 100%)',
              '&:hover': {
                background: 'linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.8) 100%)'
              },
              width: '160px'
            }}
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </Box>
      </Box>

      {/* Add Client Popup */}
      <Dialog open={openClientPopup} onClose={handleCloseClient}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="client-label" sx={{ color: 'black' }}>Client Name</InputLabel>
            <Select
              labelId="client-label"
              id="client-select"
              value={selectedClient}
              onChange={handleClientChange}
              label="Client Name"
              variant="outlined"
              sx={{
                color: 'black',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
              }}
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id} sx={{ color: 'black' }}>
                  {client.client_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClient} color="secondary">Cancel</Button>
          <Button onClick={handleCloseClient} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Upload File Popup */}
      <Dialog open={openFilePopup} onClose={handleCloseFile} fullWidth maxWidth="sm">
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          {fileInputs.map((fileInput, index) => (
            <Box key={fileInput.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                component="label"
                sx={{ minWidth: 120 }}
              >
                Select File
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(index, e)}
                />
              </Button>
              <TextField
  fullWidth
  label="File Name"
  value={fileInput.name}
  onChange={(e) => handleNameChange(index, e as React.ChangeEvent<HTMLInputElement>)} // Cast event to HTMLInputElement
/>
              {fileInputs.length > 1 && (
                <IconButton onClick={() => removeFileInput(index)} color="error">
                  <X size={20} />
                </IconButton>
              )}
            </Box>
          ))}
          <Button startIcon={<Plus size={18} />} onClick={addFileInput} sx={{ mt: 2 }}>
            Add More Files
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFile} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseFile}
            disabled={fileInputs.some((f) => !f.file || !f.name)}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateProject;