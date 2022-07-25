import { Grid } from "@mui/material";
import React from "react";
import DayCard from "./DayCard";

const Week = (props) => {
  const { days, entries } = props;
  return (
    <Grid container spacing={2}>
      {days.map((day) => (
        <Grid key={day.getDay()} item xs={12} sm={6} md={4} lg={3}>
          <DayCard
            day={day}
            entries={entries.filter(
              (entry) => entry.date.getTime() === day.getTime()
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Week;
