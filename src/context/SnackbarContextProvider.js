import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import React, { useState } from "react";
import SnackbarContext from "./snackbar-context";
import CloseIcon from "@mui/icons-material/Close";

const SnackbarContextProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleAlert = (alertMessage, severity) => {
    setMessage(alertMessage);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <SnackbarContext.Provider
      value={{
        alert: handleAlert,
      }}
    >
      {props.children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        // message={message}
        // action={action}
      >
        <Alert
          severity={severity}
          onClose={handleClose}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
