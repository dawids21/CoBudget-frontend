import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";

const UploadReceiptForm = () => {
  const receiptUploadHandler = (event) => {
    if (!event.target.files) {
      return;
    }
    console.log("file uploaded!");
  };
  return (
    <Paper
      sx={{ p: 2, maxWidth: "40rem", textAlign: "center", mx: "auto", mt: 12 }}
      elevation={2}
    >
      <Typography variant="h5" color="primary.dark">
        Upload receipt
      </Typography>
      <BrowserView>
        <Button sx={{ mt: 2 }} variant="contained" component="label">
          Upload file
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={receiptUploadHandler}
          />
        </Button>
      </BrowserView>
      <MobileView>
        <Button sx={{ mt: 2 }} variant="contained" component="label">
          Take a picture
          <input
            type="file"
            accept="image/*"
            hidden
            capture="environment"
            onChange={receiptUploadHandler}
          />
        </Button>
        <Typography variant="h6" color="primary.dark">
          or
        </Typography>
        <Button variant="contained" component="label">
          Upload file
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={receiptUploadHandler}
          />
        </Button>
      </MobileView>
    </Paper>
  );
};

export default UploadReceiptForm;
