import { Typography } from "@mui/material";
import React from "react";

const Logo = (props) => {
  const { sx, variant } = props;
  return (
    <Typography
      sx={{ ...sx, fontFamily: "'Courgette', cursive" }}
      variant={variant}
      component="h1"
    >
      CoBudget
    </Typography>
  );
};

export default Logo;
