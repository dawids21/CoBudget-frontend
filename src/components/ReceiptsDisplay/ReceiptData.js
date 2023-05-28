import { Container, Divider, Paper, Stack } from "@mui/material";
import ReceiptDataSummary from "./ReceiptDataSummary";
import ReceiptDataItems from "./ReceiptDataItems";
import { useEffect, useState } from "react";
import ApiClient from "../../util/api-client";
import { useOktaAuth } from "@okta/okta-react";
import useSnackbar from "../../hooks/use-snackbar";

const ReceiptData = ({ receipt }) => {
  const [categories, setCategories] = useState([]);
  const { authState } = useOktaAuth();
  const { accessToken } = authState.accessToken;
  const alert = useSnackbar();

  useEffect(() => {
    const apiClient = new ApiClient(accessToken);
    apiClient
      .getCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch((error) => alert(error.message, "error"));
  }, [accessToken, alert]);

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4, m: "auto", maxWidth: 800 }}>
        <Stack spacing={2}>
          <ReceiptDataSummary receipt={receipt} />
          <Divider />
          <ReceiptDataItems items={receipt.lineItems} categories={categories} />
        </Stack>
      </Paper>
    </Container>
  );
};

export default ReceiptData;
