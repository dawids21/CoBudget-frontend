import {LoginCallback} from "@okta/okta-react";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Calendar from "../../pages/Calendar";
import Home from "../../pages/Home";
import Plan from "../../pages/Plan";
import PlanEdit from "../../pages/PlanEdit";
import Settings from "../../pages/Settings";
import AppSecureRoute from "./AppSecureRoute";
import Login from "../../pages/Login";
import CenterCircularProgress from "../UI/CenterCircularProgress";
import Receipts from "../../pages/Receipts";
import ReceiptsDisplay from "../../pages/ReceiptsDisplay";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route
        path="/login/callback"
        element={<LoginCallback loadingElement={<CenterCircularProgress/>}/>}
      />
      <Route path="/calendar" element={<AppSecureRoute/>}>
        <Route path="" element={<Calendar/>}/>
      </Route>
      <Route path="/settings" element={<AppSecureRoute/>}>
        <Route path="" element={<Settings/>}/>
      </Route>
      <Route path="/plan" element={<AppSecureRoute/>}>
        <Route path="" element={<Plan/>}/>
      </Route>
      <Route path="/plan/edit" element={<AppSecureRoute/>}>
        <Route path="" element={<PlanEdit/>}/>
      </Route>
      <Route path="/receipts" element={<AppSecureRoute/>}>
        <Route path="" element={<Receipts/>}/>
      </Route>
      <Route path="/receipts/display" element={<AppSecureRoute/>}>
        <Route path="" element={<ReceiptsDisplay/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
