function NavBar({ setPageIdx }) {
  return (
    <ul class="navbar">
      <li>3D study pet companion</li>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <li class="links" onClick={() => setPageIdx(0)}>
          Home
        </li>
        <li class="links" onClick={() => setPageIdx(1)}>
          Info
        </li>
      </div>
    </ul>
  );
}
export default NavBar;
