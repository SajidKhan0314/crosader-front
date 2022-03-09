import Icon from "../../UI/Icons/Icon";
import classes from "./Layout.module.scss";
import FooterMenu from "./FooterMenu/FooterMenu";
import { useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";

const Layout = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  const size = useWindowSize();

  let styleClasses = classes.Mobile;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  } else {
    styleClasses = [styleClasses, classes.Dark].join(" ");
  }

  return (
    <div className={styleClasses}>
      {size.width >= 480 && (
        <header className={classes.Header}>
          <Icon name="statusBar" />
        </header>
      )}
      <div className={classes.Main}>{children}</div>
      <footer className={classes.Footer}>
        <FooterMenu />
      </footer>
    </div>
  );
};

export default Layout;
