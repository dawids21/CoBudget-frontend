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
    const [isOpen, setIsOpen] = useState([]);
    const { data, isInEditMode } = props;

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
        <ListItemButton key={subList.id} sx={{ pl: 4 }}>
          <ListItemText primary={subList.name} />
        </ListItemButton>
      );
    };

    const getListComponent = (list) => {
      const subLists = list.sub;
      return (
        <Box key={list.id}>
          <ListItemButton onClick={clickHandler.bind(null, list.name)}>
            <ListItemText primary={list.name} />
            {isOpen.includes(list.name) ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={isOpen.includes(list.name)}
            timeout="auto"
            unmountOnExit
          >
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
