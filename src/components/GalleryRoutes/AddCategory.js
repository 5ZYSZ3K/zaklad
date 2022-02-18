import axios from "axios";
import { useState } from "react";
import { v4 } from "uuid";

function AddCategory({ category }) {
  let id = v4();
  const [files, setFiles] = useState({ image: null, clip: null });
  const [name, setname] = useState("");
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
      setMessage({
        type: false,
        message: "Zły typ pliku!",
      });
      event.target.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        event.target.type = "";
        event.target.type = "file";
      }
    }
  };
  const nameHandler = (event) => {
    setname(event.target.value);
  };
  const { REACT_APP_REST_URI } = process.env;
  const uploadHandler = (e) => {
    e.preventDefault();
    if (name && files.image) {
      const data = new FormData();
      data.append("files", files.image);
      data.append("files", files.clip);
      if (files.clip) id = `t${id}`;
      else id = `n${id}`;
      axios
        .post(
          `${REACT_APP_REST_URI}categories/add/${category}/${name}/${id}/true`,
          data
        )
        .then(() => {
          setMessage({
            type: true,
            message: "Pomyślnie dodano!",
          });
        })
        .catch((e) => {
          setMessage({
            type: false,
            message: "Błąd serwera!",
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
    <form
      className="form"
      onSubmit={uploadHandler}
      encType="multipart/form-data"
    >
      {message.message && (
        <p style={{ fontWeight: 700, color: message.type ? "green" : "red" }}>
          {message.message}
        </p>
      )}
      Nazwa:
      <input onChange={nameHandler} />
      <br />
      Pierwsze zdjęcie:
      <input name="image" type="file" onChange={imageFileHandler} /> <br />
      Pierwszy film:
      <input name="image" type="file" onChange={clipFileHandler} /> <br />
      <input type="submit" value="Wyślij" />
    </form>
  );
}

export default AddCategory;
