import { Box, Button, Typography } from "@mui/material";
import React from "react";

const NotPlannedInfo = (props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Typography color="primary.dark" variant="h4" component="h2">
        {props.monthName} is not planned{" "}
        <Typography color="secondary" variant="h4" component="span">
          yet
        </Typography>
      </Typography>
      <Button sx={{ mt: 2 }} variant="contained" color="primary" size="large">
        Plan
      </Button>
    </Box>
  );
};

export default NotPlannedInfo;
