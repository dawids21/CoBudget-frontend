import { ListItemText, Typography } from "@mui/material";
import React from "react";

const PlanInfoSubcategoryContent = (props) => {
  const { subcategory } = props;
  return (
    <>
      <ListItemText primary={subcategory.name} />
      <Typography variant="h6" sx={{ mr: 1 }}>
        {subcategory.amount}$
      </Typography>
    </>
  );
};

export default PlanInfoSubcategoryContent;
