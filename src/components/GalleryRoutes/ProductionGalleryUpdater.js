import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Gallery.css";
import ImageGrid from "./DnDUpdater";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function ProductionGalleryUpdater() {
  const { REACT_APP_REST_PRODUCTION_URI } = process.env;
  const [namesArray, setNamesArray] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({});
  const arrayOfTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  const dropHandler = (dest, src) => {
    const temp = [...namesArray];
    temp.splice(dest, 0, temp.splice(src, 1)[0]);
    setNamesArray(temp);
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(REACT_APP_REST_PRODUCTION_URI, { cancelToken: source.token })
      .then((res) => {
        setNamesArray(res.data);
        setMessage({
          message: "",
          type: false,
        });
      })
      .catch(() => {
        setMessage({
          message: "Krytyczny błąd serwera!",
          type: false,
        });
      });
    return () => source.cancel();
  }, [setNamesArray, REACT_APP_REST_PRODUCTION_URI]);
  const saveOrder = () => {
    const data = [];
    namesArray.forEach((name, i) => {
      data.push(name._id);
    });
    axios
      .post(`${REACT_APP_REST_PRODUCTION_URI}saveorder`, data)
      .then(() => {
        setMessage({
          message: "Pomyślnie zaktualizowano!",
          type: true,
        });
      })
      .catch(() => {
        setMessage({
          message: "Błąd serwera!",
          type: false,
        });
      });
  };
  const fileHandler = (e) => {
    const image = e.target.files[0];
    if (arrayOfTypes.includes(image.type)) {
      setMessage({
        type: false,
        message: "",
      });
      setFile(image);
    } else {
      setMessage({
        type: false,
        message: "Zły typ pliku!",
      });
      e.target.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        e.target.type = "";
        e.target.type = "file";
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    axios
      .post(`${REACT_APP_REST_PRODUCTION_URI}add/${namesArray.length}`, data)
      .then(() => {
        setMessage({
          type: true,
          message: "Pomyślnie wysłano!",
        });
      })
      .catch(() => {
        setMessage({
          type: false,
          message: "Błąd serwera!",
        });
      });
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <h2>REALIZACJA - AKTUALIZOWANIE</h2>
      {message.message && (
        <p style={{ fontWeight: 700, color: message.type ? "green" : "red" }}>
          {message.message}
        </p>
      )}
      <div className="gallery">
        {namesArray.map((data, id) => {
          return (
            data && (
              <ImageGrid
                key={id}
                path="production"
                id={id}
                dropHandler={dropHandler}
                image={data.image}
                updater={data._id}
              />
            )
          );
        })}
      </div>
      <button onClick={saveOrder}>Zapisz kolejność</button>
      <form onSubmit={submitHandler}>
        <input type="file" onChange={fileHandler} />
        <input type="submit" value="dodaj" />
      </form>
    </DndProvider>
  );
}

export default ProductionGalleryUpdater;
