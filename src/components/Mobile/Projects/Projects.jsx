import { NavLink, useNavigate } from "react-router-dom";
import SwipperProjectBox from "../../UI/SwipperProjectBox/SwipperProjectBox";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import classes from "./Projects.module.scss";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const Projects = ({ categoryName, allLink, projects = [] }) => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  let styleClasses = classes.Projects;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const goToDetailsPage = (projectName) => {
    const project = projectName.replace(/ /g, "-").toLowerCase();
    const category = categoryName.replace(/ /g, "-").toLowerCase();
    navigate(`/all/${category}/${project}`);
  };

  return (
    <Fragment>
      {projects.length > 0 && (
        <div className={styleClasses}>
          <div className={classes.ProjectsHeader}>
            <h4>{categoryName}</h4>
            <NavLink className={classes.SeeAllLink} to={allLink}>
              See All
            </NavLink>
          </div>
          <div className={classes.ProjectsBody}>
            <Swiper
              spaceBetween={150}
              slidesPerView={3}
              loop={projects.length >= 3}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {projects.map((project) => {
                return (
                  <SwiperSlide key={project.name}>
                    <SwipperProjectBox
                      name={project.name}
                      image={project.image}
                      status={project.status}
                      type={categoryName}
                      onClicked={goToDetailsPage}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Projects;
