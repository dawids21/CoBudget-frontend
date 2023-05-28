import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ReceiptDataAccordionItem = ({
  item,
  categories,
  onCategoryChangeHandler,
}) => {
  const subcategories = useMemo(() => {
    const category = categories.find(
      (category) => category.name === item.category
    );
    return category ? category.subcategories : [];
  }, [item.category, categories]);

  const changeCategoryHandler = (event) => {
    onCategoryChangeHandler(event.target.value, "");
  };
  const changeSubcategoryHandler = (event) => {
    onCategoryChangeHandler(item.category, event.target.value);
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={item.id}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h6" color="primary.dark">
            {item.description}
          </Typography>
          <Typography variant="h6" color="primary.dark">
            {item.total}$
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl variant="standard" margin="normal" fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            label="Category"
            value={item.category}
            onChange={changeCategoryHandler}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" margin="normal" fullWidth>
          <InputLabel id="subcategory">Subcategory</InputLabel>
          <Select
            labelId="subcategory"
            id="subcategory"
            label="Subcategory"
            value={item.subcategory}
            onChange={changeSubcategoryHandler}
          >
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReceiptDataAccordionItem;
