import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Pet, { petOptions } from "./Pet";
import Dropdown from "./Dropdown";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Home({ loginStatus, currentUser }) {
  const [sessionPeriod, setSessionPeriod] = useState(15);
  const [idx, setIdx] = useState(0); //for dropdown
  const [pet, setPet] = useState(0); //for passing between components
  const [session, setSession] = useState(false); // set if session has started
  const [currentTime, setCurrentTime] = useState(0); // internal clock
  const [sessionEndTime, setSessionEndTime] = useState(0);
  //snackbar
  const [openSB, setOpenSB] = useState(false);
  const [SBMessage, setSBMessage] = useState("");

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

  const checkSessionStatus = () => {
    if (sessionEndTime < currentTime && session) {
      if (loginStatus) {
        updateSessionData(true);
      }

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
    if (session) checkSessionStatus(); //check if the session has ended or not
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
  };

  const handleSBClose = () => {
    // if (reason === "clickaway") {
    //   return;
    // }
    setOpenSB(false);
  };
  const SBAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSBClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="App">
      <div class="container">
        {" "}
        {session === true ? (
          // start session
          <div class="container">
            <p>
              Time left: {Math.floor((sessionEndTime - currentTime) / 60)}:{" "}
              {(sessionEndTime - currentTime) % 60}{" "}
            </p>{" "}
            <Button variant="outlined" onClick={() => stopSession()}>
              stop!
            </Button>
            {displayPet()} <Pet petIdx={pet} />{" "}
          </div>
        ) : (
          // end session
          <div class="container">
            <h3> Choose your pet </h3>{" "}
            <div class="viewer"> {petOptions[pet].icon} </div>{" "}
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
              />{" "}
            </div>{" "}
            <h3> Choose your focus period: </h3>{" "}
            <Dropdown
              label="Time session: "
              options={timeOptions}
              value={sessionPeriod}
              onChange={handleTimeChange}
            />{" "}
            <Button variant="outlined" onClick={() => startSession()}>
              start!
            </Button>
          </div>
        )}{" "}
        <Snackbar
          open={openSB}
          autoHideDuration={1500}
          onClose={handleSBClose}
          message={SBMessage}
          action={SBAction}
        />
      </div>{" "}
    </div>
  );
}
export default Home;
