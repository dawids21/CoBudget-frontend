import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CollapseList from "../components/UI/CollapseList/CollapseList";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);

  const editHandler = () => {
    setIsEditing(true);
  };

  const finishHandler = () => {
    setIsEditing(false);
  };

  const listData = [
    {
      id: 1,
      name: "Food",
      sub: [
        {
          id: 2,
          name: "Home",
        },
        {
          id: 3,
          name: "Work",
        },
      ],
    },
    {
      id: 4,
      name: "Income",
      sub: [
        {
          id: 5,
          name: "Work",
        },
      ],
    },
  ];

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <Grid container>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography component="h2" variant="h4">
                Categories
              </Typography>
              <CollapseList data={listData} />
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
