import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { formatCurrency } from "../../util/money-util";

const ReceiptDataItem = ({ item, categories, onCategoryChangeHandler }) => {
  const subcategories = useMemo(() => {
    const category = categories.find(
      (category) => category.name === item.category
    );
    return category ? category.subcategories : [];
  }, [item.category, categories]);

  const changeCategoryHandler = (event) => {
    onCategoryChangeHandler(event.target.value, "");
  };
  const changeSubcategoryHandler = (event) => {
    const subcategory = subcategories.find(
      (subcategory) => subcategory.name === event.target.value
    );
    onCategoryChangeHandler(item.category, subcategory.name, subcategory.id);
  };
  return (
    <Grid container columnSpacing={2} alignItems="center">
      <Grid xs={4}>
        <Typography variant="h6" color="primary.dark">
          {item.description}
        </Typography>
      </Grid>
      <Grid xs={3}>
        <FormControl variant="standard" margin="normal" fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            label="Category"
            value={item.category}
            onChange={changeCategoryHandler}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={3}>
        <FormControl variant="standard" margin="normal" fullWidth>
          <InputLabel id="subcategory">Subcategory</InputLabel>
          <Select
            labelId="subcategory"
            id="subcategory"
            label="Subcategory"
            value={item.subcategory}
            onChange={changeSubcategoryHandler}
          >
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={2}>
        <Typography variant="h6" color="primary.dark" sx={{ px: 4 }}>
          {formatCurrency(item.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReceiptDataItem;
