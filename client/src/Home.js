import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import PacmanLoader from "react-spinners/PacmanLoader";

import Pet, { petOptions } from "./Pet";
import Dropdown from "./Dropdown";

//mui
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Button from "@mui/material/Button";

//y coordinate data for the pet during session
const Y_OFFSET = 20; //how much pet moves per click
const Y_DEFAULT_W_DEVICE = 400; //default y coordinate
const Y_DEFAULT_WO_DEVICE = 200; //lowest y coordinate without device
const Y_LOW = 300; //lowest y coordinate (**distance from top)
const Y_HIGH = 500; //highest y coordinate (**distance from top)

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Home({ loginStatus, currentUser, setOpenSB, setSBMessage }) {
  const [sessionPeriod, setSessionPeriod] = useState(15);
  const [idx, setIdx] = useState(0); //for dropdown
  const [pet, setPet] = useState(0); //for passing between components
  const [session, setSession] = useState(false); // set if session has started
  const [currentTime, setCurrentTime] = useState(0); // internal clock
  const [sessionEndTime, setSessionEndTime] = useState(0);
  const [usingDevice, setUsingDevice] = useState(true);
  const [petYcoor, setPetYcoor] = useState(Y_DEFAULT_W_DEVICE);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const canvasRef = useRef(null);
  async function updateSessionData(_sessionStatus) {
    console.log("fetch");
    fetch("/updateSessionData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionStatus: _sessionStatus,
        sessionPeriod: sessionPeriod,
        petIdx: pet,
      }),
    });
  }

  const resetSession = () => {
    setPetYcoor(Y_DEFAULT_W_DEVICE);
    setUsingDevice(true);
  };

  const checkSessionStatus = () => {
    if (sessionEndTime < currentTime && session) {
      if (loginStatus) {
        updateSessionData(true);
      }
      setSBMessage(`Session ended! You have earned ${sessionPeriod} points!`);
      setOpenSB(true);
      resetSession();

      setSession(false);
    }
  };

  //internal clock
  useEffect(() => {
    setPageLoaded(true);
    // console.log(canvasRef.current.childNodes[1].childNodes[0].style.display);
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
    setCanvasLoaded(false);
    var cur_idx = idx;
    if (cur_idx == 0 && sign === -1) cur_idx = petOptions.length - 1;
    else {
      cur_idx = (cur_idx + 1 * sign) % petOptions.length;
    }
    setIdx(cur_idx);
    setPet(petOptions[cur_idx].value);
  }

  //check if the session has ended or not
  const handleSession = () => {
    if (session) checkSessionStatus();
  };

  const startSession = () => {
    setSession(true);
    setSessionEndTime(currentTime + sessionPeriod * 60);
    setSBMessage("Session started!");
    setOpenSB(true);
    console.log(
      `end time: ${
        currentTime + sessionPeriod * 60
      }, start-time: ${currentTime}`
    );
  };
  const stopSession = () => {
    updateSessionData(false);
    setSession(false);
    setSBMessage("Session stopped!");
    setOpenSB(true);
    resetSession();
  };

  //move the pets during session
  const handleYCoorChange = (newY) => {
    if (newY >= Y_LOW && newY <= Y_HIGH) {
      setPetYcoor(newY);
    } else {
      setSBMessage("Pet cannot go any further!");
      setOpenSB(true);
    }
  };

  //buttons to move the pets
  const renderButtons = () => {
    if (usingDevice) {
      return (
        <div>
          <Button onClick={() => handleYCoorChange(petYcoor + Y_OFFSET)}>
            <AddCircleOutlineIcon />
          </Button>{" "}
          <Button onClick={() => handleYCoorChange(petYcoor - Y_OFFSET)}>
            <RemoveCircleIcon />
          </Button>{" "}
        </div>
      );
    }
  };
  //handle preference of using our device with cube or not. Adjust pet's y coordinate accordingly
  const handleDeviceChange = () => {
    setUsingDevice(!usingDevice);
    if (usingDevice === true) {
      //this is so buggy idk why but it works so i dont care
      setPetYcoor(Y_DEFAULT_WO_DEVICE);
    } else {
      setPetYcoor(Y_DEFAULT_W_DEVICE);
    }
  };
  const renderCanvasWaitingScreen = () => {
    if (!canvasLoaded) {
      if (pageLoaded && canvasRef.current.childNodes[1]) {
        if (
          canvasRef.current.childNodes[1].tagName == "DIV" &&
          canvasRef.current.childNodes[1].childNodes[0].tagName == "CANVAS"
        ) {
          const _canvasLoaded =
            canvasRef.current.childNodes[1].childNodes[0].style.display ===
            "block";
          console.log(canvasRef.current.childNodes[1].childNodes[0].tagName);
          if (_canvasLoaded) setCanvasLoaded(_canvasLoaded);
        } else {
          setCanvasLoaded(true);
        }
      }
      return (
        <PacmanLoader
          cssOverride={override}
          color="#36d7b7"
          speedMultiplier={2}
        />
      );
    }
  };
  return (
    <div className="App">
      <div class="container">
        {" "}
        {session === true ? (
          // start session
          <div class="container">
            {" "}
            {renderButtons()}{" "}
            <p>
              Time left: {Math.floor((sessionEndTime - currentTime) / 60)}:{" "}
              {(sessionEndTime - currentTime) % 60}{" "}
            </p>{" "}
            <Button variant="outlined" onClick={() => stopSession()}>
              stop!
            </Button>{" "}
            {handleSession()}{" "}
            <Pet petIdx={pet} petYCoor={petYcoor} loginStatus={loginStatus} />{" "}
          </div>
        ) : (
          // end session
          <div class="container home">
            <h3> Choose your pet </h3>{" "}
            <div class="viewer" ref={canvasRef}>
              {renderCanvasWaitingScreen()}
              {petOptions[pet].icon}
            </div>{" "}
            <div>
              <FaAngleLeft
                onClick={() => handlePetChange(-1)}
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                }}
              />{" "}
              <p style={{ display: "inline-block" }}>
                {" "}
                {petOptions[pet].label}{" "}
              </p>{" "}
              <FaAngleRight
                onClick={() => handlePetChange(+1)}
                style={{ display: "inline-block", marginLeft: "10px" }}
                className="changePet"
              />{" "}
            </div>{" "}
            <h3> Choose your focus period: </h3>{" "}
            <div className="changeTime">
              <Dropdown
                label="Time session: "
                options={timeOptions}
                value={sessionPeriod}
                onChange={handleTimeChange}
              />{" "}
            </div>
            <div>
              <label for="usingDevice"> Using device </label>{" "}
              <input
                type="checkbox"
                checked={usingDevice}
                onChange={() => handleDeviceChange()}
                id="usingDevice"
                className="changeDevicePreference"
              />{" "}
            </div>{" "}
            <Button
              variant="outlined"
              onClick={() => startSession()}
              className="startSessionButton"
            >
              start!
            </Button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
export default Home;
