import React, { useState } from "react";

import { Collapse, List, Box, ListItem } from "@mui/material";

const CollapseList = (props) => {
  const [isOpen, setIsOpen] = useState([]);
  const { data, listComponent, subListComponent } = props;

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

  const getListComponent = (list) => {
    const subLists = list.sub;
    return (
      <Box key={list.id}>
        <ListItem disablePadding>
          {listComponent(
            list,
            clickHandler.bind(null, list.name),
            isOpen.includes(list.name)
          )}
        </ListItem>
        <Collapse in={isOpen.includes(list.name)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subLists.map(getSubListComponent)}
          </List>
        </Collapse>
      </Box>
    );
  };

  const getSubListComponent = (subList) => {
    return (
      <ListItem key={subList.id} sx={{ pl: 4 }}>
        {subListComponent(subList)}
      </ListItem>
    );
  };

  return <List>{data.map(getListComponent)}</List>;
};

export default CollapseList;
