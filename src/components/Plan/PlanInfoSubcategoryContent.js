import { ListItemText, Typography } from "@mui/material";
import React from "react";
import { formatCurrency } from "../../util/money-util";

const PlanInfoSubcategoryContent = (props) => {
  const { subcategory } = props;
  return (
    <>
      <ListItemText primary={subcategory.name} />
      <Typography variant="h6" sx={{ mr: 1 }}>
        {formatCurrency(subcategory.amount)}
      </Typography>
    </>
  );
};

export default PlanInfoSubcategoryContent;
