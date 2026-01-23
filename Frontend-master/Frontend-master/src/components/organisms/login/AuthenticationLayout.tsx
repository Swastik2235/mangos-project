import { Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import ContentSlider from "../login/ContentSlider";

interface AuthenticationLayoutProps {
  children: ReactNode;
}

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({ children }) => {
  return (
    <Grid container height="100vh">
      <Grid item md={6} xs={12} order={1}>
        <ContentSlider />
      </Grid>

      <Grid item md={6} xs={12} order={2}>
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Box textAlign="center" maxWidth={550} width="100%" padding={4}>
            {children}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthenticationLayout;
