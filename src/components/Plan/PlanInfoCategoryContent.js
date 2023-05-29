import { ListItemButton, ListItemText, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { formatCurrency } from "../../util/money-util";

const PlanInfoCategoryContent = (props) => {
  const { category, onClick, isOpen } = props;
  const subcategories = category.plannedSubcategories;
  const categoryAmount = subcategories
    .map((subcategory) => subcategory.amount)
    .reduce((current, value) => current + value, 0);
  return (
    <ListItemButton onClick={onClick}>
      <ListItemText primary={category.name} />
      <Typography variant="h6" sx={{ mr: 1 }}>
        {formatCurrency(categoryAmount)}
      </Typography>
      {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ListItemButton>
  );
};

export default PlanInfoCategoryContent;
