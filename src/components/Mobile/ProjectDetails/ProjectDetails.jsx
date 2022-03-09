import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../UI/Icons/Icon";
import Attribute from "./Attribute/Attribute";
import AttributeLink from "./AttributeLink/AttributeLink";
import AttributesBox from "./AttributesBox/AttributesBox";
import { useSelector } from "react-redux";
import classes from "./ProjectDetails.module.scss";
import { useEffect, useState } from "react";

const ProjectDetails = () => {
  const { theme } = useSelector((state) => state.theme);
  const { projects } = useSelector((state) => state.project);
  const params = useParams();
  const navigate = useNavigate();
  const heading = params.projectName.replace(/-/g, " ");
  const [selectedProject, setSelectedProject] = useState({
    projectType: {},
    mintStatus: {},
    status: {},
  });

  const goBack = () => {
    navigate(-1);
  };

  let styleClasses = classes.Project;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const getProjectMintDate = (date) => {
    if (date === undefined) {
      return "N/A";
    }
    return new Date(date).toDateString();
  };

  let mintStatusHeader = null;

  if (
    selectedProject &&
    selectedProject.projectType &&
    selectedProject.projectType.name &&
    selectedProject.projectType.name.toLowerCase().includes("nfts")
  ) {
    mintStatusHeader = (
      <small className={classes.HeaderStatus}>
        {/* <span>
              <Icon name="status" />
            </span> */}
        {selectedProject.mintStatus
          ? `Mint: ${selectedProject.mintStatus.name}`
          : ""}
      </small>
    );
  }

  useEffect(() => {
    if (projects) {
      const foundProject = projects.find((project) => {
        return heading.toLocaleLowerCase() === project.name.toLocaleLowerCase();
      });
      if (foundProject === undefined) {
        return navigate("/home");
      }

      setSelectedProject(foundProject);
    }
  }, [projects, heading, navigate]);

  return (
    <div className={styleClasses}>
      <button className={classes.BackButton} onClick={goBack}>
        <Icon name="chevron" />
      </button>
      <div className={classes.ProjectHeader}>
        <div className={classes.HeaderDetails}>
          <h5>{heading}</h5>
          {mintStatusHeader}
        </div>
        {/* <button className={classes.Bookmark}>
          <Icon name="heart-filled" />
        </button> */}
      </div>
      <div className={classes.ProjectImage}>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/projects/${selectedProject._id}/image`}
          alt={heading}
        />
      </div>
      <p className={classes.ProjectDetails}>{selectedProject.description}</p>
      <AttributesBox heading="Mint Details">
        {selectedProject.mintStatus && (
          <Attribute
            name="Mint Status"
            value={selectedProject.mintStatus.name}
          />
        )}
        {selectedProject.whitelistMintDate && (
          <Attribute
            name="Mint Date"
            value={getProjectMintDate(selectedProject.whitelistMintDate)}
          />
        )}
        {selectedProject.mintQuantity && (
          <Attribute name="Quantity" value={selectedProject.mintQuantity} />
        )}
        {selectedProject.quantityDetails && (
          <Attribute
            name="Quantity Details"
            value={selectedProject.quantityDetails}
          />
        )}
        {selectedProject.publicMintPrice && (
          <Attribute
            name="Public Mint $CRO"
            value={selectedProject.publicMintPrice}
          />
        )}
        {selectedProject.ebPrice && (
          <Attribute name="Ebisu’s Bay $CRO" value={selectedProject.ebPrice} />
        )}
        {selectedProject.whitelistMintPrice && (
          <Attribute
            name="Whitelist Mint $CRO"
            value={selectedProject.whitelistMintPrice}
          />
        )}
        {selectedProject.whitelistDetails && (
          <Attribute
            name="Whitelist Details"
            value={selectedProject.whitelistDetails}
          />
        )}
        {selectedProject.whitelistMintTimeUTC && (
          <Attribute
            name="Whitelist Mint Time"
            value={getProjectMintDate(selectedProject.whitelistMintTimeUTC)}
          />
        )}
      </AttributesBox>
      <AttributesBox heading="Technicals">
        {selectedProject.rarity && (
          <Attribute name="Rarity" value={selectedProject.rarity} />
        )}
        {selectedProject.utility && (
          <Attribute name="Utility" value={selectedProject.utility} />
        )}
        {selectedProject.utilityDetails && (
          <Attribute
            name="Utility Details"
            value={selectedProject.utilityDetails}
          />
        )}
        {selectedProject.staking && (
          <Attribute name="Staking" value={selectedProject.staking} />
        )}
        {selectedProject.stakingDetails && (
          <Attribute
            name="Staking Details"
            value={selectedProject.stakingDetails}
          />
        )}
        {selectedProject.nftContract && (
          <Attribute
            showCopy
            name="NFT Contract Address"
            value={selectedProject.nftContract}
          />
        )}
        {selectedProject.tokenomics && (
          <Attribute name="Tokenomics" value={selectedProject.tokenomics} />
        )}
        {selectedProject.token && (
          <Attribute name="Token" value={selectedProject.token} />
        )}
        {selectedProject.tokenContract && (
          <Attribute
            name="Token Contract"
            value={selectedProject.tokenContract}
          />
        )}
        {selectedProject.dao && (
          <Attribute name="DAO" value={selectedProject.dao} />
        )}
        {selectedProject.daoDetails && (
          <Attribute name="DAO Details" value={selectedProject.daoDetails} />
        )}
      </AttributesBox>
      <AttributesBox heading="Socials">
        {selectedProject.websiteLink && (
          <AttributeLink name="Website" link={selectedProject.websiteLink} />
        )}
        {selectedProject.twitterLink && (
          <AttributeLink name="Twitter" link={selectedProject.twitterLink} />
        )}
        {selectedProject.discordLink && (
          <AttributeLink name="Discord" link={selectedProject.discordLink} />
        )}
        {selectedProject.whitePaperLink && (
          <AttributeLink
            name="Whitepaper"
            link={selectedProject.whitePaperLink}
          />
        )}
        {selectedProject.tiktokLink && (
          <AttributeLink name="TikTok" link={selectedProject.tiktokLink} />
        )}
        {selectedProject.instagramLink && (
          <AttributeLink
            name="Instagram"
            link={selectedProject.instagramLink}
          />
        )}
        {selectedProject.ebLink && (
          <AttributeLink name="EbisusBay" link={selectedProject.ebLink} />
        )}
        {selectedProject.agoraLink && (
          <AttributeLink name="Agora" link={selectedProject.agoraLink} />
        )}
      </AttributesBox>
    </div>
  );
};

export default ProjectDetails;
