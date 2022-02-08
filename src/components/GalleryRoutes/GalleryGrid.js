import { useDrag, useDrop } from "react-dnd";
import dotenv from "dotenv";
import DeleteFile from "./DeleteFile";
import "../../styles/Gallery.css";

export default function GalleryGrid({
  path,
  name,
  image,
  id,
  dropHandler,
  updater,
}) {
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
    <div ref={connectDrag}>
      <div ref={connectDrop}>
        <img
          className="galleryImage"
          src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${path}/${image}`}
          alt={name}
        />
        <h2>{name}</h2>
        <DeleteFile name={path} imageID={updater} />
      </div>
    </div>
  );
}
