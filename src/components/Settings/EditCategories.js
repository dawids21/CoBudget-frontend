import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import useSnackbar from "../../hooks/use-snackbar";
import ApiClient from "../../util/api-client";

const EditCategories = (props) => {
  const categoryInput = useInput((value) => value.length > 0);
  const categoryForSubcategoryInput = useInput((value) => value.length > 0);
  const subcategoryInput = useInput((value) => value.length > 0);
  const { authState } = useOktaAuth();
  const alert = useSnackbar();

  const { accessToken } = authState.accessToken;
  const {
    categories,
    onAddCategory,
    onAddSubcategory,
    isEditing,
    onStartEditing,
    onStopEditing,
  } = props;

  const editHandler = () => {
    onStartEditing(true);
  };

  const finishHandler = () => {
    onStopEditing(false);
    categoryInput.reset();
    categoryForSubcategoryInput.reset();
    subcategoryInput.reset();
  };

  const addCategoryHandler = async () => {
    if (!categoryInput.isValid) {
      return;
    }
    const category = {
      name: categoryInput.value,
      parentId: null,
    };
    const apiClient = new ApiClient(accessToken);
    try {
      const addedCategory = await apiClient.addCategory(category);
      categoryInput.reset();
      onAddCategory(addedCategory);
    } catch (e) {
      alert(e, "error");
    }
  };

  const addCategoryForm = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        autoComplete="off"
        margin="normal"
        id="category"
        label="Category"
        type="text"
        fullWidth
        variant="standard"
        value={categoryInput.value}
        onChange={categoryInput.valueChangeHandler}
        onBlur={categoryInput.inputBlurHandler}
        error={categoryInput.hasError}
      />
      <Button
        disabled={!categoryInput.isValid}
        sx={{ alignSelf: "flex-end" }}
        variant="outlined"
        onClick={addCategoryHandler}
      >
        Add category
      </Button>
    </Box>
  );

  const changeCategoryHandler = (event) => {
    categoryForSubcategoryInput.valueChangeHandler(event);
    subcategoryInput.reset();
  };

  const subcategoryFromIsValid =
    categoryForSubcategoryInput.isValid && subcategoryInput.isValid;

  const addSubcategoryHandler = async () => {
    if (!subcategoryFromIsValid) {
      return;
    }
    const chosenCategory = categories.find(
      (category) => category.name === categoryForSubcategoryInput.value
    );
    if (!chosenCategory) {
      alert("Unknown category", "error");
      return;
    }
    const subcategory = {
      name: subcategoryInput.value,
      parentId: chosenCategory.id,
    };
    const apiClient = new ApiClient(accessToken);
    try {
      const addedSubcategory = await apiClient.addCategory(subcategory);
      categoryForSubcategoryInput.reset();
      subcategoryInput.reset();
      onAddSubcategory(addedSubcategory);
    } catch (e) {
      alert(e, "error");
    }
  };

  const addSubcategoryForm = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
      }}
    >
      <FormControl variant="standard" margin="normal" fullWidth>
        <InputLabel id="categoryForSubcategory">Category</InputLabel>
        <Select
          labelId="categoryForSubcategory"
          id="categoryForSubcategory"
          label="Category"
          value={categoryForSubcategoryInput.value}
          onChange={changeCategoryHandler}
          onBlur={categoryForSubcategoryInput.inputBlurHandler}
          error={categoryForSubcategoryInput.hasError}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        autoComplete="off"
        margin="normal"
        id="subcategory"
        label="Subcategory"
        type="text"
        fullWidth
        variant="standard"
        value={subcategoryInput.value}
        onChange={subcategoryInput.valueChangeHandler}
        onBlur={subcategoryInput.inputBlurHandler}
        error={subcategoryInput.hasError}
      />
      <Button
        disabled={!subcategoryFromIsValid}
        sx={{ alignSelf: "flex-end" }}
        variant="outlined"
        onClick={addSubcategoryHandler}
      >
        Add subcategory
      </Button>
    </Box>
  );
  return (
    <>
      {isEditing ? addCategoryForm : null}
      {isEditing ? addSubcategoryForm : null}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
        }}
      >
        {isEditing ? (
          <Button disableRipple variant="contained" onClick={finishHandler}>
            Finish
          </Button>
        ) : (
          <Button disableRipple variant="outlined" onClick={editHandler}>
            Edit
          </Button>
        )}
      </Box>
    </>
  );
};

export default EditCategories;
