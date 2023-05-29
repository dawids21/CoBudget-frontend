import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { formatCurrency } from "../../util/money-util";

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
          {formatCurrency(amount)}
        </Typography>
        <Typography variant="h6" align="center">
          {category}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Entry;
