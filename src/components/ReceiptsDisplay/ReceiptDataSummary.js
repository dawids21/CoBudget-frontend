import { Stack, Typography } from "@mui/material";

const ReceiptDataSummary = ({ receipt }) => {
  const { date, total } = receipt;
  const formatted = new Date(Date.parse(date)).toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <Stack direction="column" justifyContent="center" spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="primary.dark">
          Date:
        </Typography>
        <Typography variant="h5" color="primary.dark">
          {formatted}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="primary.dark">
          Total:
        </Typography>
        <Typography variant="h5" color="primary.dark">
          {total}$
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ReceiptDataSummary;
