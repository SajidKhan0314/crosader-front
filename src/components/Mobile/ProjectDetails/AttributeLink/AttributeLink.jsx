import { useState } from "react";
import { useSelector } from "react-redux";
import Icon from "../../../UI/Icons/Icon";
import classes from "./AttributeLink.module.scss";

const AttributeLink = ({ name, link }) => {
  const { theme } = useSelector((state) => state.theme);
  const [isCopied, setIsCopied] = useState(false);

  let styleClasses = classes.AttributeLink;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const openLink = () => {
    window.open(link);
  };

  return (
    <div className={styleClasses}>
      <p className={classes.AttributeName}>{name}</p>
      {isCopied && <span className={classes.CopyMessage}>Copied!</span>}
      <div className={classes.LinkButtons}>
        <button className={classes.OpenButton} onClick={openLink}>
          <Icon name="open" />
        </button>
        <button className={classes.CopyButton} onClick={copyLink}>
          <Icon name="copy" />
        </button>
      </div>
    </div>
  );
};

export default AttributeLink;
