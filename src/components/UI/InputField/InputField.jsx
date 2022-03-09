import { useSelector } from "react-redux";
import Icon from "../Icons/Icon";
import classes from "./InputField.module.scss";

const InputField = ({ value, placeholder, type = "text", icon, onChanged }) => {
  const { theme } = useSelector((state) => state.theme);
  let styleClasses = classes.InputField;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  if (theme === "dark") {
    styleClasses = [styleClasses, classes.Dark].join(" ");
  }

  return (
    <div className={styleClasses}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChanged}
      />
      {icon && <Icon name={icon} />}
    </div>
  );
};

export default InputField;
