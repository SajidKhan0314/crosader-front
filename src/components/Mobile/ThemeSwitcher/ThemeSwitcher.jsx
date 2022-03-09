import classes from "./ThemeSwitcher.module.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../redux/theme";
import Icon from "../../UI/Icons/Icon";

const ThemeSwitcher = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  let styleClasses = classes.ThemeSwitcher;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  } else {
    styleClasses = [styleClasses, classes.Dark].join(" ");
  }

  return (
    <button onClick={toggleThemeHandler} className={styleClasses}>
      {theme === "light" ? <Icon name="crescent" /> : <Icon name="sun" />}
    </button>
  );
};

export default ThemeSwitcher;
