import { InputAdornment, ListItemText, TextField } from "@mui/material";
import React from "react";
import { getCurrencySymbol } from "../../util/money-util";

const PlanEditListSubcategoryContent = (props) => {
  const { onChange, onBlur, subcategory, amount } = props;
  return (
    <>
      <ListItemText primary={subcategory.name} />
      <TextField
        type="number"
        value={amount}
        onChange={onChange}
        onBlur={onBlur}
        sx={{ mr: 1, width: "15ch" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {getCurrencySymbol()}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default PlanEditListSubcategoryContent;
