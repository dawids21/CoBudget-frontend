import { Box, Button } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ChangeWeek = (props) => {
  const { onPrevious, onNext } = props;
  return (
    <Box sx={{ mb: 2 }}>
      <Button
        sx={{ mr: 1 }}
        color="primary"
        variant="contained"
        onClick={onPrevious}
      >
        <ArrowBackIcon />
      </Button>
      <Button color="primary" variant="contained" onClick={onNext}>
        <ArrowForwardIcon />
      </Button>
    </Box>
  );
};

export default ChangeWeek;
