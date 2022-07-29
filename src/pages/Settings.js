import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import CollapseList from "../components/UI/CollapseList/CollapseList";
import ApiClient from "../util/api-client";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
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

  const editHandler = () => {
    setIsEditing(true);
  };

  const finishHandler = () => {
    setIsEditing(false);
  };

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <Grid container>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography component="h2" variant="h4">
                Categories
              </Typography>
              <CollapseList data={categories} />
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              {isEditing ? (
                <Button
                  disableRipple
                  variant="contained"
                  onClick={finishHandler}
                >
                  Finish
                </Button>
              ) : (
                <Button disableRipple variant="outlined" onClick={editHandler}>
                  Edit
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
