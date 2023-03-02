import { Typography } from "@mui/material";
import React from "react";

const UnderDevelopment = (props) => {
  const { sx, variant } = props;
  return (
    <Typography
      sx={{ ...sx }}
      color="primary.dark"
      variant={variant}
      component="h1"
    >
      This page will be ready{" "}
      <Typography color="secondary" variant="h4" component="span">
        soon
      </Typography>
    </Typography>
  );
};

export default UnderDevelopment;
