import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GalleryList() {
  const [namesArray, setNamesArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3700/images/names")
      .then((res) => setNamesArray(res.data));
  }, [setNamesArray]);
  return (
    <div className="gallerylist">
      <h2>Jakieś śmieszne GalleryList</h2>
      <ul>
        {namesArray.map((name) => (
          <Link to={`/gallery/${name}`}>
            <li key={name}>{name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default GalleryList;
