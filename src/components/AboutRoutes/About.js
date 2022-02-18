import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/About.css";

function About() {
  if (document.body.style !== "") document.body.style = "";
  const { REACT_APP_REST_ABOUT_URI, REACT_APP_IMAGES_PATH } = process.env;
  const [fields, setFields] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(REACT_APP_REST_ABOUT_URI, { cancelToken: source.token })
      .then((data) => {
        setFields(data.data);
      })
      .catch(() => {
        setFields([
          {
            _id: "1",
            title: "Profesjonalne usługi Kamieniarskie",
            content:[
              "Jesteśmy prężnie rozwijającą się firmą.",
              "Jako jedyni (!) posiadamy licencję na powiat nowosądecki na wybrane modele (nagrobki pojedyncze, podwójne, urnowe) firmy projektowej Gamarstone. Są to wzory zastrzeżone, nowoczesne, cieszące się wyskoim zainteresowaniem. "
            ],
              image: "license.png",
          },
          {
            _id: "2",
            title: "Oferta",
            content:[
              "Nasz zespół zapewni Ci szeroki wybór opcji",
              "Oferujemy: nagrobki, grobowce, 'piwnice' nagrobkowe, tabliczki nagrobne (szkło, granit, PCW), galanteria nagrobkowa (krzyże, zdjęcia, wazony, itp.) Parapety, Schody, Blaty i wiele więcej",
            ],
              image: "ML.svg",
          },
          {
            _id: "3",
            title: "Krajowe Konsorcjum Nagrobkowe",
            content:[
              "Jesteśmy zrzeszeni w Krajowym Konsorcjum Nagrobkowym które ma na celu dobro i rozwój każdego członka, którego członkowie wybrali z pośród wielu wzorów najlepszą galanterię klasyków.",
            ],
            image: "KKN.png",
          },
        ]);
      });
    return () => source.cancel();
  }, [REACT_APP_REST_ABOUT_URI]);
  return (
    <div className="about">
      {fields.map((field, i) =>
        i % 2 === 1 ? (
          <div className="field" key={field._id}>
            <img alt="field" src={`${REACT_APP_IMAGES_PATH}${field.image}`} />
            <div>
              <h2>{field.title}</h2>
              {field.content.map((t,i) => <p key={i}>{t}</p>)}
            </div>
          </div>
        ) : (
          <div className="field" key={field._id}>
            <div>
              <h2>{field.title}</h2>
              {field.content.map((t,i) => <p key={i}>{t}</p>)}
            </div>
            <img alt="field" src={`${REACT_APP_IMAGES_PATH}${field.image}`} />
          </div>
        )
      )}
    </div>
  );
}

export default About;
