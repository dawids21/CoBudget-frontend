import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const CategoryContent = (props) => {
  const { isEditing, onDelete, category, onClick, isOpen } = props;
  return (
    <>
      {isEditing ? (
        <ListItemIcon>
          <IconButton
            edge="start"
            aria-label="delete"
            onClick={() => onDelete(category)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemIcon>
      ) : null}
      <ListItemButton onClick={onClick}>
        <ListItemText primary={category.name} />
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
    </>
  );
};

export default CategoryContent;
