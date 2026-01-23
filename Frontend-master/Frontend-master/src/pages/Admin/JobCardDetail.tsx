import { FC } from "react";
import { Grid,Typography} from "@mui/material";
import JobCardSlip from "../../components/features/JobCardSlip";
import Signature from "../../components/features/Signature";
import { Link } from "react-router-dom"; 
import { useParams } from "react-router-dom";



const JobCardDetail: FC = () => {
   const { id } = useParams(); // Get the dynamic ID from URL

   console.log(id)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
      <Typography variant="h4" sx={{ mb: 1 }}>
          <Link       
            to="/datasetsCollection" className="link"
            style={{ textDecoration: "none", color: "inherit" }} 
          >
            Collections
          </Link>
          {"  /  "}
          <Link 
            to="/datasets" className="link" // Assuming this redirects to Project A page
            style={{ textDecoration: "none", color: 'inherit' }} 
          >
           Project A 
          </Link>
          {"  /  "}
          <Link 
            to="/datasets" className="link" // Assuming this redirects to Project A page
            style={{ textDecoration: "none", color: '#2564E6' }} 
          >
            <b>Job Card</b>
          </Link>
        </Typography>
      </Grid>

       {/* Graphs and Calendar */}
       <Grid item xs={12} md={12}>
        <JobCardSlip jobCardId={id} projectId={id} />

      </Grid>
      <Grid item xs={12} md={12}>
        <Signature />
      </Grid>``
    </Grid>
  );
};

export default JobCardDetail;
