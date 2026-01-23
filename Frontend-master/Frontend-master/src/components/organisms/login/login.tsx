// import React, { useState, ChangeEvent, FormEvent } from "react";
// import {
//   Button,
//   CircularProgress,
//   Stack,
//   TextField,
//   Typography,
//   Paper,
//   Link as MuiLink,
//   Divider,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";


// const StyledButton = styled(Button)(({ theme }) => ({
//   width: "100%",
//   padding: 12,
//   marginBottom: 16,
//   borderRadius: "8px",
//   fontWeight: 500,
//   border: `1px solid ${theme.palette.divider}`,
//   [theme.breakpoints.down(454)]: {
//     width: "100%",
//     marginBottom: 8,
//   },
// }));

// interface FormData {
//   email: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//  const [formData, setFormData] = useState<FormData>({ email: "test", password: "123" });


//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//     const navigate = useNavigate();
// const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   setLoading(true);

//   // Simulate login delay
//   setTimeout(() => {
//     // ✅ Set auth flag
//     localStorage.setItem("isAuthenticated", "true");
    
//     toast.success("Login successful!");
//     setLoading(false);
//     setFormData({ email: "", password: "" });

//     // ✅ Navigate
//     navigate("/mis-dashboard");
//   }, 1500);
// };





//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

//       <Paper
//         elevation={3}
//         sx={{
//           maxWidth: 400,
//           mx: "auto",
//           mt: 8,
//           p: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h5" fontWeight={600} mb={1}>
//           Sign in to Buro Matrix
//         </Typography>
//         <Typography variant="body2" color="text.secondary" mb={3}>
//           New Here?{" "}
//           <MuiLink href="/register" underline="hover">
//             Create an account
//           </MuiLink>
//         </Typography>

//         <form onSubmit={handleSignIn}>
//           <Stack gap={2}>
//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//             />

//             <Button
//               variant="contained"
//               type="submit"
//               disabled={loading}
//               style={{
//                 backgroundColor: localStorage.getItem("selectedColor") || "#1976d2",
//               }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
//             </Button>
//           </Stack>
//         </form>

//         <Divider sx={{ my: 3 }}>
//           <Typography variant="body2" color="text.secondary" px={1}>
//             OR
//           </Typography>
//         </Divider>

//         <Stack>
//           <StyledButton>
//             Sign in with Google
//           </StyledButton>
//           <StyledButton>
//             Sign in with Facebook
//           </StyledButton>
//           <StyledButton>
//             Sign in with Twitter
//           </StyledButton>
//         </Stack>
//       </Paper>
//     </>
//   );
// };

// export default Login;


import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
  MenuItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AuthenticationLayout from "./AuthenticationLayout";

interface FormData {
  email: string;
  password: string;
  loginAs: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    loginAs: "",
  });

  const navigate = useNavigate();

useEffect(() => {
  const savedEmail = localStorage.getItem("savedEmail") || "";
  const savedPassword = localStorage.getItem("savedPassword") || "";
  setFormData((prev) => ({
    ...prev,
    email: savedEmail,
    password: savedPassword,
  }));
}, []);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/user/login-user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          designation: formData.loginAs,
        }),
      });

      const data = await response.json();

  if (response.ok) {
  localStorage.setItem("isAuthenticated", "true");
  toast.success("Login successful!");

  // Save email & password
  localStorage.setItem("savedEmail", formData.email);
  localStorage.setItem("savedPassword", formData.password);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  setFormData({ email: "", password: "", loginAs: "" });
  navigate("/mis-dashboard");
}
 else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <AuthenticationLayout>
        <Typography variant="h4" fontWeight={600} mb={1}>
          Sign in to Mangos
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          New here?{" "}
          <MuiLink href="/regester" underline="hover" sx={{ fontWeight: 500 }}>
            Create an account
          </MuiLink>
        </Typography>

        <form onSubmit={handleSignIn}>
          <Stack gap={2}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              select
              label="Login As"
              name="loginAs"
              value={formData.loginAs}
              onChange={handleChange}
            >
              <MenuItem value="Plant">Plant</MenuItem>
              <MenuItem value="HO">HO</MenuItem>
              <MenuItem value="Planning">Planning</MenuItem>
            </TextField>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <MuiLink href="/forgetPassword" underline="hover" sx={{ fontSize: "0.85rem" }}>
                Forgot password?
              </MuiLink>
              <MuiLink href="/newPassword" underline="hover" sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Set new password
              </MuiLink>
            </Stack>

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: localStorage.getItem("selectedColor") || "#1976d2",
                "&:hover": {
                  backgroundColor: localStorage.getItem("selectedColor") || "#1565c0",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </Stack>
        </form>
      </AuthenticationLayout>
    </>
  );
};

export default Login;
