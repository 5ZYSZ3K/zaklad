import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GalleryList() {
  const { REACT_APP_REST_URI } = process.env;
  const [namesArray, setNamesArray] = useState([]);
  useEffect(() => {
    axios
      .get(`${REACT_APP_REST_URI}names`)
      .then((res) => setNamesArray(res.data))
      .catch((err) => console.log);
  }, [setNamesArray, REACT_APP_REST_URI]);
  return (
    <div className="gallerylist">
      <h2>Jakieś śmieszne GalleryList</h2>
      <ul>
        {namesArray.map((name) => (
          <Link key={name} to={`/gallery/${name}`}>
            <li>{name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default GalleryList;
