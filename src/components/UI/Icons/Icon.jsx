import Calendar from "./Calendar";
import Home from "./Home";
import Info from "./Info";
import Magnifier from "./Magnifier";
import MobileFooter from "./MobileFooter";
import StatusBar from "./StatusBar";
import NFT from "./NFT";
import Pencil from "./Pencil";
import Sun from "./Sun";
import Crescent from "./Crescent";
import Chevron from "./Chevron";
import Copy from "./Copy";
import Status from "./Status";
import HeartFilled from "./HeartFilled";
import Filter from "./Filter";
import Open from "./Open";

const Icons = ({ name }) => {
  let iconElement = null;

  switch (name) {
    case "calendar":
      iconElement = <Calendar />;
      break;

    case "chevron":
      iconElement = <Chevron />;
      break;

    case "copy":
      iconElement = <Copy />;
      break;

    case "crescent":
      iconElement = <Crescent />;
      break;

    case "filter":
      iconElement = <Filter />;
      break;

    case "heart-filled":
      iconElement = <HeartFilled />;
      break;

    case "home":
      iconElement = <Home />;
      break;

    case "info":
      iconElement = <Info />;
      break;

    case "magnifier":
      iconElement = <Magnifier />;
      break;

    case "mobileFooter":
      iconElement = <MobileFooter />;
      break;

    case "statusBar":
      iconElement = <StatusBar />;
      break;

    case "nft":
      iconElement = <NFT />;
      break;

    case "open":
      iconElement = <Open />;
      break;

    case "pencil":
      iconElement = <Pencil />;
      break;

    case "status":
      iconElement = <Status />;
      break;

    case "sun":
      iconElement = <Sun />;
      break;

    default:
      break;
  }
  return iconElement;
};

export default Icons;
