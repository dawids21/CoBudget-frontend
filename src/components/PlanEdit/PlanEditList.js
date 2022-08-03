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
        return { ...category, amount: 0, subcategories };
      }

      let categoryAmount = 0;

      const subcategories = category.subcategories.map((subcategory) => {
        const plannedSubcategory = plannedCategory.plannedSubcategories.find(
          (plannedSubcategory) => subcategory.id === plannedSubcategory.id
        );

        if (!plannedSubcategory) {
          return { ...subcategory, amount: "" };
        }

        categoryAmount += plannedSubcategory.amount;

        return { ...subcategory, amount: `${plannedSubcategory.amount}` };
      });

      return { ...category, amount: categoryAmount, subcategories };
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

  const getSubListComponent = (subcategory) => {
    return (
      <ListItem key={subcategory.id} sx={{ pl: 4 }}>
        <ListItemText primary={subcategory.name} />
        <TextField
          value={subcategory.amount}
          sx={{ mr: 1, width: "10ch" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
          }}
        />
      </ListItem>
    );
  };

  const getListComponent = (category) => {
    return (
      <Box key={category.id}>
        <ListItem disablePadding>
          <ListItemButton onClick={clickHandler.bind(null, category.name)}>
            <ListItemText primary={category.name} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              {category.amount}$
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
            {category.subcategories.map(getSubListComponent)}
          </List>
        </Collapse>
      </Box>
    );
  };

  return <List>{planState.map(getListComponent)}</List>;
};

export default PlanEditList;
