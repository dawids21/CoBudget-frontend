import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Entry = (props) => {
  const { amount, category } = props;
  return (
    <Paper sx={{ width: "100%", my: 2 }} elevation={6}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: amount > 0 ? "primary.main" : "secondary.main",
          }}
        >
          {amount}$
        </Typography>
        <Typography variant="h6" align="center">
          {category}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Entry;
