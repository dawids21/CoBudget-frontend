import React, { useState } from "react";

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
  Paper,
} from "@mui/material";
const PlanInfo = (props) => {
  const [isOpen, setIsOpen] = useState([]);
  const { plan } = props;

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
        <Typography variant="h6" sx={{ mr: 1 }}>
          {subcategory.amount}$
        </Typography>
      </ListItem>
    );
  };

  const getListComponent = (category) => {
    const subcategories = category.plannedSubcategories;
    const categoryAmount = subcategories
      .map((subcategory) => subcategory.amount)
      .reduce((current, value) => current + value, 0);
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
            {subcategories.map(getSubListComponent)}
          </List>
        </Collapse>
      </Box>
    );
  };

  return (
    <Paper elevation={3}>
      {plan.length !== 0 ? (
        <List>{plan.map(getListComponent)}</List>
      ) : (
        <Typography sx={{ py: 2 }} variant="h3" component="h3">
          Plan is empty
        </Typography>
      )}
    </Paper>
  );
};

export default PlanInfo;
