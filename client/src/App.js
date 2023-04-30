import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Info from "./Info";
import { useState, useEffect } from "react";
const pages = [<Home />, <Info />];

function App() {
  const [pageIdx, setPageIdx] = useState(0);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  });
  return (
    <div>
      <NavBar setPageIdx={setPageIdx} />
      {pages[pageIdx]}
      <p> messages {!data ? "loading" : data}</p>
    </div>
  );
}

export default App;
