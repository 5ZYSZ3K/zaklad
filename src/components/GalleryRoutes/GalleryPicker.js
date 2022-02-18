import dotenv from "dotenv";
import { Link } from "react-router-dom";
import "../../styles/Gallery.css";
dotenv.config();

export default function GalleryPicker() {
  if (document.body.style !== "") document.body.style = "";
  const { REACT_APP_IMAGES_PATH, PUBLIC_URL } = process.env;
  return (
    <div>
      <h1>GALERIE</h1>
      <div className="gallery">
        <Link to={"/kategorie/wybor"} key="kategorie">
          <div>
            <img
              className="galleryImage"
              src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}picker/kategorie.jpg`}
              alt="kategorie"
            />
            <h2>OFERTA</h2>
          </div>
        </Link>
        <Link to={"/kategorie/produkcja"} key="produkcja">
          <div>
            <img
              className="galleryImage"
              src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}picker/produkcja.jpg`}
              alt="produkcja"
            />
            <h2>REALIZACJA</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
