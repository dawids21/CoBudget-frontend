import { Box, Stack, Typography } from "@mui/material";

const ReceiptDataItem = ({ item }) => {
  return (
    <Stack direction="row" spacing={4}>
      <Typography variant="h6" color="primary.dark">
        {item.description}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="h6" color="primary.dark">
        {item.total}$
      </Typography>
    </Stack>
  );
};

export default ReceiptDataItem;
