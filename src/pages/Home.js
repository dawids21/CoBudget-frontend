import { Typography } from "@mui/material";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "CoBudget";
  }, []);
  return (
    <Typography variant="h1" component="h1">
      Home
    </Typography>
  );
};

export default Home;
