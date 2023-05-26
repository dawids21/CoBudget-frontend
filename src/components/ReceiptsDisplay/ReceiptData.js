import { Container, Divider, Paper, Stack } from "@mui/material";
import ReceiptDataSummary from "./ReceiptDataSummary";
import ReceiptDataItems from "./ReceiptDataItems";

const ReceiptData = ({ receipt }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4, m: "auto", maxWidth: 800 }}>
        <Stack spacing={2}>
          <ReceiptDataSummary receipt={receipt} />
          <Divider />
          <ReceiptDataItems items={receipt.lineItems} />
        </Stack>
      </Paper>
    </Container>
  );
};

export default ReceiptData;
