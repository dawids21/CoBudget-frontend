import { Box, Typography } from "@mui/material";
import React from "react";

const MonthAndYear = (props) => {
  const { date } = props;

  const formatted = date.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });
  return (
    <Box>
      <Typography
        variant="h5"
        color="primary.dark"
        align="center"
        sx={{ mb: 2 }}
      >
        {formatted}
      </Typography>
    </Box>
  );
};

export default MonthAndYear;
