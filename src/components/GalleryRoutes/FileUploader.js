import axios from "axios";
import { useState } from "react";
import { v4 } from "uuid";

function FileUploader({ name }) {
  let id = v4();
  const [files, setFiles] = useState({ image: null, clip: null });
  const [imageName, setImageName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const arrayOfTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  const imageFileHandler = (event) => {
    const image = event.target.files[0];
    if (arrayOfTypes.includes(image.type)) {
      setErrorMessage("");
      setFiles({ ...files, image });
    } else {
      setErrorMessage("Zły typ pliku!");
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
      setErrorMessage("");
      setFiles({ ...files, clip });
    } else {
      setErrorMessage("Zły typ pliku!");
      event.target.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        event.target.type = "";
        event.target.type = "file";
      }
    }
  };
  const nameHandler = (event) => {
    setImageName(event.target.value);
  };
  const { REACT_APP_REST_URI } = process.env;
  const uploadHandler = () => {
    if (imageName && files.image) {
      const data = new FormData();
      data.append("files", files.image);
      data.append("files", files.clip);
      if (files.clip) id = `t${id}`;
      else id = `n${id}`;
      axios
        .post(`${REACT_APP_REST_URI}update/${name}/${id}/${imageName}`, data)
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          setErrorMessage("Serwer nie działa");
        });
    } else setErrorMessage("Uzupełnij nazwę i dodaj zdjęcie!");
  };
  return (
    <div className="form">
      Nazwa:
      <input onChange={nameHandler} />
      <br />
      Zdjęcie:
      <input name="image" type="file" onChange={imageFileHandler} /> <br />
      Film:
      <input name="image" type="file" onChange={clipFileHandler} /> <br />
      <div>{errorMessage}</div>
      <button onClick={uploadHandler}>Wyślij</button>
    </div>
  );
}

export default FileUploader;
