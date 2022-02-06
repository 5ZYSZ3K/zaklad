import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/About.css";

function About() {
  const { REACT_APP_REST_ABOUT_URI } = process.env;
  const [fields, setFields] = useState([]);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    axios.get(REACT_APP_REST_ABOUT_URI).then((data) => {
      setFields(data.data);
    });
  }, [REACT_APP_REST_ABOUT_URI]);
  const changeHandler = (value, name, i) => {
    const temp = [...fields];
    temp[i][name] = value;
    setFields(temp);
  };
  const arrayOfTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  const clickHandler = (i) => {
    axios
      .post(`${REACT_APP_REST_ABOUT_URI}update`, {
        content: fields[i].content,
        title: fields[i].title,
        _id: fields[i]._id,
      })
      .then(() => {
        if (images[i]) {
          const data = new FormData();
          data.append("files", images[i]);
          axios
            .post(`${REACT_APP_REST_ABOUT_URI}update/${fields[i]._id}`, data)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };
  const filesHandler = (t, i) => {
    const image = t.files[0];
    if (arrayOfTypes.includes(image.type)) {
      setErrorMessage("");
      const imgs = [...images];
      imgs[i] = t.files[0];
      setImages(imgs);
    } else setErrorMessage("Zły typ pliku!");
  };
  return (
    <div className="about">
      {fields.map((field, i) => (
        <div className="field" key={field._id}>
          <img alt="field" src={`assets/${field.image}`} />
          <div>
            <input
              onChange={(e) => {
                changeHandler(e.target.value, "title", i);
              }}
              value={field.title}
            />
            <textarea
              onChange={(e) => {
                changeHandler(e.target.value, "content", i);
              }}
              className="edit"
              value={field.content}
            ></textarea>
            <input
              type="file"
              onChange={(e) => {
                filesHandler(e.target, i);
              }}
            />
            <input
              onClick={() => {
                clickHandler(i);
              }}
              type="button"
              value="Wyślij"
            />
            <p style={{ color: "red" }}>{errorMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;
