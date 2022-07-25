import { Grid, Box } from "@mui/material";
import React, { useState } from "react";
import ChangeWeek from "../components/Calendar/ChangeWeek";
import DayCard from "../components/Calendar/DayCard";
import MonthAndYear from "../components/Calendar/MonthAndYear";
import Week from "../components/Calendar/Week";

const getStartDate = (day) => {
  return new Date(
    Date.UTC(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() - ((day.getDay() + 6) % 7)
    )
  );
};

const Calendar = () => {
  const [start, setStart] = useState(getStartDate(new Date()));

  const days = [0, 1, 2, 3, 4, 5, 6].map((n) => {
    const clone = new Date(start.getTime());
    clone.setDate(clone.getDate() + n);
    return clone;
  });

  const previousWeek = () => {
    const result = new Date(start.getTime());
    result.setDate(result.getDate() - 7);
    setStart(getStartDate(result));
    // this.entries = await this.getEntries()
  };

  const nextWeek = () => {
    const result = new Date(start.getTime());
    result.setDate(result.getDate() + 7);
    setStart(getStartDate(result));
    // this.entries = await this.getEntries()
  };

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
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <MonthAndYear date={start} />
      <ChangeWeek onPrevious={previousWeek} onNext={nextWeek} />
      <Week day={new Date()} days={days} entries={entries} />
    </Box>
  );
};

export default Calendar;
