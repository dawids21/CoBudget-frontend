import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";

const AddEntryDialog = (props) => {
  const isFullscreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { open, onClose } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isFullscreen}>
      <Card elevation={isFullscreen ? 0 : 2}>
        <form onSubmit={handleSubmit}>
          <CardContent
            sx={{
              "& > *": { my: 1 },
              "& > *:last-child": { mt: 1 },
            }}
          >
            <Typography variant="h5" color="primary.dark" sx={{ mb: 1 }}>
              Add entry
            </Typography>
            <FormControl>
              <FormLabel id="type" color="black">
                Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="type"
                defaultValue="expense"
                name="type"
              >
                <FormControlLabel
                  value="expense"
                  control={<Radio color="secondary" />}
                  label="Expense"
                />
                <FormControlLabel
                  value="income"
                  control={<Radio color="primary" />}
                  label="Income"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              autoFocus
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              id="date"
              label="Date"
              type="date"
              fullWidth
              value="2022-02-02"
              InputLabelProps={{ shrink: true }}
              variant="standard"
            />
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="Category"
                variant="standard"
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Income">Income</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="subcategory">Subcategory</InputLabel>
              <Select
                labelId="subcategory"
                id="subcategory"
                label="Category"
                variant="standard"
              >
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions sx={{ display: "flex" }}>
            <Button color="secondary" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Button variant="contained" type="submit" onClick={onClose}>
              Add
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>
  );
};

export default AddEntryDialog;
