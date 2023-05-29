import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { formatCurrency } from "../../util/money-util";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Entry = (props) => {
  const { amount, category } = props;
  return (
    <Paper sx={{ width: "100%", my: 2 }} elevation={6}>
      <Grid2 container alignItems="center">
        <Grid2 xs={6}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: amount > 0 ? "primary.main" : "secondary.main",
            }}
            flexGrow="1"
          >
            {formatCurrency(amount)}
          </Typography>
        </Grid2>
        <Grid2 xs={6}>
          <Typography variant="h6" align="center" flexGrow="1">
            {category}
          </Typography>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default Entry;
