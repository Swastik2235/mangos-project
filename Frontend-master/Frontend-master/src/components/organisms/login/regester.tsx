// import React, { useState } from "react";
// import {
//   Button,
//   Stack,
//   Typography,
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import { NavLink, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AppTextField from "../molecules/forms/AppTextField";

// const Register: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [mobileNo, setMobileNo] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const navigate = useNavigate();

//   // const handleFormSubmit = async (): Promise<void> => {
//   //   if (!email.trim() || !name.trim() || !mobileNo.trim()) {
//   //     toast.error("Please fill in all fields.");
//   //     return;
//   //   }
//   //   setLoading(true);

//   //   // Dummy static simulation
//   //   setTimeout(() => {
//   //     toast.success("Registered successfully!");
//   //     setLoading(false);

//   //     // Redirect to /mis-dashboard
//   //     navigate("/mis-dashboard");
//   //   }, 1500);
//   // };

//   const handleFormSubmit = async (): Promise<void> => {
//   if (!email.trim() || !name.trim() || !mobileNo.trim()) {
//     toast.error("Please fill in all fields.");
//     return;
//   }
//   setLoading(true);

//   try {
//     const response = await fetch("http://43.204.203.153:8000/user/register-user/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user_name: name,
//         email: email,
//         phone_number: mobileNo,
//       }),
//     });

//     if (!response.ok) {
//       // Optionally parse error details from response
//       const errorData = await response.json();
//       toast.error(errorData.message || "Registration failed");
//       setLoading(false);
//       return;
//     }

//     toast.success("Registered successfully!");
//     setLoading(false);

//     // Redirect to /mis-dashboard
//     navigate("/mis-dashboard");
//   } catch (error) {
//     console.error("Registration error:", error);
//     toast.error("Something went wrong. Please try again.");
//     setLoading(false);
//   }
// };

//   return (
//     <div style={{ maxWidth: 500, margin: "10px auto" }}>
//       <Paper
//         elevation={3}
//         sx={{
//           p: 5,
//           borderRadius: 4,
//           backgroundColor: "#fff",
//         }}
//       >
//         <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
//           Sign Up to Mangos
//         </Typography>

//         <Typography
//           variant="body2"
//           color="text.secondary"
//           textAlign="center"
//           mb={3}
//         >
//           Have an account?{" "}
//           <NavLink to="/login" style={{ fontWeight: 600 }}>
//             Login
//           </NavLink>
//         </Typography>

//         <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

//         <form>
//           <Stack gap={3}>
//             <AppTextField
//               fullWidth
//               label="Email"
//               value={email}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//             />

//             <AppTextField
//               fullWidth
//               label="Name"
//               value={name}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
//             />

//             <AppTextField
//               fullWidth
//               label="Mobile Number"
//               value={mobileNo}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobileNo(e.target.value)}
//             />

//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleFormSubmit}
//               disabled={loading}
//               size="large"
//               sx={{ mt: 1 }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
//             </Button>

//             <Typography
//               variant="caption"
//               color="text.secondary"
//               textAlign="center"
//               mt={1}
//             >
//               By signing up, I agree to UI Lib{" "}
//               <NavLink to="#" style={{ fontWeight: 600 }}>
//                 Terms of Service & Privacy Policy
//               </NavLink>
//             </Typography>
//           </Stack>
//         </form>
//       </Paper>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import {
  Button,
  Stack,
  Typography,
  CircularProgress,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppTextField from "../../molecules/forms/AppTextField";
import AuthenticationLayout from "./AuthenticationLayout"; // ✅ Make sure path is correct

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFormSubmit = async (): Promise<void> => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !mobileNo.trim() ||
      !designation.trim() ||
      !password.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://43.204.203.153:8000/user/register-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: mobileNo,
          designation: designation,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("Registered successfully!");
      setLoading(false);
      navigate("/mis-dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AuthenticationLayout>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <Box
        sx={{
          width: "100%",
          maxWidth: 550,
          px: { xs: 2, sm: 4 },
          pt: 2,
          mx: "auto",
        }}
      >
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          Sign Up to Mangos
        </Typography>

        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Have an account?{" "}
          <NavLink to="/login" style={{ fontWeight: 600 }}>
            Login
          </NavLink>
        </Typography>

        <form>
          <Stack gap={3}>
            <AppTextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            />

            <AppTextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            />

            <AppTextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <AppTextField
              fullWidth
              label="Mobile Number"
              value={mobileNo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobileNo(e.target.value)}
            />

            <TextField
              fullWidth
              select
              label="Designation"
              value={designation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesignation(e.target.value)}
            >
              <MenuItem value="Plant">Plant</MenuItem>
              <MenuItem value="HO">HO</MenuItem>
              <MenuItem value="Planning">Planning</MenuItem>
            </TextField>

            <AppTextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleFormSubmit}
              disabled={loading}
              size="large"
              sx={{ mt: 1 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>

            <Typography variant="caption" color="text.secondary" textAlign="center" mt={1}>
              By signing up, I agree to UI Lib{" "}
              <NavLink to="#" style={{ fontWeight: 600 }}>
                Terms of Service & Privacy Policy
              </NavLink>
            </Typography>
          </Stack>
        </form>
      </Box>
    </AuthenticationLayout>
  );
};

export default Register;
