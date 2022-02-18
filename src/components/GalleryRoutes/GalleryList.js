import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/Gallery.css";

function GalleryList() {
  if (document.body.style !== "") document.body.style = "";
  const { REACT_APP_REST_URI, PUBLIC_URL, REACT_APP_IMAGES_PATH } = process.env;
  const [namesArray, setNamesArray] = useState([]);
  const params = useParams();
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${REACT_APP_REST_URI}categories/${params.name}`, {
        cancelToken: source.token,
      })
      .then((res) => setNamesArray(res.data))
      .catch(() => setNamesArray([]));
    return () => source.cancel();
  }, [setNamesArray, REACT_APP_REST_URI, params.name]);
  return (
    <div>
      <h1>NAGROBKI {params.name.toUpperCase()}</h1>
      <div className="gallery">
        {namesArray.map(
          (data) =>
            data && (
              <Link
                to={`/kategorie/${params.name}/${data.name}`}
                key={data.name}
              >
                <div>
                  <img
                    className="galleryImage"
                    src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${params.name}/${data.name}/${data.image}`}
                    alt={data.name}
                  />
                  <h2>{data.name.toUpperCase()}</h2>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default GalleryList;
