import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const projectData = [
  {
    title: "UTKARSHA INDUSTRIES",
    subtitle: "GALVANIZING TOWER PART",
    status: "Ongoing",
    steps: ["Consignment Initiated", "Client Onboarding", "Resource Allocation", "Production Control"],
    people: 1,
  },
  {
    title: "Traffo - Radiators",
    subtitle: "Normal Coating - 86μ micron 20 July",
    status: "Ongoing",
    steps: ["Consignment Initiated", "Client Onboarding", "Resource Allocation", "Production Control"],
    people: 1,
  },
  {
    title: "Phoenix high mast",
    subtitle: "Coating requirement 86 micron",
    status: "Ongoing",
    steps: ["Consignment Initiated", "Client Onboarding", "Resource Allocation", "Production Control"],
    people: 1,
  },
  {
    title: "Tarang Engineering Galva",
    subtitle: "Galvanisation of Radiators; Double Dip",
    status: "Ongoing",
    steps: ["Consignment Initiated", "Client Onboarding", "Resource Allocation", "Production Control"],
    people: 1,
  },
];

const ProjectCardsUI: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {projectData.map((project, index) => (
        <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              {/* Header */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.subtitle}
                  </Typography>
                </Box>
                <Chip
                  label={project.status}
                  size="small"
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    borderRadius: "4px",
                    fontWeight: 500,
                  }}
                />
              </Box>

              {/* Steps */}
              <Box display="flex" justifyContent="space-between" mt={3} mb={2}>
                {project.steps.map((step, i) => (
                  <Box textAlign="center" key={i}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        border: "2px solid #ccc",
                        borderRadius: "50%",
                        mx: "auto",
                      }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Footer */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ width: 28, height: 28 }}>G</Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {project.people} people associated with this project
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectCardsUI;
