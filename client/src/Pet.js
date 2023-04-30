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
  },

  {
    label: "pig",
    value: 1,
    icon: (
      <Spline scene="https://prod.spline.design/B5tUZBAkQRrDGskz/scene.splinecode" />
    ),
  },

  {
    label: "hamster",
    value: 2,
    icon: <p> Hamster icon </p>,
  },
];
