// // import { FC } from "react";
// // import { Grid, Box,   Typography, Button} from "@mui/material";
// // import {  Plus } from "lucide-react";
// // import fileimg from "../../assets/Frame 1000004623.png";
// // import FileCard from "../../components/molecules/cards/FileCard";
// // import JobCard from "../../components/features/JobCard";
// // import { Link } from "react-router-dom"; 
// // import '../../App.css';
// // const Datasets: FC = () => {
// //   return (
// //     <>
// //      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
      
// //         {/* <Typography variant="h4" sx={{ mb: 1 }}>
// //           Collections  /  Project A
// //         </Typography> */}
// //         <Typography variant="h4" sx={{ mb: 1 }}>
// //           <Link 
// //             to="/datasetsCollection" className="link"
// //             style={{ textDecoration: "none", color: "inherit" }} 
// //           >
// //             Collections
// //           </Link>
// //           {"  /  "}
// //           <Link 
// //             to="/datasets" className="link" // Assuming this redirects to Project A page
// //             style={{ textDecoration: "none", color: '#2564E6' }} 
// //           >
// //             <b>Project A </b>
// //           </Link>
// //         </Typography>
        

// //         <Button
// //           variant="contained"
// //           fullWidth
// //           startIcon={<Plus size={18} />}
// //           sx={{
// //             textTransform: "none",
// //             borderRadius: "10px",
// //             width: 180,
// //             py: 1,
// //             background: "linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.73) 100%)",
// //             "&:hover": {
// //               background: "linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.8) 100%)",
// //             },
// //           }}
// //         >
// //           Create Folder
// //         </Button>
// //       </Box>
// //     <Grid container spacing={3}>
// //       {/* Stat Cards */}
// //       <Grid item xs={12} sm={6} md={2}>
// //       <Link
// //           to="/jobcardDetail"
// //           style={{
// //             textDecoration: "none",
// //             color: "inherit",
// //             display: "block", // Ensures the whole FileCard is clickable
// //           }}
// //         >
// //         <FileCard
// //           title="Galva Job Card"
// //           value="26.9 MB"
// //           icon={
// //             <img
// //               src={fileimg}
// //               alt="Dollar Icon"
// //               style={{ width: 50, height: 50 }}
// //             />
// //           }
// //         />
// //         </Link>
// //       </Grid>
// //       <Grid item xs={12} sm={6} md={2}>
// //       <Link
// //           to="/jobcardDetail"
// //           style={{
// //             textDecoration: "none",
// //             color: "inherit",
// //             display: "block", // Ensures the whole FileCard is clickable
// //           }}
// //         >
// //         <FileCard
// //           title="Galva Job Card"
// //           value="26.9 MB"
// //           icon={
// //             <img
// //               src={fileimg}
// //               alt="Dollar Icon"
// //               style={{ width: 50, height: 50 }}
// //             />
// //           }
// //         />
// //         </Link>
// //       </Grid>
// //       <Grid item xs={12} sm={6} md={2}>
// //       <Link
// //           to="/jobcardDetail"
// //           style={{
// //             textDecoration: "none",
// //             color: "inherit",
// //             display: "block", // Ensures the whole FileCard is clickable
// //           }}
// //         >
// //         <FileCard
// //           title="Galva Job Card"
// //           value="26.9 MB"
// //           icon={
// //             <img
// //               src={fileimg}
// //               alt="Dollar Icon"
// //               style={{ width: 50, height: 50 }}
// //             />
// //           }
// //         />
// //         </Link>
// //       </Grid>
// //       <Grid item xs={12} sm={6} md={2}>
// //       <Link
// //           to="/jobcardDetail"
// //           style={{
// //             textDecoration: "none",
// //             color: "inherit",
// //             display: "block", // Ensures the whole FileCard is clickable
// //           }}
// //         >
// //         <FileCard
// //           title="Galva Job Card"
// //           value="26.9 MB"
// //           icon={
// //             <img
// //               src={fileimg}
// //               alt="Dollar Icon"
// //               style={{ width: 50, height: 50 }}
// //             />
// //           }
// //         />
// //         </Link>
// //       </Grid>
// //       <Grid item xs={12} sm={6} md={2}>
// //       <Link
// //           to="/jobcardDetail"
// //           style={{
// //             textDecoration: "none",
// //             color: "inherit",
// //             display: "block", // Ensures the whole FileCard is clickable
// //           }}
// //         >
// //         <FileCard
// //           title="Galva Job Card"
// //           value="26.9 MB"
// //           icon={
// //             <img
// //               src={fileimg}
// //               alt="Dollar Icon"
// //               style={{ width: 50, height: 50 }}
// //             />
// //           }
// //         />
// //         </Link>
// //       </Grid>
// //       <Grid item xs={12} sm={6} md={2}>
// //       <Link
// //           to="/jobcardDetail"
// //           style={{
// //             textDecoration: "none",
// //             color: "inherit",
// //             display: "block", // Ensures the whole FileCard is clickable
// //           }}
// //         >
// //         <FileCard
// //           title="Galva Job Card"
// //           value="26.9 MB"
// //           icon={
// //             <img
// //               src={fileimg}
// //               alt="Dollar Icon"
// //               style={{ width: 50, height: 50 }}
// //             />
// //           }
// //         />
// //         </Link>
// //       </Grid>

// //        {/* Graphs and Calendar */}
// //        <Grid item xs={12} md={12}>
// //         <JobCard />
// //       </Grid>
// //     </Grid>
// //     </>
// //   );
// // };

// // export default Datasets;


// import  React, { useRef, FC } from "react";


// import { Grid, Box,   Typography, Button} from "@mui/material";
// import {  Plus } from "lucide-react";
// import fileimg from "../../assets/Frame 1000004623.png";
// import FileCard from "../../components/molecules/cards/FileCard";
// import JobCard from "../../components/features/JobCard";
// import { Link } from "react-router-dom"; 
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import IconButton from '@mui/material/IconButton';
// import '../../App.css';
// const Datasets: FC = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const scrollAmount = clientWidth * 0.8; // scroll by 80% of visible area
//       scrollRef.current.scrollTo({
//         left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };
//   return (
//     <>
//      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
      
//         {/* <Typography variant="h4" sx={{ mb: 1 }}>
//           Collections  /  Project A
//         </Typography> */}
//         <Typography variant="h4" sx={{ mb: 1 }}>
//           <Link 
//             to="/datasetsCollection" className="link"
//             style={{ textDecoration: "none", color: "inherit" }} 
//           >
//             Collections
//           </Link>
//           {"  /  "}
//           <Link 
//             to="/datasets" className="link" // Assuming this redirects to Project A page
//             style={{ textDecoration: "none", color: '#2564E6' }} 
//           >
//             <b>Project A </b>
//           </Link>
//         </Typography>
        

//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<Plus size={18} />}
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
//         >
//           Create Folder
//         </Button>
//       </Box>
//     <Grid container spacing={3}>
//       {/* Stat Cards */}
    

// <Box sx={{ position: "relative", width: "100%" }}>
//         <IconButton
//           onClick={() => scroll("left")}
//           sx={{
//             position: "absolute",
//             left: 0,
//             top: "50%",
//             zIndex: 2,
//             transform: "translateY(-50%)",
//             bgcolor: "#fff",
//             boxShadow: 2,
//             "&:hover": { bgcolor: "#f0f0f0" },
//             display: { xs: "none", md: "flex" }
//           }}
//         >
//           <ArrowBackIosNewIcon />
//         </IconButton>
//         <Box
//           ref={scrollRef}
//           sx={{
//             overflowX: "auto",
//             display: "flex",
//             gap: 2,
//             px: 6, // space for arrows
//             scrollBehavior: "smooth",
//             "&::-webkit-scrollbar": { display: "none" },
//             marginBottom: 1,
//             marginTop: 2,
//           }}
//         >
//           {[...Array(20)].map((_, idx) => (
//             <Box
//               key={idx}
//               sx={{
//                 minWidth: { xs: 180, sm: 200, md: 220, lg: 220 },
//                 maxWidth: { xs: 180, sm: 200, md: 220, lg: 220 },
//                 flex: "0 0 auto",
//                 marginTop: 2,
//                 marginBottom: 2,
//               }}
//             >
//               <Link
//                 to="/jobcardDetail"
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   display: "block",
//                 }}
//               >
//                 <FileCard
//                   title={` Job Card ${idx + 1}`}
//                   value="26.9 MB"
//                   icon={
//                     <img
//                       src={fileimg}
//                       alt="Dollar Icon"
//                       style={{ width: 50, height: 50 }}
//                     />
//                   }
//                 />
//               </Link>
//             </Box>
//           ))}
//         </Box>
//         <IconButton
//           onClick={() => scroll("right")}
//           sx={{
//             position: "absolute",
//             right: 0,
//             top: "50%",
//             zIndex: 2,
//             transform: "translateY(-50%)",
//             bgcolor: "#fff",
//             boxShadow: 2,
//             "&:hover": { bgcolor: "#f0f0f0" },
//             display: { xs: "none", md: "flex" }
//           }}
//         >
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>
      

//        {/* Graphs and Calendar */}
//        <Grid item xs={12} md={12}>
//         <JobCard />
//       </Grid>
//     </Grid>
//     </>
//   );
// };

// export default Datasets;  
import  { useRef, FC, useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Plus } from "lucide-react";
import fileimg from "../../assets/Frame 1000004623.png";
import FileCard from "../../components/molecules/cards/FileCard";
import JobCard from "../../components/features/JobCard";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

import '../../App.css';
import { apiRequest } from '../../utils/apiclient';
import endpoints from '../../utils/apiEndPoints';


interface JobCardItem {
  id: number;
  jc_no: string;
}

const Datasets: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [jobCards, setJobCards] = useState<JobCardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

const location = useLocation();
  const projectId = location.state?.projectId;

    const fetchJobCards = async () => {
      try {
        const response = await apiRequest<JobCardItem[]>(
          "GET",
          `${endpoints.getjobcardlist}?project_id=${projectId}`
        );
        const filtered = response.filter(card => card.jc_no.toLowerCase() !== "nan");
        setJobCards(filtered);
      } catch (err) {
        setError("Failed to fetch job cards");
        console.error("Error fetching job cards:", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!projectId) {
      setError("No project ID provided");
      setLoading(false);
      return;
    }

  
    fetchJobCards();
  }, [projectId]);

   const handleCreateJobcard = async () => {
    if (!projectId) {
      console.error("Project ID is missing");
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest<JobCardItem[]>(
        "GET",
        `${endpoints.createjobcard}?project_id=${projectId}`
      );

      if (response) {
        console.log("Fetched Job Card Data:", response);
        //  window.location.reload();
        fetchJobCards();
        // Handle response: show table, dialog, etc.
      } else {
        console.error("No job card data received");
      }
    } catch (error) {
      console.error("API error while fetching job card data:", error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          <Link 
            to="/datasetsCollection" 
            className="link"
            style={{ textDecoration: "none", color: "inherit" }} 
          >
            Collections
          </Link>
          {"  /  "}
          <Link 
            to="/datasets" 
            className="link"
            style={{ textDecoration: "none", color: '#2564E6' }} 
          >
            <b>Project A </b>
          </Link>
        </Typography>

       <Button
      variant="contained"
      fullWidth
      startIcon={<Plus size={18} />}
      onClick={handleCreateJobcard}
      disabled={loading}
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
    >
      {loading ? "Loading..." : "Create Jobcard"}
    </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Box sx={{ position: "relative", width: "100%" }}>
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              zIndex: 2,
              transform: "translateY(-50%)",
              bgcolor: "#fff",
              boxShadow: 2,
              "&:hover": { bgcolor: "#f0f0f0" },
              display: { xs: "none", md: "flex" }
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          
          <Box
            ref={scrollRef}
            sx={{
              overflowX: "auto",
              display: "flex",
              gap: 2,
              px: 6,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
              marginBottom: 1,
              marginTop: 2,
            }}
          >
            {jobCards.map((jobCard) => (
              <Box
                key={jobCard.id}
                sx={{
                  minWidth: { xs: 180, sm: 200, md: 220, lg: 220 },
                  maxWidth: { xs: 180, sm: 200, md: 220, lg: 220 },
                  flex: "0 0 auto",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <Link
                  to={`/jobcardDetail/${jobCard.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <FileCard
                    title={`Job ${jobCard.jc_no}`}
                    value=""
                    icon={
                      <img
                        src={fileimg}
                        alt="File Icon"
                        style={{ width: 50, height: 50 }}
                      />
                    }
                  />
                </Link>
              </Box>
            ))}
          </Box>
          
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              zIndex: 2,
              transform: "translateY(-50%)",
              bgcolor: "#fff",
              boxShadow: 2,
              "&:hover": { bgcolor: "#f0f0f0" },
              display: { xs: "none", md: "flex" }
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Grid item xs={12} md={12}>
         <JobCard projectId={Number(projectId)} />

        </Grid>
      </Grid>
    </>
  );
};

export default Datasets;

