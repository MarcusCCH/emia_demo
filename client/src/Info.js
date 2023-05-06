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

const setPetObj = (pet) => {
  let petObject = {
    type: pet,
    evolutionStagesXp: 0,
    totalSuccessfulSession: 0,
    totalFailedSession: 0,
    evolutionStage: 0,
    histogram: [
      { successSession: 0, failedSession: 0 },
      { successSession: 0, failedSession: 0 },
      { successSession: 0, failedSession: 0 },
    ],
    loaded: false,
  };
  return petObject;
};
function Info() {
  const [userInfo, setUserInfo] = useState(null);
  // const [petInfo, setPetInfo] = useState([
  //   petOptions.map((pet) => setPetObj(pet.label)),
  // ]);
  const [petInfo, setPetInfo] = useState([
    setPetObj("fire bird"),
    setPetObj("pig"),
    setPetObj("hamster"),
  ]);
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
    const fire_bird = await fetchPetInfo(0);
    const pig = await fetchPetInfo(1);
    const hamster = await fetchPetInfo(2);
    var pet_info = [];

    pet_info[0] = fire_bird;
    pet_info[1] = pig;
    pet_info[2] = hamster;

    setPetInfo(pet_info);
  };

  useEffect(() => {
    console.log(petInfo);
    fetchUserInfo();
    fetchAllPetInfo();
    // .then((info_arr)=>{
    //   setPetInfo(info_arr);
    // });
  }, []);

  const allPetsWidget = petInfo.map((pet, index) => (
    <Card sx={{ width: 250 }}>
      <CardMedia sx={{ height: 150 }} image={petOptions[index].image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pet.type}
        </Typography>
        <p>Level {pet.evolutionStage + 1}</p>
        <BorderLinearProgress
          variant="determinate"
          value={
            (pet.totalSuccessfulSession /
              evolutionStagesXp[pet.evolutionStage]) *
            100
          }
        />
        {/* {pet.loaded ? (
          <>
            <p>Level {pet.evolutionStage + 1}</p>
            <BorderLinearProgress
              variant="determinate"
              value={
                (pet.totalSuccessfulSession /
                  evolutionStagesXp[pet.evolutionStage]) *
                100
              }
            />
          </>
        ) : (
          <>
            <Skeleton variant="rectangular" width={250} height={50} />
          </>
        )} */}

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
          <div class="learnMoreButton">Learn More</div>
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
        <div class="infoNavigationButtons">
          <KeyboardArrowLeftIcon
            color={petIdx < petOptions.length ? "primary" : "disabled"}
          />
        </div>
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
