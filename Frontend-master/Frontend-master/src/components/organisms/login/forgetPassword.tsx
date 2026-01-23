import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppTextField from "../../molecules/forms/AppTextField";
import AuthenticationLayout from "./AuthenticationLayout"; // update your import path if needed
// import ContentSlider from "./ContentSlider";
// import ContentSlider from "./path/to/ContentSlider"; // optional, add if you want right side content

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // You can add validation or API call here if needed
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <AuthenticationLayout >
      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          px: { xs: 2, sm: 4 },
          py: 4,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight={700}>
            Forgot Password?
          </Typography>

          <Typography color="text.secondary" fontWeight={500} mt={1}>
            Enter your email to reset your password.
          </Typography>
        </Box>

        <form>
          <Stack gap={3}>
            <AppTextField fullWidth label="Email" />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </AuthenticationLayout>
  );
};

export default ForgetPassword;
