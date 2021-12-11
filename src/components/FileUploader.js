import axios from "axios";
import { useState } from "react";

function FileUploader({ name, path }) {
  const [file, setFile] = useState();
  const fileHandler = (event) => {
    setFile(event.target.files);
  };
  const uploadHandler = () => {
    axios.post(`http://localhost:4000/images/update/${name}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      path,
      name,
      file,
    });
  };
  return (
    <div className="input">
      <input type="file" onChange={fileHandler} />
      <button onClick={uploadHandler}>Wyślij</button>
    </div>
  );
}

export default FileUploader;
