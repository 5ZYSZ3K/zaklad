import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Gallery.css";
import ImageGrid from "./DnDUpdater";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function ProductionGalleryUpdater() {
  const { REACT_APP_REST_PRODUCTION_URI } = process.env;
  const [namesArray, setNamesArray] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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
    axios
      .get(REACT_APP_REST_PRODUCTION_URI)
      .then((res) => {
        setNamesArray(res.data);
      })
      .catch((err) => console.log);
  }, [setNamesArray, REACT_APP_REST_PRODUCTION_URI]);
  const saveOrder = () => {
    const data = [];
    namesArray.forEach((name, i) => {
      data.push(name._id);
    });
    axios
      .post(`${REACT_APP_REST_PRODUCTION_URI}saveorder`, data)
      .then(console.log)
      .catch(console.log);
  };
  const fileHandler = (e) => {
    const image = e.target.files[0];
    if (arrayOfTypes.includes(image.type)) {
      setErrorMessage("");
      setFile(image);
    } else {
      setErrorMessage("Zły typ pliku!");
      e.target.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        e.target.type = "";
        e.target.type = "file";
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${REACT_APP_REST_PRODUCTION_URI}add`, {
        title,
        order: namesArray.length,
      })
      .then((id) => {
        const data = new FormData();
        data.append("file", file);
        axios
          .post(`${REACT_APP_REST_PRODUCTION_URI}update/${id.data}`, data)
          .catch(() => {
            setErrorMessage("Błąd serwera!");
          });
      })
      .catch(() => {
        setErrorMessage("Błąd serwera!");
      });
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <h2>Produkcja - updater</h2>
      <div className="gallery">
        {namesArray.map((data, id) => {
          return (
            data && (
              <ImageGrid
                key={id}
                name={data.title}
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
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input type="submit" value="dodaj" />
      </form>
      <p>{errorMessage}</p>
    </DndProvider>
  );
}

export default ProductionGalleryUpdater;
