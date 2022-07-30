import React, { useCallback, useState } from "react";

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
} from "@mui/material";

const CollapseList = (props) => {
  const [isOpen, setIsOpen] = useState([]);
  const { data, isEditing } = props;

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
        {isEditing ? (
          <ListItemIcon>
            <IconButton
              edge="start"
              aria-label="delete"
              onClick={() => console.log("Deleted " + subList.name)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemIcon>
        ) : null}
        <ListItemText primary={subList.name} />
      </ListItem>
    );
  };

  const getListComponent = (list) => {
    const subLists = list.sub;
    return (
      <Box key={list.id}>
        <ListItem disablePadding>
          {isEditing ? (
            <ListItemIcon>
              <IconButton
                edge="start"
                aria-label="delete"
                onClick={() => console.log("Deleted " + list.name)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          ) : null}
          <ListItemButton onClick={clickHandler.bind(null, list.name)}>
            <ListItemText primary={list.name} />
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

  return <List>{data.map(getListComponent)}</List>;
};

export default CollapseList;
