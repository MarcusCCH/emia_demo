//styling
import "./App.css";
//react
import { useState, useEffect, useLayoutEffect } from "react";

import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

//components
import Home from "./Home";
import NavBar from "./NavBar";
import Info from "./Info";
import Login from "./Login";
import LandingPage from "./LandingPage";

//mui
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fab = {
  color: "primary",
  sx: fabStyle,
  icon: <QuestionMarkIcon />,
  label: "Question mark",
};
const homeInstructions = [
  {
    content: "Login first to save your progress!",
    target: ".navbar .login",
    disableBeacon: true,

    title: "Login",
  },
  {
    target: ".home .changePet",
    content: "Change your pet here! Pets will evolve as you study more.",
    spotlightPadding: 20,
    disableBeacon: true,
    title: "Pet",
  },
  {
    target: ".home .changeTime",
    content: "Choose how long you want your focus session to be.",
    disableBeacon: true,
    title: "Time",
  },
  {
    target: ".home .changeDevicePreference",
    content: "Are you using our device with hologram on it?",
    disableBeacon: true,
    title: "Device",
  },
];

const infoInstructions = [
  {
    content: "Click learn more to check each pet's progress",
    target: ".learnMoreButton",
    disableBeacon: true,
    title: "Pet's progress",
  },
  {
    target: ".infoNavigationButtons",
    content: "Click left arrow to go back and right arrow to go forward",
    disableBeacon: true,
    title: "Navigation",
  },
];

// make sure start page will only run once
var start_page_do_once = true;

let test_music = new Audio('music/just-relax.mp3')

function App() {
  //states
  const [animationComplete, setAnimationComplete] = useState(false);
  const [pageIdx, setPageIdx] = useState(3);
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [steps, setSteps] = useState(homeInstructions);
  const [run, setRun] = useState(false);
  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED, STATUS.PAUSED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  //snack bar(notification for user)
  const [openSB, setOpenSB] = useState(false);
  const [SBMessage, setSBMessage] = useState("");

  //data and fetching
  const pages = [
    <Home
      loginStatus={loginStatus}
      currentUser={currentUser}
      setOpenSB={setOpenSB}
      setSBMessage={setSBMessage}
    />,
    <Info />,
    <Login
      setPageIdx={setPageIdx}
      setOpenSB={setOpenSB}
      setSBMessage={setSBMessage}
      setLoginStatus={setLoginStatus}
    />,
    <LandingPage onAnimationComplete={() => {
      setAnimationComplete(true)
      console.log("animation complete");
    }} />,
  ];

  useLayoutEffect(() => {
    test_music.play();
    if (start_page_do_once) {
      setTimeout(() => setPageIdx(0), 4000);
      start_page_do_once = false;
    }
  }, [animationComplete]);

  async function fetchLoginStatus() {
    const resposne = await fetch("/loginStatus");
    const data = await resposne.json();
    if (data.loggedIn) {
      setLoginStatus(true);
      setCurrentUser(data.username);
      setSBMessage("Welcome back, " + data.username + "!");
      setOpenSB(true);
    } else {
      setLoginStatus(false);
    }
  }
  useEffect(() => {
    fetchLoginStatus();
  }, [loginStatus]);
  const changePage = (idx) => {
    console.log("changePage");
    setPageIdx(idx);
    switch (idx) {
      case 0:
        setSteps(homeInstructions);
        break;
      case 1:
        setSteps(infoInstructions);
        break;
      default:
        break;
    }
  };
  const SBAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpenSB(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <div>
      <NavBar
        pageIdx={pageIdx}
        // setPageIdx={setPageIdx}
        changePage={changePage}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        className="navBar"
      />{" "}
      {pages[pageIdx]}{" "}
      <Snackbar
        open={openSB}
        autoHideDuration={1500}
        onClose={() => setOpenSB(false)}
        message={SBMessage}
        action={SBAction}
      />
      <Joyride
        steps={steps}
        run={run}
        callback={handleJoyrideCallback}
        showProgress
        showSkipButton
        continuous
        scrollToFirstStep
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <Tooltip title="Steps to start">
        <Fab
          sx={fab.sx}
          aria-label={fab.label}
          color={fab.color}
          onClick={() => setRun(true)}
        >
          {fab.icon}
        </Fab>
      </Tooltip>
    </div>
  );
}

export default App;
