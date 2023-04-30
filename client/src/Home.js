import Pig from "./Pig";
import Hamster from "./Hamster";
import Cat from "./cat/Cat";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { petWidgets, petOptions } from "./Pet";

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {" "}
      {label}
      <select value={value} onChange={onChange}>
        {" "}
        {options.map((option) => (
          <option value={option.value}> {option.label} </option>
        ))}{" "}
      </select>{" "}
    </label>
  );
};

function Home() {
  const [sessionPeriod, setSessionPeriod] = useState(15);
  const [idx, setIdx] = useState(0);
  const [pet, setPet] = useState(0);
  const [session, setSession] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sessionEndTime, setSessionEndTime] = useState(0);

  const checkSessionStatus = () => {
    if (sessionEndTime <= currentTime) {
      setSession(false);
    }
  };
  //internal clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((currentTime) => currentTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeOptions = [
    { label: "15 minutes", value: 15 },

    { label: "30 minutes", value: 30 },

    { label: "45 minutes", value: 45 },
  ];

  const handleTimeChange = (event) => {
    setSessionPeriod(event.target.value);
  };

  function handlePetChange(sign) {
    var cur_idx = idx;
    if (cur_idx == 0 && sign === -1) cur_idx = petOptions.length - 1;
    else {
      cur_idx = (cur_idx + 1 * sign) % petOptions.length;
    }
    setIdx(cur_idx);
    setPet(petOptions[cur_idx].value);
  }

  const displayPet = () => {
    checkSessionStatus(); //check if the session has ended or not
    return petWidgets[pet];
  };

  const startSession = () => {
    setSession(true);
    setSessionEndTime(currentTime + sessionPeriod * 60);
  };

  return (
    <div className="App">
      <div class="container">
        {session === true ? (
          // start session
          <div class="container">
            <p>
              Time left: {Math.floor((sessionEndTime - currentTime) / 60)}:
              {(sessionEndTime - currentTime) % 60}
            </p>
            <button onClick={() => setSession(false)}> stop! </button>
            {displayPet()}
          </div>
        ) : (
          // end session
          <div class="container">
            <h3> Choose your pet </h3>
            <div class="viewer">{petOptions[pet].icon}</div>
            <div>
              <FaAngleLeft
                onClick={() => handlePetChange(-1)}
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                }}
              />
              <p style={{ display: "inline-block" }}>
                {" "}
                {petOptions[pet].label}{" "}
              </p>
              <FaAngleRight
                onClick={() => handlePetChange(+1)}
                style={{ display: "inline-block", marginLeft: "10px" }}
              />
            </div>
            <h3> Choose your time: </h3>{" "}
            <Dropdown
              label="Time session: "
              options={timeOptions}
              value={sessionPeriod}
              onChange={handleTimeChange}
            />
            <p> Current session: {sessionPeriod} minutes</p>
            <button onClick={() => startSession()}> start!</button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
export default Home;
