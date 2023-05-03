import BorderLinearProgress from "./ProgressBar";
import { petOptions, evolutionStagesXp } from "./Pet";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//histograms
const histogramOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Histogram",
    },
  },
};
const histogramLabels = ["15 minutes", "30 minutes", "45 minutes"];

function PetInfo({ pet }) {
  const histogramData = {
    labels: histogramLabels,
    datasets: [
      {
        label: "Successful session",
        data: histogramLabels.map(
          (label, index) => pet.histogram[index].successSession
        ),
        backgroundColor: "rgba(5, 255, 71, 0.5)",
      },
      {
        label: "Failed session",
        data: histogramLabels.map(
          (label, index) => pet.histogram[index].failedSession
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const basicData = {
    labels: ["Total successful", "Total failed"],
    datasets: [
      {
        label: "Basic info",
        data: [pet.totalSuccessfulSession, pet.totalFailedSession],
        backgroundColor: ["rgba(5, 255, 71, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1> {pet.type} </h1> <h3> Level {pet.evolutionStage + 1} </h3>{" "}
      <p>
        {" "}
        {pet.totalSuccessfulSession}/ {evolutionStagesXp[pet.evolutionStage]}{" "}
      </p>{" "}
      <BorderLinearProgress
        variant="determinate"
        value={
          (pet.totalSuccessfulSession / evolutionStagesXp[pet.evolutionStage]) *
          100
        }
      />{" "}
      {pet.totalFocusSession ? (
        <Pie data={basicData} />
      ) : (
        <p> Let 's start working! </p>
      )}{" "}
      <p>
        {" "}
        Total attemped session: {pet.totalFocusSession}
        minutes{" "}
      </p>{" "}
      <p>
        {" "}
        Successful session: {pet.totalSuccessfulSession}
        minutes{" "}
      </p>{" "}
      <p>
        {" "}
        Failed session: {pet.totalFailedSession}
        minutes{" "}
      </p>{" "}
      <Bar options={histogramOptions} data={histogramData} />{" "}
    </div>
  );
}
export default PetInfo;
