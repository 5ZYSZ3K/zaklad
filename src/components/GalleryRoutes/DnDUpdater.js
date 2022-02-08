import { useDrag, useDrop } from "react-dnd";
import dotenv from "dotenv";
import "../../styles/Gallery.css";
import { useState } from "react";
import axios from "axios";

export default function ImageGrid({
  updater,
  path,
  name,
  image,
  id,
  dropHandler,
}) {
  dotenv.config();
  const { PUBLIC_URL, REACT_APP_IMAGES_PATH, REACT_APP_REST_PRODUCTION_URI } =
    process.env;
  const [title, setTitle] = useState("");
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
  const submitHandler = () => {
    axios
      .post(`${REACT_APP_REST_PRODUCTION_URI}update`, { _id: updater, title })
      .then(console.log)
      .catch(console.log);
  };
  const deleteHandler = () => {
    axios
      .post(`${REACT_APP_REST_PRODUCTION_URI}delete`, { _id: updater })
      .then(console.log)
      .catch(console.log);
  };
  return (
    <div ref={connectDrag}>
      <div ref={connectDrop}>
        <img
          className="galleryImage"
          src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${path}/${image}`}
          alt={name}
        />
        <h2>{name}</h2>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input type="submit" onClick={submitHandler} value="zmień nazwę" />
        <input type="submit" onClick={deleteHandler} value="usuń" />
      </div>
    </div>
  );
}
