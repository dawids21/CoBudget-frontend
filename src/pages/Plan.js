import { Box } from "@mui/material";
import React, { useState } from "react";
import PreviousNextButtons from "../components/UI/PreviousNextButtons/PreviousNextButtons";
import MonthAndYear from "../components/UI/MonthAndYear/MonthAndYear";
import NotPlannedInfo from "../components/Plan/NotPlannedInfo";

const getStartDate = (day) => {
  return new Date(
    Date.UTC(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() - ((day.getDay() + 6) % 7)
    )
  );
};

const Plan = () => {
  const [start, setStart] = useState(getStartDate(new Date()));
  const [isPlanned, setIsPlanned] = useState(false);

  const monthName = start.toLocaleDateString("default", { month: "long" });

  const previousMonth = () => {
    const result = new Date(start.getTime());
    result.setMonth(result.getMonth() - 1);
    setStart(getStartDate(result));
    setIsPlanned(false); //TODO check if planned
  };;

  const nextMonth = () => {
    const result = new Date(start.getTime());
    result.setMonth(result.getMonth() + 1);
    setStart(getStartDate(result));
    setIsPlanned(false); //TODO check if planned
  };;

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <MonthAndYear date={start} />
      <PreviousNextButtons onPrevious={previousMonth} onNext={nextMonth} />
      {!isPlanned ? (
        <NotPlannedInfo
          monthName={monthName}
          onPlanClick={() => setIsPlanned(true) /* TODO Switch to plan mode*/}
        />
      ) : null}
    </Box>
  );
};;

export default Plan;
