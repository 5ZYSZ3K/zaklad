import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Gallery.css";
import FileUploader from "./FileUploader";

function Gallery() {
  const params = useParams();
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/images/${params.name}`)
      .then((res) => setUrls(res.data))
      .catch((err) => console.log);
  }, [params.name, setUrls]);
  return (
    <div className="Gallery">
      <h2>{params.name}</h2>
      <div className="gallery" key={`gallery${params.name}1`}>
        {urls.map((data, i) => {
          return (
            <img
              src={process.env.PUBLIC_URL + data}
              key={`${params.name}img${i}`}
              alt={params.name}
            />
          );
        })}
      </div>
      <FileUploader
        name={params.name}
        path={urls[0]?.split("/").slice(0, -1).join("/") || ""}
      />
    </div>
  );
}

export default Gallery;
