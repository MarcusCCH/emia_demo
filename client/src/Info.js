import { useState, useEffect } from "react";

function Info() {
  const [userInfo, setUserInfo] = useState(null);
  async function fetchUserInfo() {
    const response = await fetch("/info");
    const info = await response.json();
    setUserInfo(info);
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const userInfoWidget = userInfo ? (
    <div>
      <ul>
        <li> Username: {userInfo.username} </li>{" "}
        <li> Session Number: {userInfo.sessionNumber} </li>{" "}
        <li>
          {" "}
          Favourite Pet:{" "}
          {userInfo.favouritePet ? userInfo.favouritePet : "None"}{" "}
        </li>{" "}
      </ul>{" "}
    </div>
  ) : (
    <div>
      <h1> Loading.... </h1>{" "}
    </div>
  );

  return (
    <div class="container">
      <h1> Info page </h1> {userInfoWidget}
    </div>
  );
}
export default Info;
