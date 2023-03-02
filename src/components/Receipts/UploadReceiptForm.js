import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import ApiClient from "../../util/api-client";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../../hooks/use-snackbar";

const UploadReceiptForm = () => {
  const { authState } = useOktaAuth();
  const { accessToken } = authState.accessToken;
  const navigate = useNavigate();
  const alert = useSnackbar();
  const receiptUploadHandler = async (event) => {
    if (!event.target.files) {
      return;
    }
    const apiClient = new ApiClient(accessToken);
    try {
      await apiClient.uploadReceipt(event.target.files[0]);
    } catch (e) {
      alert(e.message, "error");
      event.target.value = null;
      return;
    }
    alert("Receipt uploaded!", "success");
    navigate("/calendar");
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
