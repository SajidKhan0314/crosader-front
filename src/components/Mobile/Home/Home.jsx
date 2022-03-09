import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./Index/Index";
import Category from "./Category/Category";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/:category/*" element={<Category />} />
    </Routes>
  );
};

export default Home;
