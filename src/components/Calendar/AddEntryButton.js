import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

const AddEntryButton = (props) => {
  const style = {
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };
  return (
    <Fab color="primary" aria-label="add" sx={style} onClick={props.onClick}>
      <AddIcon />
    </Fab>
  );
};

export default AddEntryButton;
