import Spline from "@splinetool/react-spline";

export const petOptions = [
  {
    label: "fire bird",
    value: 0,
    icon: (
      <Spline scene="https://prod.spline.design/VNGsgHmiPAzpvJU4/scene.splinecode" />
    ),
    evolutionWidgets: [
      <Spline scene="https://prod.spline.design/VNGsgHmiPAzpvJU4/scene.splinecode" />,
    ],
    image: <img src="/fire_bird.png" alt="fire_bird" />,
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
    image: <img src="/pig.png" alt="pig" />,
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
    image: <img src="/hamster.jpeg" alt="hamster" />,
  },
];

function Pet({ petIdx }) {
  //TODO: fetch the evolution stage later
  return <div>{petOptions[petIdx].evolutionWidgets[0]}</div>;
}

export default Pet;
