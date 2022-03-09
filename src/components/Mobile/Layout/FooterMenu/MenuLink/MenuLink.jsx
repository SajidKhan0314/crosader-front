import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Icon from "../../../../UI/Icons/Icon";
import classes from "./MenuLink.module.scss";

const MenuLink = ({ text, link, icon }) => {
  const { theme } = useSelector((state) => state.theme);

  let styleClasses = classes.Link;
  let activeStyleClasses = classes.ActiveLink;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
    activeStyleClasses = [activeStyleClasses, classes.Light].join(" ");
  } else {
    styleClasses = [styleClasses, classes.Dark].join(" ");
    activeStyleClasses = [activeStyleClasses, classes.Dark].join(" ");
  }

  return (
    <li>
      <NavLink
        className={(navData) =>
          navData.isActive ? activeStyleClasses : styleClasses
        }
        to={link}
      >
        <Icon name={icon} />
        {text}
      </NavLink>
    </li>
  );
};

export default MenuLink;
