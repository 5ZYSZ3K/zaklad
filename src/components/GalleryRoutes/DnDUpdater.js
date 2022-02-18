import { useDrag, useDrop } from "react-dnd";
import dotenv from "dotenv";
import "../../styles/Gallery.css";
import axios from "axios";
import { useState } from "react";

export default function ImageGrid({
  updater,
  path,
  image,
  id,
  dropHandler,
}) {
  dotenv.config();
  const { PUBLIC_URL, REACT_APP_IMAGES_PATH, REACT_APP_REST_PRODUCTION_URI } = process.env;
  const [message, setMessage] = useState({});
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
      .post(`${REACT_APP_REST_PRODUCTION_URI}delete`, { _id: updater })
      .then(() => {
        setMessage({
          type: true,
          message: "Pomyślnie usunięto! Odśwież stronę, aby zobaczyć zmiany"
        })
      })
      .catch(() => {
        setMessage({
          type: false,
          message: "Wewnętrzny błąd serwera!"
        })
      });
  };
  return (
    <div ref={connectDrag}>
      <div ref={connectDrop}>
        <img
          className="galleryImage"
          src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${path}/${image}`}
          alt={image}
        />
        {message.type && <p style={{fontWeight: 700, color: message.type?"green":"red"}}>{message.message}</p>}
        <input type="submit" onClick={deleteHandler} value="usuń" />
      </div>
    </div>
  );
}
