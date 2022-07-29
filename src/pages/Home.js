import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "CoBudget";
  }, []);
  return (
    <Typography
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      align="center"
      variant="h2"
      component="h1"
    >
      CoBudget
    </Typography>
  );
};

export default Home;
