import React, { useEffect, useState } from "react";
import UnderDevelopment from "../components/UI/UnderDevelopment";
import { Typography } from "@mui/material";
import ApiClient from "../util/api-client";
import { useOktaAuth } from "@okta/okta-react";

const Receipts = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { authState } = useOktaAuth();
  const { accessToken } = authState.accessToken;

  useEffect(() => {
    document.title = "CoBudget - receipts";
  }, []);

  useEffect(() => {
    const apiClient = new ApiClient(accessToken);
    apiClient.areReceiptsEnabled().then((r) => setIsEnabled(r));
  }, [accessToken]);

  return isEnabled ? (
    <Typography>Ok</Typography>
  ) : (
    <UnderDevelopment
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: "center",
      }}
      variant="h4"
    />
  );
};

export default Receipts;
