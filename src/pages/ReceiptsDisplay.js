import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import UnderDevelopment from "../components/UI/UnderDevelopment";
import ReceiptData from "../components/ReceiptsDisplay/ReceiptData";
import { useLocation, useNavigate } from "react-router-dom";
import ApiClient from "../util/api-client";

const ReceiptsDisplay = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { authState } = useOktaAuth();
  const { accessToken } = authState.accessToken;
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CoBudget - receipts";
  }, []);

  useEffect(() => {
    if (!state) {
      navigate("/receipts", { replace: true });
    }
  }, [state, navigate]);

  useEffect(() => {
    const apiClient = new ApiClient(accessToken);
    apiClient.areReceiptsEnabled().then((r) => setIsEnabled(r));
  }, [accessToken]);

  return isEnabled ? (
    <ReceiptData receipt={state.receipt} />
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

export default ReceiptsDisplay;
