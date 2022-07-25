import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import Entry from "./Entry";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DayCard = (props) => {
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>{props.day.getDate()}</Avatar>
        <Typography color="primary.dark" sx={{ my: 1 }} variant="h5">
          {dayNames[props.day.getDay()]}
        </Typography>
        {props.entries.map((entry) => (
          <Entry
            key={entry.id}
            amount={entry.amount}
            category={entry.category}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default DayCard;
