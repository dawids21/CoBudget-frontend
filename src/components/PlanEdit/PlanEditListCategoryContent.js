import { ListItemButton, ListItemText, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const PlanEditListCategoryContent = (props) => {
  const { category, onClick, isOpen } = props;
  const categoryAmount = category.sub
    .map((subcategory) => subcategory.amount)
    .reduce((current, value) => current + (value ? parseInt(value) : 0), 0);
  return (
    <ListItemButton onClick={onClick}>
      <ListItemText primary={category.name} />
      <Typography variant="h6" sx={{ mr: 1 }}>
        {categoryAmount}$
      </Typography>
      {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ListItemButton>
  );
};

export default PlanEditListCategoryContent;
