import { Grid, Box } from "@mui/material";
import React from "react";
import DayCard from "../components/Calendar/DayCard";

const Calendar = () => {
  const days = [
    {
      date: new Date(2022, 6, 25),
      entries: [{ id: 1, amount: -5, category: "Food - Home" }],
    },
    {
      date: new Date(2022, 6, 26),
      entries: [],
    },
    {
      date: new Date(2022, 6, 27),
      entries: [{ id: 2, amount: 100, category: "Income - Work" }],
    },
    {
      date: new Date(2022, 6, 28),
      entries: [],
    },
    {
      date: new Date(2022, 6, 29),
      entries: [],
    },
    {
      date: new Date(2022, 6, 30),
      entries: [],
    },
    {
      date: new Date(2022, 6, 31),
      entries: [],
    },
  ];
  return (
    <Box sx={{ mt: 2, mx: 4 }}>
      <Grid container spacing={2}>
        {days.map((day) => (
          <Grid key={day.date} item xs={12}>
            <DayCard date={day.date} entries={day.entries} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
