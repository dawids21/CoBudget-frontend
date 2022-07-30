import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import useSnackbar from "../../hooks/use-snackbar";
import ApiClient from "../../util/api-client";
import useInput from "../../hooks/use-input";

const AddEntryDialog = (props) => {
  const { authState } = useOktaAuth();
  const isFullscreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [categories, setCategories] = useState([]);
  const alert = useSnackbar();
  const typeInput = useInput(
    (value) => (value && value === "expense") || value === "income",
    "expense"
  );
  const amountInput = useInput((value) => value && value >= 0);
  const dateInput = useInput(
    (value) => value,
    new Date().toISOString().split("T")[0]
  );
  const categoryInput = useInput((value) => value);
  const subcategoryInput = useInput((value) => value);

  const { open, onClose, onAdd } = props;
  const { accessToken } = authState.accessToken;

  useEffect(() => {
    const apiClient = new ApiClient(accessToken);
    apiClient
      .getCategories()
      .then((fetchedCategories) => {
        console.log(fetchedCategories);
        setCategories(fetchedCategories);
      })
      .catch((error) => alert(error.message, "error"));
  }, [accessToken]);

  const changeCategoryHandler = (event) => {
    categoryInput.valueChangeHandler(event);
    subcategoryInput.reset();
  };

  const chosenCategory = categories.find(
    (category) => category.name === categoryInput.value
  );

  const subcategories = chosenCategory ? chosenCategory.subcategories : [];

  const resetInputs = () => {
    typeInput.reset();
    amountInput.reset();
    dateInput.reset();
    categoryInput.reset();
    subcategoryInput.reset();
  };

  const cancelHandler = () => {
    resetInputs();
    onClose();
  };

  const isInputValid =
    typeInput.isValid &&
    amountInput.isValid &&
    dateInput.isValid &&
    categoryInput.isValid &&
    subcategoryInput.isValid;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isInputValid) {
      return;
    }
    try {
      const apiClient = new ApiClient(accessToken);
      const subcategory = subcategories.find(
        (subcategory) => subcategory.name === subcategoryInput.value
      );
      const entry = {
        amount:
          typeInput.value === "expense"
            ? -Math.abs(amountInput.value)
            : Math.abs(amountInput.value),
        date: dateInput.value,
        categoryId: subcategory.id,
      };
      await apiClient.addEntry(entry);
      alert("Added entry", "success");
    } catch (e) {
      alert(e.message, "error");
    }
    resetInputs();
    onAdd();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isFullscreen}>
      <Card elevation={isFullscreen ? 0 : 2}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography variant="h5" color="primary.dark">
              Add entry
            </Typography>
            <FormControl margin="normal" sx={{ mb: 0 }}>
              <FormLabel id="type" color="black">
                Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="type"
                defaultValue="expense"
                name="type"
                value={typeInput.value}
                onChange={typeInput.valueChangeHandler}
                onBlur={typeInput.inputBlurHandler}
              >
                <FormControlLabel
                  value="expense"
                  control={<Radio color="secondary" />}
                  label="Expense"
                />
                <FormControlLabel
                  value="income"
                  control={<Radio color="primary" />}
                  label="Income"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              value={amountInput.value}
              onChange={amountInput.valueChangeHandler}
              onBlur={amountInput.inputBlurHandler}
              error={amountInput.hasError}
            />
            <TextField
              margin="normal"
              id="date"
              label="Date"
              type="date"
              fullWidth
              value={dateInput.value}
              onChange={dateInput.valueChangeHandler}
              onBlur={dateInput.inputBlurHandler}
              error={dateInput.hasError}
              InputLabelProps={{ shrink: true }}
              variant="standard"
            />
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
            <FormControl variant="standard" margin="normal" fullWidth>
              <InputLabel id="subcategory">Subcategory</InputLabel>
              <Select
                labelId="subcategory"
                id="subcategory"
                label="subcategory"
                value={subcategoryInput.value}
                onChange={subcategoryInput.valueChangeHandler}
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
          </CardContent>
          <CardActions sx={{ display: "flex" }}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Button
              disabled={!isInputValid}
              variant="contained"
              type="submit"
              onClick={onClose}
            >
              Add
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>
  );
};

export default AddEntryDialog;
