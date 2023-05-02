import Pig from "./Pig";
import Hamster from "./Hamster";
import FireBird from "./FireBird";
import Spline from "@splinetool/react-spline";
import { useState, useRef } from "react";
// import { Stats, OrbitControls, Circle } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const petWidgets = [<FireBird />, <Pig />, <Hamster />];
export const petOptions = [
  {
    label: "fire bird",
    value: 0,
    icon: (
      <Spline scene="https://prod.spline.design/VNGsgHmiPAzpvJU4/scene.splinecode" />
    ),
    image: <img src="/fire_bird.png" alt="fire_bird" />,
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
    icon: (
      <img
        src="/hamster.jpeg"
        alt="hamster"
        style={{ width: "100px", height: "100px" }}
      />
    ),
    image: <img src="/hamster.jpeg" alt="hamster" />,
  },
];
