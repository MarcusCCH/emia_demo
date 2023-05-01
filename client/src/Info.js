import { useState, useEffect } from "react";
import { petOptions } from "./Pet";
function Info() {
  const [userInfo, setUserInfo] = useState(null);
  const [petInfo, setPetInfo] = useState([]);

  async function fetchUserInfo() {
    const response = await fetch("/info");
    const info = await response.json();
    setUserInfo(info);
  }
  async function fetchPetInfo(pet) {
    const response = await fetch(`/info/${pet}`);
    const info = await response.json();
    return info;
  }
  const fetchAllPetInfo = async () => {
    let _info = [];
    for (let i = 0; i < petOptions.length; i++) {
      let info = await fetchPetInfo(i);
      _info.push(info);
      // console.log(`pet ${i} info: ${JSON.stringify(info)}`);
      setPetInfo(_info);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchAllPetInfo();
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
      <div class="container-horizontal">
        {petOptions.map((pet, index) => (
          <div key={index} class="pet-card">
            {petInfo[index] ? (
              <div>
                {pet.image}
                <h2>{petInfo[index].type}</h2>
                <p>
                  successful session: {petInfo[index].totalSuccessfulSession}
                </p>
                <p>
                  success rate:{" "}
                  {(
                    (petInfo[index].totalSuccessfulSession /
                      petInfo[index].totalFocusSession) *
                    100
                  ).toFixed()}
                  %
                </p>
              </div>
            ) : (
              <h2>loading {petOptions[index].label}</h2>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Info;
