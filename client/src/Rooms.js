import { useEffect, useState } from "react";

function Rooms() {
  const [commonRoomUsers, setCommonRoomUsers] = useState(null);
  const [rooms, setRooms] = useState([]); //private rooms
  async function fetchRoomUsers() {
    const response = await fetch("/commonRoomUsers");
    const data = await response.json();
    setCommonRoomUsers(data);
  }
  useEffect(() => {});
  return (
    <div>
      <h1> Rooms </h1>{" "}
    </div>
  );
}

export default Rooms;
