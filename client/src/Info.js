import { useState, useEffect } from "react";
import { petOptions, evolutionStagesXp } from "./Pet";
import PetInfo from "./PetInfo";
import BorderLinearProgress from "./ProgressBar";

//mui
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function renderLeftButton({ petIdx, setPetIdx }) {
  if (petIdx < petOptions.length) {
    return (
      <div>
        <Button>
          <KeyboardArrowLeftIcon onClick={() => setPetIdx(petOptions.length)} />
        </Button>
      </div>
    );
  }
}

function Info() {
  const [userInfo, setUserInfo] = useState(null);
  const [petInfo, setPetInfo] = useState([]);
  const [petIdx, setPetIdx] = useState(petOptions.length); //render all info page
  const [lastPetIdx, setLastPetIdx] = useState(-1);
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

  const allPetsWidget = petOptions.map((pet, index) => (
    <Card sx={{ width: 250 }}>
      <CardMedia sx={{ height: 150 }} image={pet.image} />
      <CardContent>
        {petInfo[index] ? (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {petInfo[index].type}
            </Typography>
            <p>Level {petInfo[index].evolutionStage + 1}</p>
            <BorderLinearProgress
              variant="determinate"
              value={
                (petInfo[index].totalSuccessfulSession /
                  evolutionStagesXp[petInfo[index].evolutionStage]) *
                100
              }
            />
          </>
        ) : (
          <>
            <h2> loading {petOptions[index].label} </h2>
            <Skeleton variant="rectangular" width={250} height={50} />
          </>
        )}

        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setPetIdx(index);
            setLastPetIdx(index);
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  ));

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
  const renderPage = () => {
    if (petIdx === petOptions.length) {
      return allPetsWidget;
    } else {
      return <PetInfo pet={petInfo[petIdx]} />;
    }
  };

  const renderButtons = (
    <div>
      <Button
        onClick={() => {
          if (petIdx < petOptions.length) setPetIdx(petOptions.length);
        }}
      >
        <KeyboardArrowLeftIcon
          color={petIdx < petOptions.length ? "primary" : "disabled"}
        />
      </Button>
      <Button
        onClick={() => {
          if (
            lastPetIdx !== -1 &&
            lastPetIdx < petOptions.length &&
            petIdx === petOptions.length
          )
            setPetIdx(lastPetIdx);
        }}
      >
        {/* if user has traversed to individual pet info page, and current page is showing all pets, then show the icon */}
        <KeyboardArrowRightIcon
          color={
            lastPetIdx !== -1 &&
            lastPetIdx < petOptions.length &&
            petIdx === petOptions.length
              ? "primary"
              : "disabled"
          }
        />
      </Button>
    </div>
  );

  return (
    <div class="container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "80%",
        }}
      >
        <div>{renderButtons}</div>
      </div>

      {/* {userInfoWidget} */}
      <div class="container-horizontal">{renderPage()}</div>
    </div>
  );
}
export default Info;
