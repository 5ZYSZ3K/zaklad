import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import "../../styles/Input.css";

export default function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { REACT_APP_LOGIN_URI } = process.env;
  const { isAuthenticated, checkAuthentication } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const submitHandler = () => {
    axios
      .post(REACT_APP_LOGIN_URI, { login, password })
      .then(() => {
        checkAuthentication();
        console.log(isAuthenticated);
      })
      .catch(() => {
        console.log(isAuthenticated);
        setErrorMessage("Zły login lub hasło!");
      });
  };
  return (
    <div className="form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(login, password);
        }}
      >
        <input
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          placeholder="login"
        />
        <br />
        <input
          type="password"
          placeholder="hasło"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <input type="submit" value="Wyślij" />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
