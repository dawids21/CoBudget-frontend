import { IconButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const SubcategoryContent = (props) => {
  const { isEditing, onDelete, subcategory } = props;

  return (
    <>
      {isEditing ? (
        <ListItemIcon>
          <IconButton
            edge="start"
            aria-label="delete"
            onClick={() => onDelete(subcategory)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemIcon>
      ) : null}
      <ListItemText primary={subcategory.name} />
    </>
  );
};

export default SubcategoryContent;
