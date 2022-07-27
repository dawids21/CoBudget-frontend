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

const AddEntryDialog = (props) => {
  const { authState } = useOktaAuth();
  const isFullscreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { open, onClose } = props;
  const [categories, setCategories] = useState([]);
  const [chosenCategoryName, setChosenCategoryName] = useState("");
  const [chosenSubcategoryName, setChosenSubcategoryName] = useState("");
  const alert = useSnackbar();

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
    setChosenCategoryName(event.target.value);
    setChosenSubcategoryName("");
  };

  const changeSubcategoryHandler = (event) => {
    setChosenSubcategoryName(event.target.value);
  };

  const chosenCategory = categories.find(
    (category) => category.name === chosenCategoryName
  );

  const subcategories = chosenCategory ? chosenCategory.subcategories : [];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
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
              autoFocus
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="normal"
              id="date"
              label="Date"
              type="date"
              fullWidth
              value="2022-02-02"
              InputLabelProps={{ shrink: true }}
              variant="standard"
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="Category"
                variant="standard"
                value={chosenCategoryName}
                onChange={changeCategoryHandler}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel id="subcategory">Subcategory</InputLabel>
              <Select
                labelId="subcategory"
                id="subcategory"
                label="subcategory"
                variant="standard"
                value={chosenSubcategoryName}
                onChange={changeSubcategoryHandler}
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
            <Button color="secondary" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Button variant="contained" type="submit" onClick={onClose}>
              Add
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>
  );
};

export default AddEntryDialog;
