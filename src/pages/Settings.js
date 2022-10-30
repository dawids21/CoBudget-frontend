import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import CategoryContent from "../components/Settings/CategoryContent";
import EditCategories from "../components/Settings/EditCategories";
import SubcategoryContent from "../components/Settings/SubcategoryContent";
import NestedList from "../components/UI/NestedList/NestedList";
import useSnackbar from "../hooks/use-snackbar";
import ApiClient from "../util/api-client";

const Settings = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { authState } = useOktaAuth();
  const alert = useSnackbar();

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

  const onDeleteHandler = async (deleted) => {
    const apiClient = new ApiClient(accessToken);
    try {
      await apiClient.deleteCategory(deleted);
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
          const newCategory = {
            ...categoryOfDeletedSubcategory,
            subcategories: newSubcategories,
            sub: newSubcategories,
          };
          newCategories = [...prevCategories];
          newCategories[categoryIndex] = newCategory;
        }
        return newCategories;
      });
    } catch (e) {
      alert(e, "error");
    }
  };

  const onAddCategoryHandler = (category) => {
    setCategories((prevCategories) => {
      return [
        ...prevCategories,
        { id: category.id, name: category.name, subcategories: [], sub: [] },
      ];
    });
  };

  const onAddSubcategoryHandler = (subcategory) => {
    setCategories((prevCategories) => {
      const categoryIndex = prevCategories.findIndex(
        (c) => c.id === subcategory.parentId
      );
      const category = prevCategories[categoryIndex];
      const newSubcategories = [...category.subcategories, subcategory];
      const newCategory = {
        ...category,
        sub: newSubcategories,
        subcategories: newSubcategories,
      };
      const newCategories = [...prevCategories];
      newCategories[categoryIndex] = newCategory;
      return newCategories;
    });
  };

  const getCategoryComponent = (category, clickHandler, isOpen) => {
    return (
      <CategoryContent
        isEditing={isEditing}
        onDelete={onDeleteHandler}
        category={category}
        onClick={clickHandler}
        isOpen={isOpen}
      />
    );
  };

  const getSubcategoryComponent = (subcategory) => {
    return (
      <SubcategoryContent
        isEditing={isEditing}
        onDelete={onDeleteHandler}
        subcategory={subcategory}
      />
    );
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
              <NestedList
                data={categories}
                listComponent={getCategoryComponent}
                subListComponent={getSubcategoryComponent}
              />
              <EditCategories
                categories={categories}
                onAddCategory={onAddCategoryHandler}
                onAddSubcategory={onAddSubcategoryHandler}
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
