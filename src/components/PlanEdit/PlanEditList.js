import React, { useReducer, useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Box,
  ListItem,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";

const planReducer = (state, action) => {
  if (action.type === "CHANGE_VALUE") {
    const copyOfState = [...state].map((category) => ({
      ...category,
      subcategories: [...category.subcategories],
    }));
    const category = copyOfState.find(
      (category) => category.id === action.categoryId
    );
    const subcategoryIndex = category.subcategories.findIndex(
      (subcategory) => subcategory.id === action.subcategoryId
    );
    const subcategory = category.subcategories[subcategoryIndex];
    category.subcategories[subcategoryIndex] = {
      ...subcategory,
      amount: action.value,
    };
    return copyOfState;
  }
  return state;
};

const PlanEditList = (props) => {
  const [isOpen, setIsOpen] = useState([]);
  const { categories, plan } = props;
  const { plannedCategories } = plan;
  const [planState, dispatchPlan] = useReducer(
    planReducer,
    categories.map((category) => {
      const plannedCategory = plannedCategories.find(
        (plannedCategory) => category.id === plannedCategory.id
      );

      if (!plannedCategory) {
        const subcategories = category.subcategories.map((subcategory) => ({
          ...subcategory,
          amount: "",
        }));
        return { ...category, subcategories };
      }

      const subcategories = category.subcategories.map((subcategory) => {
        const plannedSubcategory = plannedCategory.plannedSubcategories.find(
          (plannedSubcategory) => subcategory.id === plannedSubcategory.id
        );

        if (!plannedSubcategory) {
          return { ...subcategory, amount: "" };
        }

        return { ...subcategory, amount: `${plannedSubcategory.amount}` };
      });

      return { ...category, subcategories };
    })
  );

  const clickHandler = (name) => {
    setIsOpen((prev) => {
      let newIsOpen;
      if (prev.includes(name)) {
        newIsOpen = prev.filter((item) => item !== name);
      } else {
        newIsOpen = [...prev];
        newIsOpen.push(name);
      }
      return newIsOpen;
    });
  };

  const changeSubcategoryHandler = (categoryId, subcategoryId, event) => {
    dispatchPlan({
      type: "CHANGE_VALUE",
      categoryId,
      subcategoryId,
      value: event.target.value,
    });
  };

  const getListComponent = (category) => {
    const categoryAmount = category.subcategories
      .map((subcategory) => subcategory.amount)
      .reduce((current, value) => current + (value ? parseInt(value) : 0), 0);
    return (
      <Box key={category.id}>
        <ListItem disablePadding>
          <ListItemButton onClick={clickHandler.bind(null, category.name)}>
            <ListItemText primary={category.name} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              {categoryAmount}$
            </Typography>
            {isOpen.includes(category.name) ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </ListItemButton>
        </ListItem>
        <Collapse
          in={isOpen.includes(category.name)}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {category.subcategories.map(
              getSubListComponent.bind(null, category.id)
            )}
          </List>
        </Collapse>
      </Box>
    );
  };

  const getSubListComponent = (categoryId, subcategory) => {
    return (
      <ListItem key={subcategory.id} sx={{ pl: 4 }}>
        <ListItemText primary={subcategory.name} />
        <TextField
          type="number"
          value={subcategory.amount}
          onChange={changeSubcategoryHandler.bind(
            null,
            categoryId,
            subcategory.id
          )}
          sx={{ mr: 1, width: "10ch" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
          }}
        />
      </ListItem>
    );
  };

  return <List>{planState.map(getListComponent)}</List>;
};

export default PlanEditList;
