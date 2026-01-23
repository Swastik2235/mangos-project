// import React from "react";
// import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

// const NewChart: React.FC = () => {
//   const data = {
//     centerValues: {
//       netProfitLoss: 980123,
//       netAmount: 980123,
//       netCost: 980123,
//     },
//     leftFlows: [
//       { label: "Sales", value: 2356, growth: "+10.74%" },
//       { label: "Indirect income", value: 2356, growth: "+10.74%" },
//       { label: "Others", value: 2356, growth: "+10.74%" },
//       { label: "Opening stock", value: 2356, growth: "+10.74%" },
//     ],
//     rightFlows: [
//       { label: "Profit/Loss", value: 2356, growth: "+10.74%" },
//       { label: "Purchase Account", value: 2356, growth: "+10.74%" },
//       { label: "Direct Expenses", value: 2356, growth: "+10.74%" },
//       { label: "Indirect Expenses", value: 2356, growth: "+10.74%" },
//       { label: "Closing Stock", value: 2356, growth: "+10.74%" },
//     ],
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "1200px",
//         mx: "auto",
//         p: 3,
//         position: "relative",
//         minHeight: "500px",
//       }}
//     >
//       <Grid container justifyContent="center" alignItems="center">
       
//         <Grid item xs={3}>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {data.leftFlows.map((flow, index) => (
//               <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
//                 <Box sx={{ mr: 2 }}>
//                   <Typography variant="h6" component="span">
//                     {flow.value}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     component="span"
//                     sx={{ color: "green", ml: 1 }}
//                   >
//                     {flow.growth}
//                   </Typography>
//                   <Typography variant="body2">{flow.label}</Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     width: 80,
//                     height: 8,
//                     bgcolor: "success.main",
//                     borderRadius: "0 8px 8px 0",
//                   }}
//                 />
//               </Box>
//             ))}
//           </Box>
//         </Grid>

//         <Grid item xs={6}>
//           <Card elevation={3} sx={{ p: 3, mx: "auto" }}>
//             <CardContent>
//               <Box
//                 sx={{
//                   border: 2,
//                   borderColor: "green",
//                   borderRadius: 2,
//                   p: 2,
//                 }}
//               >
//                 <Box sx={{ textAlign: "center", mb: 2 }}>
//                   <Typography variant="body2" color="textSecondary">
//                     Net Profit/Loss
//                   </Typography>
//                   <Typography variant="h5">{data.centerValues.netProfitLoss}</Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     textAlign: "center",
//                     py: 2,
//                     borderTop: 1,
//                     borderBottom: 1,
//                     borderColor: "divider",
//                   }}
//                 >
//                   <Typography variant="body2" color="textSecondary">
//                     Net Amount
//                   </Typography>
//                   <Typography variant="h5">{data.centerValues.netAmount}</Typography>
//                 </Box>
//                 <Box sx={{ textAlign: "center", mt: 2 }}>
//                   <Typography variant="body2" color="textSecondary">
//                     Net Cost
//                   </Typography>
//                   <Typography variant="h5">{data.centerValues.netCost}</Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={3}>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {data.rightFlows.map((flow, index) => (
//               <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
//                 <Box
//                   sx={{
//                     width: 80,
//                     height: 8,
//                     bgcolor: "brown",
//                   }}
//                 />
//                 <Box sx={{ ml: 2 }}>
//                   <Typography variant="h6" component="span">
//                     {flow.value}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     component="span"
//                     sx={{ color: "green", ml: 1 }}
//                   >
//                     {flow.growth}
//                   </Typography>
//                   <Typography variant="body2">{flow.label}</Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default NewChart;

