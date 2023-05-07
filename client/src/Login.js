import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

function Login({ setSBMessage, setOpenSB, setPageIdx, setLoginStatus }) {
  async function handleRegister(event) {
    event.preventDefault();
    let response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
    });
    let data = await response.json();
    console.log(data);
    if (data.error) {
      setSBMessage(data.error);
      setOpenSB(true);
      setPageIdx(2); //go back to login page
    }

    // action="/register"
    //     method="POST"
  }
  async function handleLogin(event) {
    event.preventDefault();
    let response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
    });
    let data = await response.json();
    console.log(data);
    if (data.error) {
      setSBMessage(data.error);
      setOpenSB(true);
      setPageIdx(2); //go back to login page
    } else if (data.success) {
      setSBMessage(data.success);
      setOpenSB(true);
      setPageIdx(0); //go back to login page
      setLoginStatus(true);
    }
  }
  return (
    <div class="container">
      <h1> Login: </h1>{" "}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleLogin}
      >
        <input
          type="text"
          placeHolder="Name"
          name="username"
          autoComplete="off"
        />
        <input
          type="password"
          placeHolder="Password"
          name="password"
          autoComplete="off"
        />
        <Button variant="outlined" type="submit">
          {" "}
          Submit{" "}
        </Button>{" "}
      </form>{" "}
      <Divider />
      <h1> Register: </h1>{" "}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeHolder="Name"
          name="username"
          autoComplete="off"
        />
        <input
          type="password"
          placeHolder="Password"
          name="password"
          autoComplete="off"
        />
        <Button variant="outlined" type="submit">
          {" "}
          Submit{" "}
        </Button>{" "}
      </form>{" "}
    </div>
  );
}
export default Login;
