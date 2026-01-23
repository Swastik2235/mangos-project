import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Checkbox,
  Typography,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import AppTextField from "../../molecules/forms/AppTextField";
import AuthenticationLayout from "./AuthenticationLayout"; // ✅ make sure path is correct

const NewPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("http://43.204.203.153:8000/user/set-new-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password has been successfully set.");
      } else {
        setError(data?.detail || "Failed to set new password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticationLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: 550,
          px: { xs: 2, sm: 4 },
          pt: 2,
          mx: "auto",
        }}
      >
        <Typography variant="h4" fontWeight={700} mt={2}>
          Setup New Password
        </Typography>
        <Typography color="text.secondary" fontWeight={500}>
          Already reset your password? <Link to="/login">Sign In</Link>
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack gap={3} mt={5}>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <AppTextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AppTextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Box display="flex" alignItems="center" gap={1}>
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <Typography variant="body2" fontSize={12}>
                I agree to the <MuiLink href="#">terms and conditions</MuiLink>
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading || !agree}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </form>
      </Box>
    </AuthenticationLayout>
  );
};

export default NewPassword;
