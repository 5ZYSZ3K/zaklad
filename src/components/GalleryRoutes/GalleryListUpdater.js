import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/Gallery.css";
import ImageGrid from "./ImageGrid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function GalleryListUpdater() {
  const { REACT_APP_REST_URI } = process.env;
  const [namesArray, setNamesArray] = useState([]);
  const params = useParams();
  const dropHandler = (dest, src) => {
    const temp = [...namesArray];
    temp.splice(dest, 0, temp.splice(src, 1)[0]);
    setNamesArray(temp);
  };
  useEffect(() => {
    axios
      .get(`${REACT_APP_REST_URI}categories/${params.name}`)
      .then((res) => setNamesArray(res.data))
      .catch((err) => console.log);
  }, [setNamesArray, REACT_APP_REST_URI, params.name]);
  const saveOrder = () => {
    const data = [];
    namesArray.forEach((name, i) => {
      data.push(name.name);
    });
    axios.post(
      `${REACT_APP_REST_URI}categories/${params.name}/saveorder`,
      data
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <h2>Jakieś śmieszne GalleryListUpdater</h2>
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
    </DndProvider>
  );
}

export default GalleryListUpdater;
