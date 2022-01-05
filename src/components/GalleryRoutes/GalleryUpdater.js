import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/Gallery.css";
import DeleteFile from "./DeleteFile";
import FileUploader from "./FileUploader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function GalleryUpdater() {
  const { REACT_APP_REST_URI, REACT_APP_IMAGES_PATH, PUBLIC_URL } = process.env;
  const params = useParams();
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    axios
      .get(`${REACT_APP_REST_URI}${params.name}`)
      .then((res) => setUrls(res.data))
      .catch((err) => console.log);
  }, [params.name, setUrls, REACT_APP_REST_URI]);
  const saveOrder = () => {
    axios
      .post(`${REACT_APP_REST_URI}saveorder/${params.name}`, {
        data: { urls },
      })
      .then(console.log)
      .catch(console.log);
  };
  return (
    <div className="Gallery">
      <h1>{params.name.toUpperCase()}</h1>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          const dest = destination.index;
          const src = source.index;
          const temp = [...urls];
          temp.splice(dest, 0, temp.splice(src, 1)[0]);
          setUrls(temp);
        }}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="gallery"
              key={params.name}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {urls.map((data, i) => (
                <Draggable
                  key={data._id}
                  draggableId={`draggable-${data._id}`}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <div style={{ display: "inline-block" }}>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 2rem #666"
                            : "none",
                        }}
                      >
                        <img
                          className="galleryImage"
                          src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${params.name}/${data.image}`}
                          alt={params.name}
                        />
                        <h2>{data.name}</h2>
                        <DeleteFile name={params.name} imageID={data._id} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <br />
      <FileUploader name={params.name} />
      <button onClick={saveOrder}>Zapisz kolejność</button>
    </div>
  );
}

export default GalleryUpdater;
