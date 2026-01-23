// import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

// import Edit from "../../assets/edit.png";

// const Signature = () => {
 
//   return (
//     <>
//       <Card
//         sx={{
//           boxShadow: `
//             4px 4px 20px 0px #6F8CB069,
//             -6px -6px 20px 0px #FFFFFF,
//             2px 2px 4px 0px #728EAB1A
//           `,
//           background: "#E7EBF0",
//         }}
//       >
//         <CardContent>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               mb: 3,
//             }}
//           >
//             <Typography variant="h6">
//               Signatures
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
             
//               <Grid item>
//                 <Box
//                   sx={{
//                     width: 66,
//                     height: 32,
//                     backgroundColor: "#E7EBF0",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//     `,
//                     borderRadius: "8px",
//                     padding: "1.5px",
//                     textAlign: "center",
//                     gap: "8px", // Add space between icon and text
//                   }}
//                 >
//                     <img
//                     src={Edit} // Replace with your upload icon
//                     alt="Upload Document"
//                     style={{
//                       width: "20px",
//                       height: "20px",
//                       cursor: "pointer",
//                     }}
//                   />
//                   <span
//                     style={{
//                       fontSize: "14px",
//                       color: "#000",
//                       fontWeight: 500,
//                       cursor: "pointer",
//                     }}
//                   >
//                     Edit
//                   </span>
                  
//                 </Box>
//               </Grid>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default Signature;



import React, { useState } from "react";
import { Card, CardContent, Typography, Box, TextField, Button } from "@mui/material";
import Edit from "../../assets/edit.png";

const Signature: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [keys, setKeys] = useState<string[]>([
    "Fabrication",
    "Raw Yard",
    "Planning",
    "Plant Head",
    "Received By",
  ]);
  const [newKey, setNewKey] = useState<string>("");

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleAddKey = () => {
    if (newKey.trim()) {
      setKeys([...keys, newKey.trim()]);
      setNewKey("");
    } else {
      alert("Please enter a valid key.");
    }
  };

  const handleKeyChange = (index: number, value: string) => {
    const updatedKeys = [...keys];
    updatedKeys[index] = value;
    setKeys(updatedKeys);
  };

  const handleSave = () => {
    setIsEditing(false); // Exit edit mode
    setNewKey(""); // Clear the input field
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
            <Typography variant="h3">Signatures</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 66,
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
                  gap: "8px",
                }}
                onClick={toggleEdit}
              >
                <img
                  src={Edit}
                  alt="Edit Icon"
                  style={{
                    width: "15px",
                    height: "15px",
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </span>
              </Box>
            </Box>
          </Box>

          {/* Keys displayed in a grid layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // 3 keys per row
              gap: 2, // Spacing between items
            }}
          >
            {keys.map((key, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {isEditing ? (
                  <TextField
                    value={key}
                    onChange={(e) => handleKeyChange(index, e.target.value)}
                    size="small"
                  />
                ) : (
                  key.trim() ? (
                    <Typography 
                    sx={{ color: "#505576", fontWeight: 500 ,fontSize:'14px' }}>
                      • {key}
                    </Typography>
                  ) : (
                    <Typography 
                    sx={{ color: "#505576", fontWeight: 500 ,fontSize:'14px' }}>
                      {key}
                    </Typography>
                  )
                )}
              </Box>
            ))}
          </Box>

          {isEditing && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              {/* Input field to add a new key */}
              <TextField
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="Add new key"
                size="small"
              />
              {/* Add Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddKey}
                disabled={!newKey.trim()}
              >
                Add
              </Button>
              {/* Save Button */}
              <Button
                variant="contained"
                color="success"
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Signature;





