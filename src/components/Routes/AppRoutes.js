import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "../../pages/Calendar";
import Home from "../../pages/Home";
import AppSecureRoute from "./AppSecureRoute";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<AppSecureRoute />}>
        <Route path="" element={<Calendar />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
