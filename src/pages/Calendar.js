import { Box, CircularProgress } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useCallback, useEffect, useState } from "react";
import AddEntryButton from "../components/Calendar/AddEntryButton";
import AddEntryDialog from "../components/Calendar/AddEntryDialog";
import PreviousNextButtons from "../components/UI/PreviousNextButtons/PreviousNextButtons";
import MonthAndYear from "../components/UI/MonthAndYear/MonthAndYear";
import Week from "../components/Calendar/Week";
import useSnackbar from "../hooks/use-snackbar";
import ApiClient from "../util/api-client";

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
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const alert = useSnackbar();
  const { authState } = useOktaAuth();
  useEffect(() => {
    document.title = "Calendar - CoBudget";
  }, []);

  const { accessToken } = authState.accessToken;

  const days = [0, 1, 2, 3, 4, 5, 6].map((n) => {
    const clone = new Date(start.getTime());
    clone.setDate(clone.getDate() + n);
    return clone;
  });

  const previousWeek = () => {
    const result = new Date(start.getTime());
    result.setDate(result.getDate() - 7);
    setStart(getStartDate(result));
  };

  const nextWeek = () => {
    const result = new Date(start.getTime());
    result.setDate(result.getDate() + 7);
    setStart(getStartDate(result));
  };

  const today = new Date();
  const todayUTC = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const fetchEntries = useCallback(async () => {
    const end = new Date(start.getTime());
    end.setDate(start.getDate() + 6);
    const apiClient = new ApiClient(accessToken);
    try {
      const fetchedEntries = await apiClient.getEntries(start, end);
      setEntries(fetchedEntries);
    } catch (e) {
      alert(e.message, "error");
    }
  }, [start, accessToken, alert]);

  useEffect(() => {
    setIsLoading(true);
    fetchEntries().then(() => setIsLoading(false));
  }, [fetchEntries]);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <MonthAndYear date={start} />
      <PreviousNextButtons onPrevious={previousWeek} onNext={nextWeek} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Week today={todayUTC} days={days} entries={entries} />
      )}
      <AddEntryButton onClick={() => setDialogOpen(true)} />
      <AddEntryDialog
        open={dialogOpen}
        onClose={closeDialog}
        onAdd={fetchEntries}
      />
    </Box>
  );
};

export default Calendar;
