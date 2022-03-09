import React, { useState } from "react";
import InputField from "../../../UI/InputField/InputField";
import Icons from "../../../UI/Icons/Icon";
import ProjectInCalendar from "./ProjectInCalendar/ProjectInCalendar";
import classes from "./Index.module.scss";
import { useSelector } from "react-redux";

const Index = () => {
  const { theme } = useSelector((state) => state.theme);
  const { projects } = useSelector((state) => state.project);
  const [filterText, setFilterText] = useState("");

  let styleClasses = classes.Calendar;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const filterChangeHandler = (event) => {
    setFilterText(event.target.value);
  };

  const getProjects = () => {
    const pastDate = new Date(new Date().setDate(new Date().getDate() - 14));
    const futureDate = new Date(new Date().setDate(new Date().getDate() + 30));

    if (projects) {
      const projectsFilteredByDate = projects.filter((project) => {
        if (!project.whitelistMintDate) {
          return false;
        }
        return (
          new Date(project.whitelistMintDate) > pastDate &&
          new Date(project.whitelistMintDate) < futureDate &&
          project.projectType.name.toLowerCase().includes("nft") &&
          project.mintStatus &&
          !project.mintStatus.name.toLowerCase().includes("complete")
        );
      });

      projectsFilteredByDate.sort(function (a, b) {
        var c = new Date(a.whitelistMintDate);
        var d = new Date(b.whitelistMintDate);
        return c - d;
      });

      return projectsFilteredByDate;
    }
    return [];
  };

  getProjects();

  let projectElements = null;
  let projectsFilteredByName = null;

  if (projects && (!filterText || filterText === "")) {
    const projectsFilteredByDate = getProjects();
    if (projectsFilteredByDate.length > 0) {
      projectElements = projectsFilteredByDate.map((project) => {
        return (
          <ProjectInCalendar
            key={project.name}
            name={project.name}
            date={new Date(project.whitelistMintDate).toDateString()}
            status={project.mintStatus ? project.mintStatus.name : "N/A"}
          />
        );
      });
    } else {
      projectElements = null;
    }
  }

  if (filterText && filterText !== "" && !projectElements) {
    const projectsFilteredByDate = getProjects();
    if (projectsFilteredByDate.length > 0) {
      projectsFilteredByName = projectsFilteredByDate
        .filter((project) => {
          return project.name.toLowerCase().includes(filterText.toLowerCase());
        })
        .map((project) => {
          return (
            <ProjectInCalendar
              key={project.name}
              name={project.name}
              date={new Date(project.whitelistMintDate).toDateString()}
              status={project.mintStatus ? project.mintStatus.name : "N/A"}
            />
          );
        });
    }
  }

  return (
    <div className={styleClasses}>
      <div className={classes.SearchAndTheme}>
        <InputField
          icon="magnifier"
          value={filterText}
          placeholder="Search Project"
          onChanged={filterChangeHandler}
        />
        <button className={classes.FilterButton}>
          <Icons name="filter" />
        </button>
      </div>
      <h4 className={classes.Heading}>Calendar</h4>
      {projectElements}
      {projectsFilteredByName}
    </div>
  );
};

export default Index;
