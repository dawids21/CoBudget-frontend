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
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
      variant="h2"
      component="h1"
    >
      CoBudget
    </Typography>
  );
};

export default Home;
