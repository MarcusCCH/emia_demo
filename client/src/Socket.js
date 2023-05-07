import { useState, useEffect } from "react";
import webSocket from "socket.io-client";

function Socket({ currentUser, enteredRoom }) {
  //websocket
  const [ws, setWs] = useState(null);
  const connectWebSocket = () => {
    setWs(webSocket("http://localhost:3000"));
  };

  const initWebSocket = () => {
    ws.on("login", (message) => {
      console.log(message);
    });
    ws.on("enterRoom", (message) => {
      console.log(message);
    });
  };

  useEffect(() => {
    if (currentUser) {
      connectWebSocket();
    }
  }, [currentUser]);

  useEffect(() => {
    if (ws && currentUser) {
      console.log("success connect!");
      initWebSocket();
      let message = {
        type: "login",
        user: currentUser,
        content: `${currentUser} has logged in`,
        auth_token: "ustudypet",
      };
      ws.emit("login", message);
    }
  }, [ws]);

  useEffect(() => {
    if (ws && currentUser) {
      //if is loggedin and connected to websocket
      let message = {
        type: "enterRoom",
        content: `${currentUser} has entered common room`,
      };
      ws.emit("enterRoom", message);
    }
  }, [enteredRoom]);

  return <div>{ws ? "connected" : "disconnected"} </div>;
}
export default Socket;
