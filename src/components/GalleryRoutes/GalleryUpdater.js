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
  const [message, setMessage] = useState({});
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${REACT_APP_REST_URI}${params.category}/${params.name}`, { cancelToken: source.token })
      .then((res) => setUrls(res.data))
      .catch(() => setUrls([]));
    return () => source.cancel();
  }, [params.name, setUrls, REACT_APP_REST_URI]);
  const dropHandler = (dest, src) => {
    const temp = [...urls];
    temp.splice(dest, 0, temp.splice(src, 1)[0]);
    setUrls(temp);
  };
  const saveOrder = () => {
    axios
      .post(`${REACT_APP_REST_URI}saveorder/${params.category}/${params.name}`, {
        data: { urls },
      })
      .then(() => {
        setMessage({
          type: true,
          message: "Pomyślnie zaktualizowano!",
        });
      })
      .catch(() => {
        setMessage({
          type: false,
          message: "Błąd bazy danych, skontaktuj się z administratorem!",
        });
      });
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <h1>{params.name.toUpperCase()}</h1>
      {message.message && (
        <p style={{ fontWeight: 700, color: message.type ? "green" : "red" }}>
          {message.message}
        </p>
      )}
      <div className="gallery">
        {urls.map((data, i) => (
          <GalleryGrid
            key={data._id}
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
