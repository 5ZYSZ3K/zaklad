import axios from "axios";
import { useState } from "react";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

function FileUploader({ name }) {
  let id = v4();
  const params = useParams();
  const [files, setFiles] = useState({ image: null, clip: null });
  const [message, setMessage] = useState({});
  const arrayOfTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  const imageFileHandler = (event) => {
    const image = event.target.files[0];
    if (arrayOfTypes.includes(image.type)) {
      setMessage({
        type: true,
        message: "",
      });
      setFiles({ ...files, image });
    } else {
      setMessage({
        type: false,
        message: "Zły typ pliku!",
      });
      event.target.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        event.target = "";
        event.target = "file";
      }
    }
  };
  const clipFileHandler = (event) => {
    const clip = event.target.files[0];
    if (clip.type === "video/mp4") {
      setMessage({
        type: true,
        message: "",
      });
      setFiles({ ...files, clip });
    } else {
      setMessage("Zły typ pliku!");
      event.target.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        event.target.type = "";
        event.target.type = "file";
      }
    }
  };
  const { REACT_APP_REST_URI } = process.env;
  const uploadHandler = () => {
    if (files.image) {
      const data = new FormData();
      data.append("files", files.image);
      data.append("files", files.clip);
      if (files.clip) id = `t${id}`;
      else id = `n${id}`;
      axios
        .post(
          `${REACT_APP_REST_URI}update/${params.category}/${name}/${id}`,
          data
        )
        .then(() => {
          setMessage({
            type: true,
            message: "Pomyślnie zaktualizowano!",
          });
        })
        .catch(() => {
          setMessage({
            type: false,
            message: "Błąd serwera, skontaktuj się z Administratorem!",
          });
        });
    } else {
      setMessage({
        type: false,
        message: "Uzupełnij nazwę i dodaj zdjęcie!",
      });
    }
  };
  return (
    <div className="form">
      Zdjęcie:
      <input name="image" type="file" onChange={imageFileHandler} /> <br />
      Film:
      <input name="image" type="file" onChange={clipFileHandler} /> <br />
      {message.message && (
        <p
          style={{ fontWeight: 700, color: message.type ? "green" : "red" }}
        ></p>
      )}
      <button onClick={uploadHandler}>Wyślij</button>
    </div>
  );
}

export default FileUploader;
