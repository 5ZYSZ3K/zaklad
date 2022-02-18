import { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { Link } from "react-router-dom";
import "../../styles/Gallery.css";
dotenv.config();

export default function GalleriesList() {
  if (document.body.style !== "") document.body.style = "";
  const { REACT_APP_REST_URI, REACT_APP_IMAGES_PATH, PUBLIC_URL } = process.env;
  const [listOfObjects, setListOfObjects] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${REACT_APP_REST_URI}categories`, { cancelToken: source.token })
      .then((data) => setListOfObjects(data.data))
      .catch(() => {
        setListOfObjects([]);
      });
    return () => source.cancel();
  }, [REACT_APP_REST_URI]);
  return (
    <div>
      <h1>RODZAJE NAGROBKÓW</h1>
      <div className="gallery">
        {listOfObjects.map((data) => (
          <Link to={`/kategorie/${data.category}`} key={data.category}>
            <div>
              <img
                className="galleryImage"
                src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${data.image}`}
                alt={data.category}
              />
              <h2>{data.category.toUpperCase()}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
