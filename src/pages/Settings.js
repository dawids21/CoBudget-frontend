import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import EditCategories from "../components/Settings/EditCategories";
import CollapseList from "../components/UI/CollapseList/CollapseList";
import ApiClient from "../util/api-client";

const Settings = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { authState } = useOktaAuth();

  const { accessToken } = authState.accessToken;

  useEffect(() => {
    const apiClient = new ApiClient(accessToken);
    apiClient.getCategories().then((fetchedCategories) => {
      fetchedCategories.forEach(
        (category) => (category.sub = category.subcategories)
      );
      setCategories(fetchedCategories);
    });
  }, [accessToken]);

  const onDeleteHandler = (deleted) => {
    setCategories((prevCategories) => {
      let newCategories;
      if ("sub" in deleted) {
        newCategories = prevCategories.filter(
          (category) => category.id !== deleted.id
        );
      } else {
        const categoryIndex = prevCategories.findIndex(
          (category) => category.id === deleted.parentId
        );
        const categoryOfDeletedSubcategory = prevCategories[categoryIndex];
        const newSubcategories =
          categoryOfDeletedSubcategory.subcategories.filter(
            (subcategory) => subcategory.id !== deleted.id
          );
        console.log(newSubcategories);
        const newCategory = {
          ...categoryOfDeletedSubcategory,
          subcategories: newSubcategories,
          sub: newSubcategories,
        };
        console.log(newCategory);
        newCategories = [...prevCategories];
        newCategories[categoryIndex] = newCategory;
        console.log(newCategories);
      }
      return newCategories;
    });
  };

  const onAddCategoryHandler = (category) => {
    setCategories((prevCategories) => {
      return [
        ...prevCategories,
        { id: category.id, name: category.name, subcategories: [], sub: [] },
      ];
    });
  };

  const onAddSubategoryHandler = (subcategory) => {
    setCategories((prevCategories) => {
      const category = prevCategories.find(
        (c) => c.id === subcategory.parentId
      );
      category.subcategories.push({
        id: subcategory.id,
        name: subcategory.name,
      });
      return prevCategories;
    });
  };

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <Grid container>
        <Grid item xs={12}>
          <Card
            elevation={3}
            sx={{
              "& 	.MuiCardContent-root:last-child": {
                pb: 2,
              },
            }}
          >
            <CardContent>
              <Typography component="h2" variant="h4">
                Categories
              </Typography>
              <CollapseList
                data={categories}
                isEditing={isEditing}
                onDelete={onDeleteHandler}
              />
              <EditCategories
                categories={categories}
                onAddCategory={onAddCategoryHandler}
                onAddSubcategory={onAddSubategoryHandler}
                isEditing={isEditing}
                onStartEditing={() => setIsEditing(true)}
                onStopEditing={() => setIsEditing(false)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
