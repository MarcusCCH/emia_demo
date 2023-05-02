import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

function Login() {
  return (
    <div class="container">
      <h1> Login: </h1>{" "}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        action="/login"
        method="POST"
      >
        <input type="text" placeholder="Name" name="username" />
        <input type="text" placeholder="Password" name="password" />
        <Button variant="outlined" type="submit">
          {" "}
          Submit{" "}
        </Button>
      </form>{" "}
      <Divider />
      <h1> Register: </h1>{" "}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        action="/register"
        method="POST"
      >
        <input type="text" placeholder="Name" name="username" />
        <input type="text" placeholder="Password" name="password" />
        <Button variant="outlined" type="submit">
          {" "}
          Submit{" "}
        </Button>
      </form>{" "}
    </div>
  );
}
export default Login;
