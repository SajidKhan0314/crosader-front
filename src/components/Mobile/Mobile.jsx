import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import NFT from "./NFT/NFT";
import Calendar from "./Calendar/Calendar";
import { About } from "./About/About";
import { useSelector } from "react-redux";
import classes from "./Mobile.module.scss";
import LoadingScreen from "../UI/LoadingScreen/LoadingScreen";

const Mobile = () => {
  const { isLoading, error } = useSelector((state) => state.project);
  return (
    <Layout>
      {isLoading && <LoadingScreen showText />}
      {!isLoading && error && <p className={classes.Error}>{error}</p>}
      {!isLoading && !error && (
        <Routes>
          <Route path="/nft/*" element={<NFT />} />
          <Route path="/all/*" element={<Home />} />
          <Route path="/calendar/*" element={<Calendar />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/nft" />} />
        </Routes>
      )}
    </Layout>
  );
};

export default Mobile;
