import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Gallery.css";
import DeleteFile from "./DeleteFile";
import FileUploader from "./FileUploader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function GalleryUpdater() {
  const params = useParams();
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/images/${params.name}`)
      .then((res) => setUrls(res.data))
      .catch((err) => console.log);
  }, [params.name, setUrls]);
  const saveOrder = () => {
    axios
      .post(`http://localhost:4000/images/saveorder/${params.name}`, {
        data: { urls },
      })
      .then(console.log)
      .catch(console.log);
  };
  return (
    <div className="Gallery">
      <h2>{params.name}</h2>
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
              key={`gallery${params.name}1`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {urls.map((data, i) => (
                <Draggable
                  key={`${params.name}img${i}`}
                  draggableId={`draggable-${params.name}img${i}`}
                  index={i}
                >
                  {(provided, snapshot) => (
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
                        src={process.env.PUBLIC_URL + data}
                        alt={params.name}
                      />
                      <DeleteFile name={params.name} path={data} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <FileUploader
        name={params.name}
        path={urls[0]?.split("/").slice(0, -1).join("/") || ""}
      />
      <button onClick={saveOrder}>Zapisz kolejność</button>
    </div>
  );
}

export default GalleryUpdater;
