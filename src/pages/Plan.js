import { Box, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PreviousNextButtons from "../components/UI/PreviousNextButtons/PreviousNextButtons";
import MonthAndYear from "../components/UI/MonthAndYear/MonthAndYear";
import NotPlannedInfo from "../components/Plan/NotPlannedInfo";
import PlanInfo from "../components/Plan/PlanInfo";
import { useOktaAuth } from "@okta/okta-react";
import ApiClient from "../util/api-client";
import useSnackbar from "../hooks/use-snackbar";

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
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authState } = useOktaAuth();
  const alert = useSnackbar();

  const { accessToken } = authState.accessToken;

  const fetchPlan = useCallback(() => {
    setIsLoading(true);
    const date = new Date(start.getTime());
    const apiClient = new ApiClient(accessToken);
    apiClient
      .getPlan(date)
      .then((fetchedPlan) => {
        setPlan(fetchedPlan);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e.message, "error");
        setIsLoading(false);
      });
  }, [start, accessToken, alert]);

  useEffect(() => fetchPlan(), [fetchPlan]);

  const monthName = start.toLocaleDateString("default", { month: "long" });

  const previousMonth = () => {
    const result = new Date(start.getTime());
    result.setMonth(result.getMonth() - 1);
    setStart(getStartDate(result));
  };

  const nextMonth = () => {
    const result = new Date(start.getTime());
    result.setMonth(result.getMonth() + 1);
    setStart(getStartDate(result));
  };

  const createHandler = () => {
    const apiClient = new ApiClient(accessToken);
    apiClient
      .createPlan(new Date(start.getTime()))
      .then(() => fetchPlan())
      .catch((e) => alert(e.message, "error"));
  };

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <MonthAndYear date={start} />
      <PreviousNextButtons onPrevious={previousMonth} onNext={nextMonth} />
      {isLoading ? <CircularProgress /> : null}
      {!isLoading && !plan ? (
        <NotPlannedInfo
          monthName={monthName}
          onCreateClick={createHandler} /* TODO Switch to plan mode*/
        />
      ) : null}
      {!isLoading && plan ? <PlanInfo plan={plan.plannedCategories} /> : null}
    </Box>
  );
};

export default Plan;
