import { Box } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import ChangeWeek from "../components/Calendar/ChangeWeek";
import MonthAndYear from "../components/Calendar/MonthAndYear";
import Week from "../components/Calendar/Week";
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
  const [entries, setEntries] = useState([]);
  const { authState } = useOktaAuth();
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
    // this.entries = await this.getEntries()
  };

  const nextWeek = () => {
    const result = new Date(start.getTime());
    result.setDate(result.getDate() + 7);
    setStart(getStartDate(result));
    // this.entries = await this.getEntries()
  };

  const today = new Date();
  const todayUTC = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  );

  useEffect(() => {
    const end = new Date(start.getTime());
    end.setDate(start.getDate() + 6);
    const apiClient = new ApiClient(accessToken);
    apiClient.getEntries(start, end, (entriesData) => setEntries(entriesData));
  }, [start, accessToken]);

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <MonthAndYear date={start} />
      <ChangeWeek onPrevious={previousWeek} onNext={nextWeek} />
      <Week today={todayUTC} days={days} entries={entries} />
    </Box>
  );
};

export default Calendar;
