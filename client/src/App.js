import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Info from "./Info";
import Login from "./Login";
import { useState, useEffect } from "react";

function App() {
  const [pageIdx, setPageIdx] = useState(0);
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const pages = [
    <Home loginStatus={loginStatus} currentUser={currentUser} />,
    <Info />,
    <Login />,
  ];
  async function fetchLoginStatus() {
    const resposne = await fetch("/loginStatus");
    const data = await resposne.json();
    if (data.loggedIn) {
      setLoginStatus(true);
      setCurrentUser(data.username);
    } else {
      setLoginStatus(false);
    }
  }
  useEffect(() => {
    fetchLoginStatus();
  });
  const welcomeWidget = loginStatus ? (
    <div>
      <p style={{ textAlign: "center" }}> Welcome back!{currentUser} </p>{" "}
    </div>
  ) : (
    <> </>
  );

  return (
    <div>
      <NavBar
        pageIdx={pageIdx}
        setPageIdx={setPageIdx}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />{" "}
      {welcomeWidget} {pages[pageIdx]}{" "}
    </div>
  );
}

export default App;
