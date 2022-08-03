import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlanEditList from "../components/PlanEdit/PlanEditList";
import MonthAndYear from "../components/UI/MonthAndYear/MonthAndYear";
import useSnackbar from "../hooks/use-snackbar";
import ApiClient from "../util/api-client";

const PlanEdit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [plan, setPlan] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { authState } = useOktaAuth();
  const alert = useSnackbar();
  const dateParam = searchParams.get("date");
  const date = useMemo(() => new Date(Date.parse(dateParam)), [dateParam]);

  const { accessToken } = authState.accessToken;

  useEffect(() => {
    const apiClient = new ApiClient(accessToken);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedCategories = await apiClient.getCategories();
        setCategories(fetchedCategories);
      } catch (e) {
        alert("Problem with fetching categories", "error");
      }
      try {
        const fetchedPlan = await apiClient.getPlan(date);
        setPlan(fetchedPlan);
      } catch (e) {
        alert("Problem with fetching plan", "error");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [accessToken, alert, date]);

  return (
    <Box sx={{ mt: 2, mx: 4, textAlign: "center" }}>
      <MonthAndYear date={date} />
      <Paper elevation={3} sx={{ display: "flex", flexDirection: "column" }}>
        {!isLoading ? (
          <PlanEditList categories={categories} plan={plan} />
        ) : (
          <CircularProgress />
        )}
        <Button
          sx={{ alignSelf: "flex-end", mb: 1, mr: 1 }}
          variant="outlined"
          onClick={() => navigate("/plan")}
        >
          Go back
        </Button>
      </Paper>
    </Box>
  );
};

export default PlanEdit;
