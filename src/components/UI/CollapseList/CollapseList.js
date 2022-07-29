import React, { useCallback, useState } from "react";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

const CollapseList = (props) => {
  const { data } = props;
  const initialState = {};
  for (const list in data) {
    initialState[list.name] = false;
  }
  const [isOpen, setIsOpen] = useState(initialState);

  const clickHandler = (name) => {
    setIsOpen((prev) => {
      const newState = { ...prev };
      newState[name] = !newState[name];
      console.log(newState);
      return newState;
    });
  };

  const getSubListComponent = useCallback((subList) => {
    return (
      <ListItemButton key={subList.id} sx={{ pl: 4 }}>
        <ListItemText primary={subList.name} />
      </ListItemButton>
    );
  }, []);

  const getListComponent = useCallback((list) => {
    const subLists = list.sub;
    return (
      <Box key={list.id}>
        <ListItemButton onClick={clickHandler.bind(null, list.name)}>
          <ListItemText primary={list.name} />
          {isOpen[list.name] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpen[list.name]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subLists.map(getSubListComponent)}
          </List>
        </Collapse>
      </Box>
    );
  }, []);

  return <List>{data.map(getListComponent)}</List>;
};

export default CollapseList;
