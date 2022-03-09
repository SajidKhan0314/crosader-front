import React from "react";
import Index from "./Index/Index";
import ProjectDetails from "../ProjectDetails//ProjectDetails";
import { Route, Routes } from "react-router-dom";

const Calendar = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/:projectName" element={<ProjectDetails />} />
    </Routes>
  );
};

export default Calendar;
