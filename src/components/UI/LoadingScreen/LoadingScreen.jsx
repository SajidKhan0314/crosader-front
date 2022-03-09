import classes from "./LoadingScreen.module.scss";
import logoImage from "../../../assets/logo.png";

const LoadingScreen = ({ showText }) => {
  return (
    <div className={classes.LoadingScreen}>
      {/* <img src={logoImage} alt=" Logo" /> */}
      {showText && <h3>Crosader Loading..</h3>}
    </div>
  );
};

export default LoadingScreen;
