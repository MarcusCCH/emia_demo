import Pig from "./Pig";
import Hamster from "./Hamster";
import Cat from "./cat/Cat";
import Spline from "@splinetool/react-spline";
export const petWidgets = [<Cat />, <Pig />, <Hamster />];
export const petOptions = [
  {
    label: "cat",
    value: 0,
    icon: (
      <Spline scene="https://draft.spline.design/p6F3m-93MDr228La/scene.splinecode" />
    ),
    image: <img src="/cat.jpeg" alt="cat" />,
  },

  {
    label: "pig",
    value: 1,
    icon: (
      <Spline scene="https://prod.spline.design/B5tUZBAkQRrDGskz/scene.splinecode" />
    ),
    image: <img src="/pig.png" alt="pig" />,
  },

  {
    label: "hamster",
    value: 2,
    icon: <p> Hamster icon </p>,
    image: <img src="/hamster.jpeg" alt="hamster" />,
  },
];
