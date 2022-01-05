import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "./Context/AuthContext";
import Logout from "./LoginRoutes/Logout";
import "../styles/Menu.css";

function Menu() {
  const { isAuthenticated } = useContext(AuthContext);
  const [className, setClassName] = useState("");
  const changeClassName = () => {
    className ? setClassName("") : setClassName("active");
  };
  return (
    <div className="menu">
      <img src="/assets/logo.svg" alt="Mateusz Leksan LOGO" />
      <ul>
        <NavLink
          to="/kontakt"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>KONTAKT</li>
        </NavLink>
        <NavLink
          to="/kategorie"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>GALERIA</li>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>O FIRMIE</li>
        </NavLink>
      </ul>
      <div className={`hamburger ${className}`} onClick={changeClassName}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`sidebar ${className}`}></div>
      {isAuthenticated && <Logout />}
    </div>
  );
}

export default Menu;
