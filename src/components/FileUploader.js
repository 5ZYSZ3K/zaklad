import axios from "axios";
import { useState } from "react";

function FileUploader({ name }) {
  const [file, setFile] = useState(null);
  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };
  const uploadHandler = () => {
    const data = new FormData();
    data.append("image", file);
    axios
      .post(`http://localhost:4000/images/update/${name}`, data)
      .then((req, res) => {
        console.log("Succesfull!");
      })
      .catch((err) => console.log);
  };
  return (
    <div className="input">
      <input name="image" type="file" onChange={fileHandler} />
      <button onClick={uploadHandler}>Wyślij</button>
    </div>
  );
}

export default FileUploader;
