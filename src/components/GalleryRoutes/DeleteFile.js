import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function DeleteFile({ imageID }) {
  const { REACT_APP_REST_URI } = process.env;
  const [message, setMessage] = useState({});
  const params = useParams();
  const clickHandler = () => {
    axios
      .delete(`${REACT_APP_REST_URI}update/${params.category}/${params.name}/${imageID}`)
      .then(() => {
        setMessage({
          type: true,
          message: "Pomyślnie usunięto!",
        });
      })
      .catch(() => {
        setMessage({
          type: true,
          message: "Błąd serwera, skontaktuj się z Administratorem!",
        });
      });
  };
  return (
    <div>
      {message.message && (
        <p
          style={{ fontWeight: 700, color: message.type ? "green" : "red" }}
        ></p>
      )}
      <button onClick={clickHandler}>Usuń</button>
    </div>
  );
}

export default DeleteFile;
