import { Box, CircularProgress } from "@mui/material";
import { toRelativeUrl } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AppSecureRoute = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      navigate("/login");
    }
  }, [oktaAuth, authState, authState?.isAuthenticated, navigate]);

  if (!authState || !authState?.isAuthenticated) {
    return (
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <CircularProgress></CircularProgress>
      </Box>
    );
  }

  return <Outlet />;
};

export default AppSecureRoute;
