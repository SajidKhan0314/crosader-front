import classes from "./PrimaryButton.module.scss";

const PrimaryButton = ({ text, onClicked }) => {
  return (
    <button className={classes.PrimaryButton} onClick={onClicked}>
      {text}
    </button>
  );
};

export default PrimaryButton;
