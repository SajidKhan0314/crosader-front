import { useSelector } from "react-redux";
import Icon from "../Icons/Icon";
import classes from "./ListProjectBox.module.scss";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const ListProjectBox = ({
  name,
  image,
  status,
  type,
  mintDate = null,
  onClicked,
}) => {
  const { theme } = useSelector((state) => state.theme);

  let smallName = name;
  let continueName = null;
  if (smallName.length > 25) {
    smallName = smallName.slice(0, 27).trim();
    continueName = "...";
  }

  let styleClasses = classes.ListProjectBox;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  return (
    <div className={styleClasses} onClick={() => onClicked(name)}>
      <img className={classes.ProjectImage} src={image} alt="" />
      <h5 className={classes.ProjectName}>
        {smallName}
        {continueName}
      </h5>
      {type.toLowerCase().includes("nfts") && status && (
        <small className={classes.ProjectStatus}>
          {status &&
            !status.toLowerCase().includes("upcoming") &&
            `Mint: ${status}`}
          {mintDate &&
            status &&
            status.toLowerCase().includes("upcoming") &&
            `Mint: ${new Date(mintDate).toLocaleDateString(
              undefined,
              dateOptions
            )}`}
        </small>
      )}
      {/* {mintDate && status && status.toLowerCase().includes("upcoming") && (
        <small className={classes.ProjectDate}>
          {new Date(mintDate).toLocaleDateString(undefined, dateOptions)}
        </small>
      )} */}
    </div>
  );
};

export default ListProjectBox;
