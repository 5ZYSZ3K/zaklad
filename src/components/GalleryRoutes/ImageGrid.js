import { useDrag, useDrop } from "react-dnd";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
import "../../styles/Gallery.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function ImageGrid({ name, image, id, dropHandler }) {
  dotenv.config();
  const params = useParams();
  const [message, setMessage] = useState({});
  const { REACT_APP_REST_URI, PUBLIC_URL, REACT_APP_IMAGES_PATH } = process.env;
  const [, connectDrag] = useDrag({
    type: "IMG",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, connectDrop] = useDrop({
    accept: "IMG",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(item) {
      dropHandler(item.id, id);
    },
  });
  const deleteHandler = () => {
    axios
      .delete(`${REACT_APP_REST_URI}categories/${params.name}/${name}`)
      .then(() => {
        setMessage({
          type: true,
          message: "Pomyślnie usunięto!",
        });
      })
      .catch(() => {
        setMessage({
          type: false,
          message: "Błąd serwera, skontaktuj się z Administratorem!",
        });
      });
  };
  return (
    <div ref={connectDrag} style={{ display: "inline" }}>
      <div ref={connectDrop}>
        <Link to={`/kategorie/${params.name}/${name}`}>
          <img
            className="galleryImage"
            src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${params.name}/${name}/${image}`}
            alt={name}
          />
          <h2>{name.toUpperCase()}</h2>
        </Link>
        {message.message && (
          <p style={{ fontWeight: 700, color: message.type ? "green" : "red" }}>
            {message.message}
          </p>
        )}
        <button onClick={deleteHandler}>Usuń</button>
      </div>
    </div>
  );
}
