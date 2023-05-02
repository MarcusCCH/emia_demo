import { useState, useEffect } from "react";
import { petOptions } from "./Pet";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
      // setPetInfo([...petInfo, info]);
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
        {/* <li> Session Number: {userInfo.sessionNumber} </li>{" "}
        <li>
          {" "}
          Favourite Pet:{" "}
          {userInfo.favouritePet ? userInfo.favouritePet : "None"}{" "}
        </li>{" "} */}
      </ul>{" "}
    </div>
  ) : (
    <div>
      <h1> Loading.... </h1>{" "}
    </div>
  );

  return (
    <div class="container">
      <h1> Info page </h1> {userInfoWidget}{" "}
      <div class="container-horizontal">
        {" "}
        {petOptions.map((pet, index) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 160 }} image={pet.image} />
            <CardContent>
              {petInfo[index] ? (
                <>
                  <Typography gutterBottom variant="h5" component="div">
                    {petInfo[index].type}
                  </Typography>
                  <p>
                    successful session: {petInfo[index].totalSuccessfulSession}
                  </p>
                  <p>
                    success rate:{" "}
                    {(
                      (petInfo[index].totalSuccessfulSession /
                        petInfo[index].totalFocusSession) *
                      100
                    ).toFixed()}{" "}
                    %
                  </p>{" "}
                </>
              ) : (
                <>
                  <h2> loading {petOptions[index].label} </h2>
                  <Skeleton variant="rectangular" width={210} height={118} />
                </>
              )}

              <Typography variant="body2" color="text.secondary"></Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Info;

// <div key={index} class="pet-card">
// {" "}
// {petInfo[index] ? (
//   <div>
//     {" "}
//     {pet.image} <h2> {petInfo[index].type} </h2>{" "}
//     <p>
//       successful session: {petInfo[index].totalSuccessfulSession}{" "}
//     </p>{" "}
//     <p>
//       success rate:{" "}
//       {(
//         (petInfo[index].totalSuccessfulSession /
//           petInfo[index].totalFocusSession) *
//         100
//       ).toFixed()}{" "}
//       %
//     </p>{" "}
//   </div>
// ) : (
//   <>
//     <h2> loading {petOptions[index].label} </h2>
//     <Skeleton variant="rectangular" width={210} height={118} />
//   </>
// )}{" "}
// </div>
// ))}{" "}
// </div>{" "}
