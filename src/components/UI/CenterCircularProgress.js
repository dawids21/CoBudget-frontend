import { CircularProgress } from "@mui/material";
import React from "react";

const Logo = (props) => {
  const { sx } = props;
  return (
    <CircularProgress
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        ...sx,
      }}
    />
  );
};

export default Logo;
