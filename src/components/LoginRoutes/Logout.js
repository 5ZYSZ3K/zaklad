import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";

export default function Logout() {
  const [errorMessage, setErrorMessage] = useState("");
  const { REACT_APP_LOGIN_URI } = process.env;
  const { checkAuthentication } = useContext(AuthContext);
  const handleClick = () => {
    axios
      .post(`${REACT_APP_LOGIN_URI}logout`)
      .then(() => {
        checkAuthentication();
      })
      .catch(() => {
        checkAuthentication();
        setErrorMessage("Internal server error");
      });
  };
  return (
    <div className="logout">
      <button onClick={handleClick}>Wyloguj się</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
