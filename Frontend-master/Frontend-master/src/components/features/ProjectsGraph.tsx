import { useState } from "react";
import { Card, CardContent, Typography, Box, Grid,  } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styled from "@emotion/styled";
import fullscreenIcon from "../../assets/fullscreen.png";
// import AppTextField from "../molecules/forms/AppTextField";
import ChartTypeSelector from "../molecules/lists/CharyTypeSelector";
// import {  MoreVertical } from 'lucide-react';
const data = [
  { name: "1", value: 20 },
  { name: "5", value: 35 },
  { name: "10", value: 25 },
  { name: "15", value: 45 },
  { name: "20", value: 30 },
];

const StyledAppModal = styled("div")(() => ({
  width: "auto",
  // [theme.breakpoints.down(400)]: {
  //   width: "auto",
  // },
}));


const ProjectsGraph = () => {
  const [chartType, setChartType] = useState("line");
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpansion = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            <Box sx={{display:'flex'}}>
             {/* <IconButton size="small">
              <MoreVertical size={20} />
            </IconButton> */}
            <Typography variant="h3" sx={{alignContent: "space-around"}} >Projects</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* <AppTextField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              /> */}
             <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                  backgroundColor: '#E7EBF0',color: '#000000', borderRadius: 4, padding:6, border:'none', 
                }}

              />



              <ChartTypeSelector value={chartType} onChange={setChartType} />
              <Grid item>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    backgroundColor: "tranparent",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(37, 100, 230, 0.1)",
                    },
                  }}
                  onClick={toggleExpansion}
                >
                  <img
                    src={fullscreenIcon}
                    alt="Fullscreen"
                    style={{ width: "24px", height: "24px" }}
                  />
                </Box>
              </Grid>
            </Box>
          </Box>

          <Box sx={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {/* {isModalOpen && (
        <StyledAppModal>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: 2,
                width: "50%",
                height: "50%",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Fullscreen View
              </Typography>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  backgroundColor: "#EFF3FD",
                  border: "0.6px solid #BBC5D3",
                  padding: "10px",
                  borderRadius: "10px",
                  marginTop: "5px",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <ResponsiveContainer>
                  <LineChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <button onClick={closeModal} style={{ padding: "5px 10px" }}>
                  Close
                </button>
              </Box>
            </Box>
          </Box>
        </StyledAppModal>
      )} */}
      {isModalOpen && (
        <StyledAppModal>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: 2,
                width: "50%",
                height: "50%", // Ensures the modal height is properly constrained
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Fullscreen View</Typography>
                <button
                  onClick={closeModal}
                  style={{
                    padding: "5px 10px",
                    border: "none",
                    background: "#646cff",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </Box>

              <Grid
                container
                sx={{
                  flex: 1, // Ensures the graph container takes the remaining space
                  backgroundColor: "#EFF3FD",
                  border: "0.6px solid #BBC5D3",
                  padding: "10px",
                  borderRadius: "10px",
                  overflow: "hidden", // Prevents content overflow
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
            </Box>
          </Box>
        </StyledAppModal>
      )}

    </>
  );
};

export default ProjectsGraph;
