import {Backdrop, Button, CircularProgress, Paper, Typography, useMediaQuery,} from "@mui/material";
import React, {useState} from "react";
import {BrowserView, MobileView} from "react-device-detect";
import ApiClient from "../../util/api-client";
import {useOktaAuth} from "@okta/okta-react";
import {useNavigate} from "react-router-dom";
import useSnackbar from "../../hooks/use-snackbar";

const UploadReceiptForm = () => {
  const {authState} = useOktaAuth();
  const {accessToken} = authState.accessToken;
  const navigate = useNavigate();
  const alert = useSnackbar();
  // @ts-ignore
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [isUploading, setIsUploading] = useState(false);
  const receiptUploadHandler = async (event) => {
    if (!event.target.files) {
      return;
    }
    setIsUploading(true);
    const apiClient = new ApiClient(accessToken);
    let receipt;
    try {
      receipt = await apiClient.uploadReceipt(event.target.files[0]);
    } catch (e) {
      setIsUploading(false);
      alert(e.message, "error");
      event.target.value = null;
      return;
    }
    setIsUploading(false);
    alert("Receipt uploaded!", "success");
    navigate("/receipts/display", {state: {receipt}});
  };
  return (
    <Paper
      sx={{
        p: 2,
        textAlign: "center",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        width: mobile ? "90%" : "30rem",
      }}
      elevation={4}
    >
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(200, 200, 200, 0.5)",
        }}
        open={isUploading}
      >
        <CircularProgress/>
      </Backdrop>
      <Typography variant="h5" color="primary.dark">
        Upload receipt
      </Typography>
      <BrowserView>
        <Button sx={{mt: 2}} variant="contained" component="label">
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
        <Button sx={{mt: 2}} variant="contained" component="label">
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
