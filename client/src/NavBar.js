function NavBar({ setPageIdx, loginStatus, setLoginStatus }) {
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
      <li class="links" onClick={() => setPageIdx(1)}>
        Info
      </li>
      <li class="links" onClick={() => logout()}>
        Logout{" "}
      </li>
    </>
  ) : (
    <li class="links" onClick={() => setPageIdx(2)}>
      Login{" "}
    </li>
  );

  return (
    <ul class="navbar">
      <li> 3D study pet companion </li>{" "}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <li class="links" onClick={() => setPageIdx(0)}>
          Home{" "}
        </li>{" "}
        {loginWidget}{" "}
      </div>{" "}
    </ul>
  );
}
export default NavBar;
