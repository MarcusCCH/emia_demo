import "./App.css";
import Spline from "@splinetool/react-spline";
import { useState } from "react";

function Pig() {
  const [evolutionStage, setEvolutionStage] = useState(0);
  const evolutionStageWidgets = [
    <Spline scene="https://prod.spline.design/C8lqrXGPAeNWnsaE/scene.splinecode" />,
    <Spline scene="https://prod.spline.design/6lIv0lzepNh1ET0i/scene.splinecode" />,
  ];

  //MYTODO: add API fetch to get the current evolution stage of each pet
  //MYTODO2: add a general api fetch and add a parameter (pet type)
  return (
    <div>
      <h1> Pig </h1>{" "}
      <button
        onClick={() => {
          if (evolutionStage < evolutionStageWidgets.length - 1)
            setEvolutionStage(evolutionStage + 1);
        }}
      >
        Evolve{" "}
      </button>{" "}
      <p> current stage: {evolutionStage} </p>{" "}
      <div class="viewer"> {evolutionStageWidgets[evolutionStage]} </div>{" "}
    </div>
  );
}

export default Pig;
