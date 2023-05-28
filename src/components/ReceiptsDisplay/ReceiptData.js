import { Button, Container, Divider, Paper, Stack, useMediaQuery } from "@mui/material";
import ReceiptDataSummary from "./ReceiptDataSummary";
import ReceiptDataItems from "./ReceiptDataItems";
import { useEffect, useState } from "react";
import ApiClient from "../../util/api-client";
import { useOktaAuth } from "@okta/okta-react";
import useSnackbar from "../../hooks/use-snackbar";

const ReceiptData = ({ receipt }) => {
  const [items, setItems] = useState(
    receipt.lineItems.map((item) => ({
      id: item.order,
      description: item.description,
      category: "",
      subcategory: "",
      total: item.total,
    }))
  );
  const [categories, setCategories] = useState([]);
  const { authState } = useOktaAuth();
  const { accessToken } = authState.accessToken;
  const alert = useSnackbar();
  // @ts-ignore
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const onReceiptCategoryChangeHandler = (category, subcategory) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, category, subcategory }))
    );
  };

  const onCategoryChangeHandler = (itemId, category, subcategory) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, category: category, subcategory: subcategory }
          : item
      )
    );
  };

  const onReceiptSaveHandler = () => {};

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
          <ReceiptDataSummary
            receipt={receipt}
            categories={categories}
            onReceiptCategoryChangeHandler={onReceiptCategoryChangeHandler}
            isMobile={isMobile}
          />
          <Divider />
          <ReceiptDataItems
            items={items}
            categories={categories}
            onCategoryChangeHandler={onCategoryChangeHandler}
            isMobile={isMobile}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={onReceiptSaveHandler}
            fullWidth={isMobile}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ReceiptData;
