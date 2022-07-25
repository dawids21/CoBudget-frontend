import { Grid, Box } from "@mui/material";
import React from "react";
import DayCard from "../components/Calendar/DayCard";
import MonthAndYear from "../components/Calendar/MonthAndYear";
import Week from "../components/Calendar/Week";

const Calendar = () => {
  const getStartDate = (day) => {
    return new Date(
      Date.UTC(
        day.getFullYear(),
        day.getMonth(),
        day.getDate() - ((day.getDay() + 6) % 7)
      )
    );
  };

  const start = getStartDate(new Date());

  const days = [0, 1, 2, 3, 4, 5, 6].map((n) => {
    const clone = new Date(start.getTime());
    clone.setDate(clone.getDate() + n);
    return clone;
  });

  const entries = [
    {
      id: 1,
      amount: -5,
      date: new Date(Date.parse("2022-07-25T00:00:00Z")),
      category: "Food - Home",
    },
    {
      id: 2,
      amount: 100,
      date: new Date(Date.parse("2022-07-27T00:00:00Z")),
      category: "Income - Work",
    },
  ];
  return (
    <Box sx={{ mt: 2, mx: 4 }}>
      <MonthAndYear date={start} />
      <Week day={new Date()} days={days} entries={entries} />
    </Box>
  );
};

export default Calendar;
