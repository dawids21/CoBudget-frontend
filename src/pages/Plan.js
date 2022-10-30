import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PreviousNextButtons from "../components/UI/PreviousNextButtons/PreviousNextButtons";
import MonthAndYear from "../components/UI/MonthAndYear/MonthAndYear";
import NotPlannedInfo from "../components/Plan/NotPlannedInfo";
import PlanInfo from "../components/Plan/PlanInfo";
import { useOktaAuth } from "@okta/okta-react";
import ApiClient from "../util/api-client";
import useSnackbar from "../hooks/use-snackbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMonth } from "../util/date-util";
import CenterCircularProgress from "../components/UI/CenterCircularProgress";

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
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { authState } = useOktaAuth();
  const alert = useSnackbar();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  let startDate;
  if (dateParam) {
    startDate = getStartDate(new Date(Date.parse(dateParam)));
  } else {
    startDate = getStartDate(new Date());
  }
  const [start, setStart] = useState(startDate);

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

  const monthName = getMonth(start);

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

  const closeDeleteDialogHandler = async (response) => {
    setIsDeleteDialogOpen(false);
    if (!response) {
      return;
    }
    const apiClient = new ApiClient(accessToken);
    try {
      await apiClient.deletePlan(plan.id);
      setPlan(null);
    } catch (e) {
      alert(e.message, "error");
    }
  };

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <MonthAndYear date={start} />
      <PreviousNextButtons onPrevious={previousMonth} onNext={nextMonth} />
      {isLoading ? <CenterCircularProgress /> : null}
      {!isLoading && !plan ? (
        <NotPlannedInfo monthName={monthName} onCreateClick={createHandler} />
      ) : null}
      {!isLoading && plan ? (
        <Paper sx={{ display: "flex", flexDirection: "column" }} elevation={3}>
          <Box
            sx={{
              display: "flex",
              alignSelf: "flex-end",
            }}
          >
            <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                navigate(
                  `/plan/edit?date=${
                    new Date(start.getTime()).toISOString().split("T")[0]
                  }`
                )
              }
            >
              <EditIcon />
            </IconButton>
          </Box>
          <PlanInfo plan={plan.plannedCategories} />
        </Paper>
      ) : null}

      <Dialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialogHandler.bind(null, false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDeleteDialogHandler.bind(null, false)}>
            No
          </Button>
          <Button onClick={closeDeleteDialogHandler.bind(null, true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Plan;
