import Button from "@mui/material/Button";

function NavBar({ pageIdx, changePage, loginStatus, setLoginStatus }) {
  async function logout() {
    const res = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.logoutStatus === true) {
      setLoginStatus(false);
    } else {
      console.log("logout failed");
    }
  }
  const loginWidget = loginStatus ? (
    <>
      <li class="links" onClick={() => changePage(1)}>
        <Button variant={pageIdx == 1 ? "contained" : "text"}> Info </Button>{" "}
      </li>{" "}
      <li class="links" onClick={() => logout()}>
        <Button variant="text"> Logout </Button>{" "}
      </li>{" "}
    </>
  ) : (
    <li class="links" onClick={() => changePage(2)} className="login">
      <Button variant={pageIdx == 2 ? "contained" : "text"}> Login </Button>{" "}
    </li>
  );

  return (
    <ul class="navbar">
      <li>
        {" "}
        <img
          src="/fire_bird.png"
          alt="fire_bird"
          style={{ width: "30px", height: "30px" }}
        />{" "}
        USTudyPet{" "}
      </li>{" "}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <li class="links" onClick={() => changePage(0)}>
          <Button variant={pageIdx == 0 ? "contained" : "text"}> Home </Button>{" "}
        </li>{" "}
        {loginWidget}{" "}
      </div>{" "}
    </ul>
  );
}
export default NavBar;
