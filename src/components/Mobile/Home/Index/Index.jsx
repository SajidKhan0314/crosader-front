import React, { Fragment, useState } from "react";
import InputField from "../../../UI/InputField/InputField";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import Projects from "../../Projects/Projects";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SwipperProjectBox from "../../../UI/SwipperProjectBox/SwipperProjectBox";
import classes from "./Index.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const { projects, projectTypes } = useSelector((state) => state.project);
  const [filterText, setFilterText] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState(null);

  const filterChangeHandler = (event) => {
    setFilterText(event.target.value);
  };

  const filterProjects = (newValue) => {
    setSelectedProjectType(newValue);
  };

  const getProjects = (projectType) => {
    return projects
      .filter((project) => {
        if (!project.projectType) {
          return false;
        }
        return project.projectType.name === projectType.name;
      })
      .map((project) => {
        return {
          image: `${process.env.REACT_APP_BASE_URL}/projects/${project._id}/image`,
          name: project.name,
          status: project.mintStatus ? project.mintStatus.name : "",
        };
      });
  };

  const goToDetailPage = (projectName) => {
    const url = projectName.replace(/ /g, "-").toLowerCase();
    navigate(url);
  };

  const getLink = (name) => {
    return name.toLowerCase().includes("nfts")
      ? "/nft"
      : `/all/${name.replace(/ /g, "-").toLowerCase()}`;
  };

  let projectTypesDropdown = null;
  let projectsElement = null;
  let filteredProjects = null;
  let noProjectFoundText = null;

  if (projectTypes) {
    projectTypesDropdown = (
      <div className={classes.Row}>
        <Dropdown
          customClasses="mt-1-6 ml-auto"
          header="Project type"
          options={projectTypes.map((projectType) => projectType.name)}
          onChanged={filterProjects}
        />
      </div>
    );
  }

  if (projects && (!filterText || filterText === "")) {
    projectsElement = projectTypes
      .filter((projectType) => {
        if (!selectedProjectType || selectedProjectType === "All") {
          return true;
        }
        return projectType.name === selectedProjectType;
      })
      .map((projectType) => {
        return (
          <Projects
            key={projectType._id}
            categoryName={projectType.name}
            allLink={getLink(projectType.name)}
            projects={getProjects(projectType)}
          />
        );
      });
  }

  if (filterText && filterText !== "") {
    const filteredProjectsByName = projects.filter((project) => {
      return project.name.toLowerCase().includes(filterText.toLowerCase());
    });
    if (filteredProjectsByName.length > 0) {
      filteredProjects = (
        <div className={classes.FilteredProjects}>
          {projects
            .filter((project) => {
              return project.name
                .toLowerCase()
                .includes(filterText.toLowerCase());
            })
            .map((project) => {
              return (
                <SwipperProjectBox
                  key={project._id}
                  name={project.name}
                  image={`${process.env.REACT_APP_BASE_URL}/projects/${project._id}/image`}
                  status={project.mintStatus ? project.mintStatus.name : ""}
                  type={project.projectType.name}
                  onClicked={() =>
                    goToDetailPage(
                      `/home/${project.projectType.name
                        .replace(/ /g, "-")
                        .toLowerCase()}/${project.name}`
                    )
                  }
                />
              );
            })}
        </div>
      );
    } else {
      filteredProjects = null;
    }
  }

  if (filterText && filterText !== "" && !filteredProjects) {
    noProjectFoundText = (
      <div className={classes.FilteredProjects}>
        <p className={classes.NoProjectFound}>
          No project found for <strong>{filterText}</strong>.
        </p>
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.SearchAndTheme}>
        <InputField
          icon="magnifier"
          value={filterText}
          placeholder="Search Cronos"
          onChanged={filterChangeHandler}
        />
        <ThemeSwitcher />
      </div>
      {projectTypesDropdown}
      {projectsElement}
      {filteredProjects}
      {noProjectFoundText}
    </Fragment>
  );
};

export default Home;
