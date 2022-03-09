import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../../UI/InputField/InputField";
import ThemeSwitcher from "../../../ThemeSwitcher/ThemeSwitcher";
import Dropdown from "../../../../UI/Dropdown/Dropdown";
import ListProjectBox from "../../../../UI/ListProjectBox/ListProjectBox";
import classes from "./Index.module.scss";

const Index = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { mintStatus, projects } = useSelector((state) => state.project);
  const params = useParams();
  const [filterText, setFilterText] = useState("");
  const [selectedMintingStatus, setSelectedMintingStatus] = useState(null);
  const heading = params.category.replace("-", " ");

  let styleClasses = classes.Projects;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const filterChangeHandler = (event) => {
    setFilterText(event.target.value);
  };

  const filterProjects = (newValue) => {
    setSelectedMintingStatus(newValue);
  };

  const goToDetailPage = (projectName) => {
    const url = projectName.replace(/ /g, "-").toLowerCase();
    navigate(url);
  };

  let mintingStatusDropDown = null;
  let projectElements = null;
  let projectsFilteredByNameElements = null;
  let noProjectFoundText = null;

  if (mintStatus && heading.toLowerCase().includes("nfts")) {
    mintingStatusDropDown = (
      <div className={classes.Row}>
        <Dropdown
          customClasses="mt-1-6 ml-auto"
          header="Mint Status"
          options={mintStatus.map((status) => status.name)}
          onChanged={filterProjects}
        />
      </div>
    );
  }

  if (projects && (!filterText || filterText === "")) {
    projectElements = (
      <div className={classes.AllProjects}>
        {projects
          .filter((project) => {
            if (!selectedMintingStatus || selectedMintingStatus === "All") {
              return (
                project.projectType.name.toLowerCase() === heading.toLowerCase()
              );
            }

            return (
              project.projectType.name.toLowerCase() ===
                heading.toLowerCase() &&
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
                onClicked={goToDetailPage}
              />
            );
          })}
      </div>
    );
  }

  if (filterText && filterText !== "") {
    const projectsFilteredByName = projects.filter((project) => {
      return (
        project.projectType.name.toLowerCase() === heading.toLowerCase() &&
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
          placeholder="Search Marketplace"
          onChanged={filterChangeHandler}
        />
        <ThemeSwitcher />
      </div>
      {mintingStatusDropDown}
      <h4>{heading}</h4>
      {projectElements}
      {projectsFilteredByNameElements}
      {noProjectFoundText}
    </div>
  );
};

export default Index;
