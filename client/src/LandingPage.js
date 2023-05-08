import { useState, useLayoutEffect } from "react";
import "./LandingPage.css";
const LandingPage = (props) => {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    setShow(true);
  }, []);

  // const onAnimationEnd = () => {
  //     console.log("onAnimationEnd");
  //     setShow(false);
  //     props.onAnimationComplete();
  // }
  const onAnimationComplete = () => {
    setShow(false);
    props.onAnimationComplete();
  };

  return (
    <div className="landing-container">
      {" "}
      {show && (
        <div className="box" onAnimationEnd={onAnimationComplete}>
          <img
            src="/landing_bird.png"
            alt="fire_bird"
            style={{ width: "30px", height: "30px" }}
          />{" "}
          <div className="text"> USTudyPet </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default LandingPage;
