import "./Swipper.scss";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import classes from "./About.module.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination } from "swiper";
import { useEffect, useState } from "react";
import axios from "axios";

export const About = () => {
  const { theme } = useSelector((state) => state.theme);
  const [content, setContent] = useState("");

  let styleClasses = classes.About;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  useEffect(() => {
    axios
      .get("/about/code")
      .then((res) => {
        setContent(res.data.code || "");
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={styleClasses}>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.75,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="aboutSwipper"
      >
        <SwiperSlide>
          <img
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/DTwbjGkmcH1oWxiLu4Sk/pub/jlDGhiKCxEkq5acC2FDF.jpg"
            alt="NFT 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/DTwbjGkmcH1oWxiLu4Sk/pub/Kq1sd4vFHtHkt5vYWBXQ.png"
            alt="NFT 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/DTwbjGkmcH1oWxiLu4Sk/pub/U1DB0cKHAhU4xmw7dSH2.png"
            alt="NFT 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/DTwbjGkmcH1oWxiLu4Sk/pub/b3gpN2NOtz0ika0lcRns.png"
            alt="NFT 4"
          />
        </SwiperSlide>
      </Swiper>
      <div className={classes.Content}>{parse(content)}</div>
      {/* <p className={classes.Description}>
        The world &rsquo;s first and largest community of investors and crypto
        enthusiasts.
      </p>
      <PrimaryButton text="Get Started" onClicked={goHome} /> */}
    </div>
  );
};
