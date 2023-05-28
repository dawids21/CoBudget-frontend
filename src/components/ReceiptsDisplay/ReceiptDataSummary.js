import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import useInput from "../../hooks/use-input";

const ReceiptDataSummary = ({
  receipt,
  categories,
  onReceiptCategoryChangeHandler,
}) => {
  const categoryInput = useInput((value) => value);
  const subcategoryInput = useInput((value) => value);
  const { date, total } = receipt;
  const formatted = new Date(Date.parse(date)).toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const subcategories = useMemo(() => {
    const category = categories.find(
      (category) => category.name === categoryInput.value
    );
    return category ? category.subcategories : [];
  }, [categoryInput.value, categories]);
  const changeCategoryHandler = (event) => {
    categoryInput.valueChangeHandler(event);
    onReceiptCategoryChangeHandler(event.target.value, "");
    subcategoryInput.reset();
  };
  const changeSubcategoryHandler = (event) => {
    subcategoryInput.valueChangeHandler(event);
    onReceiptCategoryChangeHandler(categoryInput.value, event.target.value);
  };
  return (
    <Stack direction="column" justifyContent="center" spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="primary.dark">
          Date:
        </Typography>
        <Typography variant="h5" color="primary.dark">
          {formatted}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="primary.dark">
          Total:
        </Typography>
        <Typography variant="h5" color="primary.dark">
          {total}$
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="primary.dark" alignSelf="center">
          Category:
        </Typography>
        <FormControl variant="standard" margin="normal" sx={{ minWidth: 200 }}>
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
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="primary.dark" alignSelf="center">
          Subcategory:
        </Typography>
        <FormControl variant="standard" margin="normal" sx={{ minWidth: 200 }}>
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
      </Stack>
    </Stack>
  );
};

export default ReceiptDataSummary;
