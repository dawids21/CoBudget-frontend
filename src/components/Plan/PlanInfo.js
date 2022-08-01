import React, { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  Typography,
  Card,
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

  const getSubListComponent = (subList) => {
    return (
      <ListItem key={subList.id} sx={{ pl: 4 }}>
        <ListItemText primary={subList.name} />
        <Typography variant="h6" sx={{ mr: 1 }}>
          {subList.amount}$
        </Typography>
      </ListItem>
    );
  };

  const getListComponent = (list) => {
    const subLists = list.sub;
    return (
      <Box key={list.id}>
        <ListItem disablePadding>
          <ListItemButton onClick={clickHandler.bind(null, list.name)}>
            <ListItemText primary={list.name} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              {list.amount}$
            </Typography>
            {isOpen.includes(list.name) ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </ListItemButton>
        </ListItem>
        <Collapse in={isOpen.includes(list.name)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subLists.map(getSubListComponent)}
          </List>
        </Collapse>
      </Box>
    );
  };

  return (
    <Paper elevation={3}>
      <List>{plan.map(getListComponent)}</List>
    </Paper>
  );
};

export default PlanInfo;
