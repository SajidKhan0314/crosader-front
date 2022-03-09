import Mobile from "./components/Mobile/Mobile";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProjects } from "./redux/project";
import parse from "html-react-parser";
import classes from "./App.module.scss";
import LoadingScreen from "./components/UI/LoadingScreen/LoadingScreen";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [leftSide, setLeftSide] = useState("");
  const [rightSide, setRightSide] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let styleClasses = classes.App;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  useEffect(() => {
    axios
      .get("/codes")
      .then((res) => {
        setIsLoading(false);
        res.data.forEach((code) => {
          if (code.location === "left-panel") {
            setLeftSide(code.code);
          }
          if (code.location === "right-panel") {
            setRightSide(code.code);
          }
        });
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className={styleClasses}>
      {isLoading && <LoadingScreen />}
      <div className={classes.LeftAbout}>{parse(leftSide)}</div>
      <Mobile />
      <div className={classes.RightAbout}>{parse(rightSide)}</div>
    </div>
  );
}

export default App;
