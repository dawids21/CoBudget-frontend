import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import useInput from "../../hooks/use-input";
import { formatCurrency } from "../../util/money-util";

const ReceiptDataSummary = ({
  total,
  categories,
  date,
  onReceiptCategoryChangeHandler,
  onDateChangeHandler,
  isMobile,
}) => {
  const categoryInput = useInput((value) => value);
  const subcategoryInput = useInput((value) => value);
  const dateInput = useInput(
    (value) => value,
    date.toISOString().split("T")[0]
  );
  const subcategories = useMemo(() => {
    const category = categories.find(
      (category) => category.name === categoryInput.value
    );
    return category ? category.subcategories : [];
  }, [categoryInput.value, categories]);
  const changeCategoryHandler = (event) => {
    categoryInput.valueChangeHandler(event);
    onReceiptCategoryChangeHandler(event.target.value, "", null);
    subcategoryInput.reset();
  };
  const changeSubcategoryHandler = (event) => {
    subcategoryInput.valueChangeHandler(event);
    const category = categories.find(
      (category) => category.name === categoryInput.value
    );
    const subcategory = category.subcategories.find(
      (subcategory) => subcategory.name === event.target.value
    );
    onReceiptCategoryChangeHandler(
      categoryInput.value,
      subcategory.name,
      subcategory.id
    );
  };
  const changeDateHandler = (event) => {
    const newDate = new Date(event.target.value);
    dateInput.valueChangeHandler(event);
    onDateChangeHandler(newDate);
  };
  return (
    <Stack direction="column" justifyContent="center" spacing={2}>
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems={isMobile ? "flex-start" : "center"}
        justifyContent="space-between"
      >
        <Typography variant="h5" color="primary.dark">
          Date:
        </Typography>
        <TextField
          margin="normal"
          id="date"
          label="Date"
          type="date"
          fullWidth={isMobile}
          value={dateInput.value}
          onChange={changeDateHandler}
          onBlur={dateInput.inputBlurHandler}
          error={dateInput.hasError}
          InputLabelProps={{ shrink: true }}
          variant="standard"
          sx={{ minWidth: { sm: 200 } }}
        />
      </Stack>
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems={isMobile ? "flex-start" : "center"}
        justifyContent="space-between"
      >
        <Typography variant="h5" color="primary.dark">
          Category:
        </Typography>
        <FormControl
          variant="standard"
          margin="normal"
          fullWidth={isMobile}
          sx={{ minWidth: { sm: 200 } }}
        >
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
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems={isMobile ? "flex-start" : "center"}
        justifyContent="space-between"
      >
        <Typography variant="h5" color="primary.dark">
          Subcategory:
        </Typography>
        <FormControl
          variant="standard"
          margin="normal"
          fullWidth={isMobile}
          sx={{ minWidth: { sm: 200 } }}
        >
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
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="primary.dark">
          Total:
        </Typography>
        <Typography variant="h5" color="primary.dark">
          {formatCurrency(total)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ReceiptDataSummary;
