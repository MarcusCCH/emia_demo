import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { petWidgets, petOptions } from "./Pet";

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

function Home({ loginStatus }) {
  const [sessionPeriod, setSessionPeriod] = useState(15);
  const [petIndex, setPetIndex] = useState(0);
  const [petValue, setPetValue] = useState(petOptions[0].value);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sessionEndTime, setSessionEndTime] = useState(0);

  const updateSessionData = async (sessionStatus) => {
    console.log("fetch");
    await fetch("/updateSessionData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionStatus,
        sessionPeriod,
        petIdx: petValue,
      }),
    });
  };

  const checkSessionStatus = () => {
    if (sessionEndTime < currentTime && isSessionActive) {
      if (loginStatus) {
        updateSessionData(true);
      }
      setIsSessionActive(false);
    }
  };

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

  const handlePetChange = (direction) => {
    const newIndex =
      (petIndex + direction + petOptions.length) % petOptions.length;
    setPetIndex(newIndex);
    setPetValue(petOptions[newIndex].value);
  };

  const displayPet = () => {
    if (isSessionActive) checkSessionStatus();
    return petWidgets[petValue];
  };

  const startSession = () => {
    setIsSessionActive(true);
    setSessionEndTime(currentTime + sessionPeriod);
  };

  const stopSession = () => {
    updateSessionData(false);
    setIsSessionActive(false);
  };

  return (
    <div className="App">
      <main className="container">
        {isSessionActive ? (
          // Active session
          <section className="container">
            <p>
              Time left:{" "}
              {`${Math.floor((sessionEndTime - currentTime) / 60)}:${(
                sessionEndTime - currentTime
              ) % 60}`}
            </p>
            <button onClick={stopSession}>Stop!</button>
            {displayPet()}
          </section>
        ) : (
          // Inactive session
          <section className="container">
            <header>
              <h3>Choose your pet</h3>
            </header>
            <div className="viewer">{petOptions[petIndex].icon}</div>
            <div>
              <FaAngleLeft
                onClick={() => handlePetChange(-1)}
                style={{ display: "inline-block", marginRight: "10px" }}
              />
              <p style={{ display: "inline-block" }}>
                {petOptions[petIndex].label}
              </p>
              <FaAngleRight
                onClick={() => handlePetChange(1)}
                style={{ display: "inline-block", marginLeft: "10px" }}
              />
            </div>
            <header>
              <h3>Choose your time:</h3>
            </header>
            <Dropdown
              label="Time session: "
              options={timeOptions}
              value={sessionPeriod}
              onChange={handleTimeChange}
            />
            <p>Current session: {sessionPeriod} minutes</p>
            <button onClick={startSession}>Start!</button>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
