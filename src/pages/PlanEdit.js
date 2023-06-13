import { Button, Container, Paper } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlanEditList from "../components/PlanEdit/PlanEditList";
import MonthAndYear from "../components/UI/MonthAndYear/MonthAndYear";
import useSnackbar from "../hooks/use-snackbar";
import ApiClient from "../util/api-client";
import CenterCircularProgress from "../components/UI/CenterCircularProgress";

const PlanEdit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [plan, setPlan] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const { authState } = useOktaAuth();
  const alert = useSnackbar();
  const dateParam = searchParams.get("date");
  if (!dateParam) {
    navigate("/plan", { replace: true });
  }
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

  useEffect(() => {
    if (isFinished && !isSendingRequest) {
      navigate(`/plan?date=${dateParam}`);
    }
  }, [isFinished, isSendingRequest, dateParam, navigate]);

  return (
    <Container sx={{ mt: 2, textAlign: "center" }}>
      <MonthAndYear date={date} />
      <Paper elevation={3} sx={{ display: "flex", flexDirection: "column" }}>
        {!isLoading ? (
          <PlanEditList
            categories={categories}
            plan={plan}
            isSendingRequest={setIsSendingRequest}
          />
        ) : (
          <CenterCircularProgress />
        )}
        <Button
          sx={{ alignSelf: "flex-end", mb: 1, mr: 1 }}
          variant="outlined"
          onClick={() => setIsFinished(true)}
        >
          Finish
        </Button>
      </Paper>
    </Container>
  );
};

export default PlanEdit;
