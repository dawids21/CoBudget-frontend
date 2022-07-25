import styled from "@emotion/styled";
import {
  AppBar as MUIAppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Drawer from "./Drawer";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const AppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDrawerButtonVisible = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  );
  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  let buttons;
  if (!authState?.isAuthenticated) {
    buttons = [
      {
        name: "Login",
        action: () => oktaAuth.signInWithRedirect(),
      },
    ];
  } else {
    buttons = [
      {
        name: "Home",
        action: () => navigate("/"),
      },
      {
        name: "Calendar",
        action: () => navigate("/calendar"),
      },
      {
        name: "Logout",
        action: () => oktaAuth.signOut(),
      },
    ];
  }

  return (
    <>
      <MUIAppBar position="fixed" component="nav">
        <Toolbar>
          {isDrawerButtonVisible && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            CoBudget
          </Typography>
          {!isDrawerButtonVisible && (
            <Box>
              {buttons.map((button) => (
                <Button key={button.name} onClick={button.action} color="white">
                  {button.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </MUIAppBar>
      <Box component="nav">
        <Drawer open={drawerOpen} toggle={handleDrawerToggle} items={buttons} />
      </Box>
      <Offset />
    </>
  );
};

export default AppBar;
