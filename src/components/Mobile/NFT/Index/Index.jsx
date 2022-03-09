import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../UI/InputField/InputField";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import ListProjectBox from "../../../UI/ListProjectBox/ListProjectBox";
import { updateCurrentMintState } from "../../../../redux/log";
import classes from "./Index.module.scss";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentMintState } = useSelector((state) => state.log);
  const { projects, mintStatus } = useSelector((state) => state.project);
  const [filterText, setFilterText] = useState("");
  const [selectedMintingStatus, setSelectedMintingStatus] =
    useState(currentMintState);

  let styleClasses = classes.NFTs;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const filterChangeHandler = (event) => {
    setFilterText(event.target.value);
  };

  const filterProjects = (newValue) => {
    dispatch(updateCurrentMintState(newValue));
    setSelectedMintingStatus(newValue);
  };

  const goToDetailPage = (name) => {
    const url = name.replace(/ /g, "-").toLowerCase();
    navigate(url);
  };

  let mintingStatusDropDown = null;
  let projectElements = null;
  let projectsFilteredByNameElements = null;
  let noProjectFoundText = null;

  if (mintStatus) {
    mintingStatusDropDown = (
      <div className={classes.Row}>
        <Dropdown
          customClasses="mt-1-6 ml-auto"
          header={currentMintState || "Mint Status"}
          options={mintStatus.map((status) => status.name)}
          onChanged={filterProjects}
        />
      </div>
    );
  }

  if (projects && (!filterText || filterText === "")) {
    projectElements = projects
      .filter((project) => {
        if (!selectedMintingStatus || selectedMintingStatus === "All") {
          return project.projectType.name.toLowerCase() === "nfts";
        }

        return (
          project.projectType.name.toLowerCase().includes("nft") &&
          project.mintStatus &&
          project.mintStatus.name === selectedMintingStatus
        );
      })
      .map((project) => {
        return (
          <ListProjectBox
            key={project._id}
            name={project.name}
            image={`${process.env.REACT_APP_BASE_URL}/projects/${project._id}/image`}
            status={project.mintStatus && project.mintStatus.name}
            type={project.projectType.name}
            mintDate={project.publicMintDate}
            onClicked={goToDetailPage}
          />
        );
      });
  }

  if (filterText && filterText !== "") {
    const projectsFilteredByName = projects.filter((project) => {
      return (
        project.projectType.name.toLowerCase() === "nfts" &&
        project.name.toLowerCase().includes(filterText.toLocaleLowerCase())
      );
    });
    if (projectsFilteredByName.length > 0) {
      projectsFilteredByNameElements = projectsFilteredByName.map((project) => {
        return (
          <ListProjectBox
            key={project._id}
            name={project.name}
            image={`${process.env.REACT_APP_BASE_URL}/projects/${project._id}/image`}
            status={project.mintStatus && project.mintStatus.name}
            type={project.projectType.name}
            mintDate={project.publicMintDate}
            onClicked={goToDetailPage}
          />
        );
      });
    } else {
      projectsFilteredByNameElements = null;
    }
  }

  if (filterText && filterText !== "" && !projectsFilteredByNameElements) {
    noProjectFoundText = (
      <p className={classes.NoProjectFound}>
        No project found for <strong>{filterText}</strong>.
      </p>
    );
  }

  return (
    <div className={styleClasses}>
      <div className={classes.SearchAndTheme}>
        <InputField
          icon="magnifier"
          value={filterText}
          placeholder="Search NFTs"
          onChanged={filterChangeHandler}
        />
        <ThemeSwitcher />
      </div>
      {mintingStatusDropDown}
      <h4>NFTs</h4>
      <div className={classes.Projects}>
        {projectElements}
        {projectsFilteredByNameElements}
      </div>
      {noProjectFoundText}
    </div>
  );
};

export default Index;
