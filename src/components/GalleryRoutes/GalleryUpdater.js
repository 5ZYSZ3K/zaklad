import axios from "axios";
import { useEffect, useState } from "react";
import GalleryGrid from "./GalleryGrid";
import { useParams } from "react-router-dom";
import "../../styles/Gallery.css";
import FileUploader from "./FileUploader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function GalleryUpdater() {
  const { REACT_APP_REST_URI } = process.env;
  const params = useParams();
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    axios
      .get(`${REACT_APP_REST_URI}${params.name}`)
      .then((res) => setUrls(res.data))
      .catch((err) => console.log);
  }, [params.name, setUrls, REACT_APP_REST_URI]);
  const dropHandler = (dest, src) => {
    const temp = [...urls];
    temp.splice(dest, 0, temp.splice(src, 1)[0]);
    setUrls(temp);
  };
  const saveOrder = () => {
    axios
      .post(`${REACT_APP_REST_URI}saveorder/${params.name}`, {
        data: { urls },
      })
      .then(console.log)
      .catch(console.log);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <h1>{params.name.toUpperCase()}</h1>
      <div className="gallery">
        {urls.map((data, i) => (
          <GalleryGrid
            key={data._id}
            name={data.name}
            path={params.name}
            id={i}
            dropHandler={dropHandler}
            image={data.image}
            updater={data._id}
          />
        ))}
      </div>
      <br />
      <FileUploader name={params.name} />
      <button onClick={saveOrder}>Zapisz kolejność</button>
    </DndProvider>
  );
}

export default GalleryUpdater;
