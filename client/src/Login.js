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
        <button> Submit </button>{" "}
      </form>{" "}
      <h1> Register: </h1>{" "}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        action="/register"
        method="POST"
      >
        <input type="text" placeholder="Name" name="username" />
        <input type="text" placeholder="Password" name="password" />
        <button> Submit </button>{" "}
      </form>{" "}
    </div>
  );
}
export default Login;
