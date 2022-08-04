import { InputAdornment, ListItemText, TextField } from "@mui/material";
import React from "react";

const PlanEditListSubcategoryContent = (props) => {
  const { onChange, onBlur, subcategory } = props;
  return (
    <>
      <ListItemText primary={subcategory.name} />
      <TextField
        type="number"
        value={subcategory.amount}
        onChange={onChange}
        onBlur={onBlur}
        sx={{ mr: 1, width: "10ch" }}
        InputProps={{
          endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
      />
    </>
  );
};

export default PlanEditListSubcategoryContent;
