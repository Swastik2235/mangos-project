// import { FC } from "react";
// import { Card, CardContent, Typography, Box, List, ListItem } from "@mui/material";

// interface StatCardProps {
//   project: string;
//   jobtitle: string[];
//   icon: React.ReactNode;
// }

// const Collection: FC<StatCardProps> = ({ project, jobtitle, icon }) => {
//   return (
//     <Card
//       sx={{
//         boxShadow: `
//         4px 4px 20px 0px #6F8CB069,
//         -6px -6px 20px 0px #FFFFFF,
//         2px 2px 4px 0px #728EAB1A
//       `,
//         background: "#E7EBF0",
//         '&:hover': {
//                 backgroundColor: '#A7AABB20',
//               },
//               '&:active': {
//                 backgroundColor: '#A7AABB30',
//               },
//         paddingBottom:0 
//       }}

//     >
//       <CardContent sx={{ display:'flex',}}>
//         <Box >{icon}</Box>

//         <Box>
//             <Typography variant="h5" sx={{ textAlign: "left", mb: "1px", mt:'2px',ml:1, fontWeight: 500 }}>
//             <b>{project}</b>
//             </Typography>
//             {/* <Typography
//             variant="h5"
//             color="text.secondary"
//             sx={{ mb:"2px",ml:1, textAlign: "left" }}
//             >
//             {jobtitle}
//             </Typography> */}

//             <List sx={{ pl: 1, textAlign: "left" }}>
//                 {jobtitle.map((title, index) => (
//                 <ListItem
//                     key={index}
//                     sx={{ padding: 0, fontSize: "12px", color: "text.secondary" }}
//                 >
//                     {title}
//                 </ListItem>
//                 ))}
//             </List>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default Collection;


import {FC, useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem } from "@mui/material";

interface StatCardProps {
  project: string;
  jobtitle: string[];
  icon: React.ReactNode;
}

const Collection: FC<StatCardProps> = ({ project, jobtitle, icon }) => {
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = 2; // Number of items to display initially

  const handleToggleShowMore = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <Card
      sx={{
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
        `,
        background: "#E7EBF0",
        "&:hover": {
          backgroundColor: "#A7AABB20",
        },
        "&:active": {
          backgroundColor: "#A7AABB30",
        },
        paddingBottom: 0,
      }}
    >
      <CardContent sx={{ display: "flex" }}>
        <Box>{icon}</Box>
        <Box>
          <Typography
            variant="h5"
            sx={{ textAlign: "left", mb: "1px", mt: "2px", ml: 1, fontWeight: 500 }}
          >
            <b>{project}</b>
          </Typography>
          <List sx={{ pl: 1, textAlign: "left" }}>
            {jobtitle.slice(0, showAll ? jobtitle.length : itemsToShow).map((title, index) => (
              <ListItem
                key={index}
                sx={{ padding: 0, fontSize: "12px", color: "text.secondary" }}
              >
                {title}
              </ListItem>
            ))}
          </List>
          {jobtitle.length > itemsToShow && (
            <Typography
              onClick={handleToggleShowMore}
              sx={{
                mt: 0,
                fontSize: "12px",
                color: "#2564E6",
                textTransform: "none",
                paddingLeft:'4px',
                "&:hover": {
                  backgroundColor: "#A7AABB20",
                },
                cursor:'pointer'
              }}
            >
              {showAll ? "Show Less" : "Show More"}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Collection;
