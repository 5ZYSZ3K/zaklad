import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Grid.css";

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
      <h2>Jakieś śmieszne GalleryList</h2>
      <div className="grid">
        {namesArray.map((data) => (
          <div key={data.name} className="gridItemWrapper">
            <div className="gridImage">
              <Link to={`/galerie/${data.name}`}>
                <img
                  src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${data.name}/${data.image}`}
                  alt={data.name}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryList;
