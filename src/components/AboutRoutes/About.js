import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/About.css";

function About() {
  const { REACT_APP_REST_ABOUT_URI } = process.env;
  const [fields, setFields] = useState([]);
  useEffect(() => {
    axios.get(REACT_APP_REST_ABOUT_URI).then((data) => {
      setFields(data.data);
    });
  }, [REACT_APP_REST_ABOUT_URI]);
  return (
    <div className="about">
      {fields.map((field, i) =>
        i % 2 === 1 ? (
          <div className="field" key={field._id}>
            <img alt="field" src={`assets/${field.image}`} />
            <div>
              <h2>{field.title}</h2>
              <p>{field.content}</p>
            </div>
          </div>
        ) : (
          <div className="field" key={field._id}>
            <div>
              <h2>{field.title}</h2>
              <p>{field.content}</p>
            </div>
            <img alt="field" src={`assets/${field.image}`} />
          </div>
        )
      )}
    </div>
  );
}

export default About;
