import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import useInput from "../../hooks/use-input";
import Grid from "@mui/material/Unstable_Grid2";

const ReceiptDataItem = ({ item, categories, onCategoryChangeHandler }) => {
  const categoryInput = useInput((value) => value);
  const subcategoryInput = useInput((value) => value);

  const subcategories = useMemo(() => {
    const category = categories.find(
      (category) => category.name === categoryInput.value
    );
    return category ? category.subcategories : [];
  }, [categoryInput.value, categories]);

  const changeCategoryHandler = (event) => {
    categoryInput.valueChangeHandler(event);
    onCategoryChangeHandler(event.target.value, "");
    subcategoryInput.reset();
  };
  const changeSubcategoryHandler = (event) => {
    subcategoryInput.valueChangeHandler(event);
    onCategoryChangeHandler(categoryInput.value, event.target.value);
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
            value={categoryInput.value}
            onChange={changeCategoryHandler}
            onBlur={categoryInput.inputBlurHandler}
            error={categoryInput.hasError}
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
            value={subcategoryInput.value}
            onChange={changeSubcategoryHandler}
            onBlur={subcategoryInput.inputBlurHandler}
            error={subcategoryInput.hasError}
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
          {item.total}$
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReceiptDataItem;
