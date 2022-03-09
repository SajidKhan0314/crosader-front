import { Route, Routes } from "react-router-dom";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import Index from "./Index/Index";

const NFT = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/:projectName" element={<ProjectDetails />} />
    </Routes>
  );
};

export default NFT;
