import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/Gallery.css";

function GalleryList() {
  const { REACT_APP_REST_URI, PUBLIC_URL, REACT_APP_IMAGES_PATH } = process.env;
  const [namesArray, setNamesArray] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`${REACT_APP_REST_URI}categories/${params.name}`)
      .then((res) => setNamesArray(res.data))
      .catch((err) => console.log);
  }, [setNamesArray, REACT_APP_REST_URI, params.name]);
  return (
    <div>
      <h1>Nagrobki {params.name}</h1>
      <div className="gallery">
        {namesArray.map(
          (data, id) =>
            data && (
              <Link to={`/kategorie/galerie/${data.name}`} key={data.name}>
                <div>
                  <img
                    className="galleryImage"
                    src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${data.name}/${data.image}`}
                    alt={data.name}
                  />
                  <h2>{data.name}</h2>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default GalleryList;
