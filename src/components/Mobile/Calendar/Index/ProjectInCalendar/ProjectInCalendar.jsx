import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./ProjectInCalendar.module.scss";

const ProjectInCalendar = ({ name, date, status, type }) => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  let styleClasses = classes.ProjectInCalendar;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  if (type === "primary") {
    styleClasses = [styleClasses, classes.Primary].join(" ");
  }

  const goToDetailsPage = (projectName) => {
    const url = projectName.replace(/ /g, "-").toLowerCase();
    navigate(url);
  };

  return (
    <button className={styleClasses} onClick={() => goToDetailsPage(name)}>
      <p>{name}</p>
      <p>{date}</p>
      <p>{status}</p>
    </button>
  );
};

export default ProjectInCalendar;
