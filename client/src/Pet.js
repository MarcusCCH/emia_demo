import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
export const evolutionStagesXp = [100, 200, 1000, 2000]; //need 100 minutes to evolve to stage 1, 200 minutes to evolve from stage 1 to 2
export const petOptions = [
  {
    label: "fire bird",
    value: 0,
    icon: (
      <Spline scene="https://prod.spline.design/VNGsgHmiPAzpvJU4/scene.splinecode" />
    ),
    evolutionWidgets: [
      <iframe
        width="1024"
        height="640"
        allowfullscreen
        src="https://v3d.net/jan"
      />,
      <iframe
        width="1024"
        height="640"
        allowfullscreen
        src="https://v3d.net/jaj"
      />,
      <iframe
        width="1024"
        height="640"
        allowfullscreen
        src="https://v3d.net/jah"
      />,
    ],
    image: "/fire_bird.png",
  },

  {
    label: "pig",
    value: 1,
    icon: (
      <Spline scene="https://draft.spline.design/m5pP0OsbeTdIhdOC/scene.splinecode" />
    ),
    evolutionWidgets: [
      <Spline scene="https://prod.spline.design/C8lqrXGPAeNWnsaE/scene.splinecode" />,
      <Spline scene="https://prod.spline.design/6lIv0lzepNh1ET0i/scene.splinecode" />,
    ],
    image: "/pig.png",
  },

  {
    label: "hamster",
    value: 2,
    icon: (
      <img
        src="/hamster.jpeg"
        alt="hamster"
        style={{ width: "100px", height: "100px" }}
      />
    ),
    evolutionWidgets: [
      <iframe
        width="400"
        height="300"
        frameborder="0"
        src="https://cdn.abowman.com/widgets/hamster/hamster.html?up_bgColor=111111&up_bodyColor=e6debe&up_earColor=d4c898&up_snoutColor=f7f4e9&up_eyeColor=000000&up_feetColor=d4c898&up_tailColor=e6debe&up_waterColor=e0efff&up_foodColor=cba920&up_wheelColor=ffffff&up_wheelOuterColor=ff4d4d&up_wheelCenterColor=e4eb2f&up_wheelSpokeColor=dedede"
      />,
    ],
    image: "/hamster.jpeg",
  },
];

function Pet({ petIdx, petYCoor, loginStatus }) {
  const [evolutionStage, setEvolutionStage] = useState(0);
  async function fetchEvolutionStage() {
    const res = await fetch(`/getEvolutionStage/${petIdx}`);
    const data = await res.json();
    console.log(petOptions[petIdx].label, ":", data.evolutionStage);
    setEvolutionStage(
      Math.min(
        data.evolutionStage,
        petOptions[petIdx].evolutionWidgets.length - 1
      )
    );
  }
  useEffect(() => {
    if (loginStatus) fetchEvolutionStage();
    else {
      setEvolutionStage(0);
    }
  }, []);

  return (
    <div style={{ position: "absolute", top: `${petYCoor}px` }}>
      {" "}
      {petOptions[petIdx].evolutionWidgets[evolutionStage]}{" "}
    </div>
  );
}

export default Pet;
