import { Button, Container, Divider, Paper, Stack, useMediaQuery } from "@mui/material";
import ReceiptDataSummary from "./ReceiptDataSummary";
import ReceiptDataItems from "./ReceiptDataItems";
import { useEffect, useState } from "react";
import ApiClient from "../../util/api-client";
import { useOktaAuth } from "@okta/okta-react";
import useSnackbar from "../../hooks/use-snackbar";
import { useNavigate } from "react-router-dom";

const ReceiptData = ({ receipt }) => {
  const [items, setItems] = useState(
    receipt.lineItems.map((item) => ({
      id: item.order,
      description: item.description,
      category: "",
      subcategory: "",
      categoryId: null,
      total: item.total,
    }))
  );
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(receipt.total);
  const [date, setDate] = useState(new Date(Date.parse(receipt.date)));
  const [isValid, setIsValid] = useState(false);
  const { authState } = useOktaAuth();
  const { accessToken } = authState.accessToken;
  const alert = useSnackbar();
  const navigate = useNavigate();
  // @ts-ignore
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const validateItems = () => {
    const valid = items.every(
      (item) =>
        item.category !== "" &&
        item.subcategory !== "" &&
        item.categoryId !== null
    );
    const dateValid = date !== null;
    setIsValid(valid && dateValid);
  };

  useEffect(() => {
    validateItems();
  }, [items, date]);

  const onReceiptCategoryChangeHandler = (
    category,
    subcategory,
    categoryId
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, category, subcategory, categoryId }))
    );
  };

  const onCategoryChangeHandler = (
    itemId,
    category,
    subcategory,
    categoryId
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              category: category,
              subcategory: subcategory,
              categoryId,
            }
          : item
      )
    );
  };

  const onTotalChangeHandler = (itemId, total) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, total: +total } : item
      )
    );
  };

  useEffect(() => {
    const newTotal = items
      .filter((item) => item.total)
      .reduce((acc, item) => acc + item.total, 0);
    setTotal(newTotal);
  }, [items]);

  const onReceiptSaveHandler = () => {
    const apiClient = new ApiClient(accessToken);
    const groupedItems = items.reduce((acc, item) => {
      const { categoryId } = item;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(item);
      return acc;
    }, {});
    const entries = Object.keys(groupedItems).map((categoryId) => {
      const total = groupedItems[categoryId]
        .reduce((acc, item) => acc + item.total, 0)
        .toFixed(2);

      return {
        amount: -total,
        date: date,
        categoryId: +categoryId,
      };
    });
    apiClient
      .addEntries(entries)
      .then(() => {
        alert("Receipt saved", "success");
        navigate("/calendar", { replace: true });
      })
      .catch((error) => alert(error.message, "error"));
  };

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
            total={total}
            categories={categories}
            date={date}
            onReceiptCategoryChangeHandler={onReceiptCategoryChangeHandler}
            onDateChangeHandler={setDate}
            isMobile={isMobile}
          />
          <Divider />
          <ReceiptDataItems
            items={items}
            categories={categories}
            onCategoryChangeHandler={onCategoryChangeHandler}
            onTotalChangeHandler={onTotalChangeHandler}
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
            disabled={!isValid}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ReceiptData;
