import { useDrag, useDrop } from "react-dnd";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
import "../../styles/Gallery.css";

export default function ImageGrid({ name, image, id, dropHandler }) {
  dotenv.config();
  const { PUBLIC_URL, REACT_APP_IMAGES_PATH } = process.env;
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
  return (
    <Link to={`/kategorie/galerie/${name}`} ref={connectDrop}>
      <div ref={connectDrag}>
        <img
          className="galleryImage"
          src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${name}/${image}`}
          alt={name}
        />
        <h2>{name}</h2>
      </div>
    </Link>
  );
}
