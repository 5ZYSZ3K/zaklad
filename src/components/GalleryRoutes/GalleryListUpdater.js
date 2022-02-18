import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/Gallery.css";
import ImageGrid from "./ImageGrid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddCategory from "./AddCategory";

function GalleryListUpdater() {
  const { REACT_APP_REST_URI } = process.env;
  const [namesArray, setNamesArray] = useState([]);
  const [message, setMessage] = useState({});
  const params = useParams();
  const dropHandler = (dest, src) => {
    const temp = [...namesArray];
    temp.splice(dest, 0, temp.splice(src, 1)[0]);
    setNamesArray(temp);
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${REACT_APP_REST_URI}categories/${params.name}`, {
        cancelToken: source.token,
      })
      .then((res) => setNamesArray(res.data))
      .catch(() => {
        setMessage({
          type: false,
          message: "Krytyczny wewnętrzny błąd serwera!",
        });
      });
    return () => source.cancel();
  }, [setNamesArray, REACT_APP_REST_URI, params.name]);
  const saveOrder = () => {
    const data = [];
    namesArray.forEach((name) => {
      data.push(name.name);
    });
    axios
      .post(`${REACT_APP_REST_URI}categories/${params.name}/saveorder`, data)
      .then(() => {
        setMessage({
          type: true,
          message: "Pomyślnie zaktualizowano!",
        });
      })
      .catch(() => {
        setMessage({
          type: false,
          message: "Wewnętrzny błąd serwera!",
        });
      });
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <h2>LISTA GALERII - AKTUALIZOWANIE</h2>
      {message.message && (
        <p style={{ fontWeight: 700, color: message.type ? "green" : "red" }}>
          {message.message}
        </p>
      )}
      <div className="gallery">
        {namesArray.map(
          (data, id) =>
            data && (
              <ImageGrid
                key={data.name}
                name={data.name}
                id={id}
                dropHandler={dropHandler}
                image={data.image}
              />
            )
        )}
      </div>
      <button onClick={saveOrder}>Zapisz kolejność</button>
      <AddCategory category={params.name} />
    </DndProvider>
  );
}

export default GalleryListUpdater;
