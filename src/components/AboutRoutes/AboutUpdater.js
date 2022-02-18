import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/About.css";

function About() {
  const { REACT_APP_REST_ABOUT_URI, REACT_APP_IMAGES_PATH } = process.env;
  const [fields, setFields] = useState([]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState({});
  useEffect(() => {
    axios
      .get(REACT_APP_REST_ABOUT_URI)
      .then((data) => {
        const temp = data.data.map(field => {
          return {
            ...field, content: field.content.join("<br/>")
          }
        })
        setFields(temp);
      })
      .catch(() => {
        setMessage({
          type: false,
          message: "Krytyczny wewnętrzny błąd serwera, skontaktuj się z Administratorem!"
        });
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
        content: fields[i].content.split("<br/>"),
        title: fields[i].title,
        _id: fields[i]._id,
      })
      .then(() => {
        if (images[i]) {
          const data = new FormData();
          data.append("files", images[i]);
          axios
            .post(`${REACT_APP_REST_ABOUT_URI}update/${fields[i]._id}`, data)
            .then(() => {
              setMessage({
                type: true,
                message: "Pomyślnie wysłano!"
              });
            })
            .catch(() => {
              setMessage({
                type: false,
                message: "Wewnętrzny błąd serwera, skontaktuj się z Administratorem!"
              });
            });
        }
        else setMessage({
          type: true,
          message: "Pomyślnie wysłano!"
        });
      })
      .catch(() => {
        setMessage({
          type: false,
          message: "Wewnętrzny błąd serwera, skontaktuj się z Administratorem!"
        });
      });
  };
  const filesHandler = (t, i) => {
    const image = t.files[0];
    if (arrayOfTypes.includes(image.type)) {
      setMessage({
        type: true,
        message: ""
      });
      const imgs = [...images];
      imgs[i] = t.files[0];
      setImages(imgs);
    } else {
      setMessage({type:false, message:"Zły typ pliku!"});
      t.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        t.type = "";
        t.type = "file";
      }
    }
  };
  return (
    <div className="about">
      {fields.map((field, i) => (
        <div className="field" key={field._id}>
          <img alt="field" src={`${REACT_APP_IMAGES_PATH}${field.image}`} />
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
              onClick={(e) => {
                clickHandler(i);
              }}
              type="button"
              value="Wyślij"
            />
            {message.message && <p style={{ color: message.type?"green":"red", fontWeight: 700 }}>{message.message}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;
