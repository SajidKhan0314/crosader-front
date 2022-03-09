import classes from "./FooterMenu.module.scss";
import MenuLink from "./MenuLink/MenuLink";

const LINKS = [
  {
    text: "NFT",
    link: "/nft",
    icon: "nft",
  },
  {
    text: "All",
    link: "/all",
    icon: "home",
  },
  {
    text: "Calendar",
    link: "/calendar",
    icon: "calendar",
  },
  {
    text: "About",
    link: "/about",
    icon: "info",
  },
];

const FooterMenu = () => {
  return (
    <ul className={classes.FooterMenu}>
      {LINKS.map((link) => {
        return (
          <MenuLink
            key={link.link}
            text={link.text}
            link={link.link}
            icon={link.icon}
          />
        );
      })}
    </ul>
  );
};

export default FooterMenu;
