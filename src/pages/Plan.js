import { Box } from "@mui/material";
import React, { useState } from "react";
import PreviousNextButtons from "../components/UI/PreviousNextButtons/PreviousNextButtons";
import MonthAndYear from "../components/UI/MonthAndYear/MonthAndYear";
import NotPlannedInfo from "../components/Plan/NotPlannedInfo";
import PlanInfo from "../components/Plan/PlanInfo";

const getStartDate = (day) => {
  return new Date(
    Date.UTC(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() - ((day.getDay() + 6) % 7)
    )
  );
};

const DUMMY_DATA = {
  id: 7,
  date: "2022-08-03",
  plannedCategories: [
    { subcategoryName: "Home", amount: 10 },
    { subcategoryName: "Work", amount: 20 },
  ],
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
  };

  const nextMonth = () => {
    const result = new Date(start.getTime());
    result.setMonth(result.getMonth() + 1);
    setStart(getStartDate(result));
    setIsPlanned(false); //TODO check if planned
  };

  const planData = [
    {
      id: 1,
      name: "Food",
      amount: DUMMY_DATA.plannedCategories
        .map((plannedCategory) => plannedCategory.amount)
        .reduce((partial, current) => partial + current, 0),
      sub: DUMMY_DATA.plannedCategories.map((plannedCategory) => ({
        id: Math.random(),
        name: plannedCategory.subcategoryName,
        amount: plannedCategory.amount,
      })),
    },
  ];

  console.log(planData);

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <MonthAndYear date={start} />
      <PreviousNextButtons onPrevious={previousMonth} onNext={nextMonth} />
      {!isPlanned ? (
        <NotPlannedInfo
          monthName={monthName}
          onPlanClick={() => setIsPlanned(true) /* TODO Switch to plan mode*/}
        />
      ) : (
        <PlanInfo plan={planData} />
      )}
    </Box>
  );
};;

export default Plan;
