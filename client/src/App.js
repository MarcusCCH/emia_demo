import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Info from "./Info";
import Login from "./Login";
import { useState, useEffect } from "react";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [pageIdx, setPageIdx] = useState(0);
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  //snackbar
  const [openSB, setOpenSB] = useState(false);
  const [SBMessage, setSBMessage] = useState("");
  const pages = [
    <Home
      loginStatus={loginStatus}
      currentUser={currentUser}
      setOpenSB={setOpenSB}
      setSBMessage={setSBMessage}
    />,
    <Info />,
    <Login />,
  ];
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
  }, []);

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
        setPageIdx={setPageIdx}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />{" "}
      {pages[pageIdx]}{" "}
      <Snackbar
        open={openSB}
        autoHideDuration={1500}
        onClose={() => setOpenSB(false)}
        message={SBMessage}
        action={SBAction}
      />
    </div>
  );
}

export default App;
