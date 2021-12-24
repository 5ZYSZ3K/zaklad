import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Gallery.css";

function Gallery() {
  const { REACT_APP_REST_URI, PUBLIC_URL, REACT_APP_IMAGES_PATH } = process.env;
  const params = useParams();
  const [urls, setUrls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSrc, setModalSrc] = useState(0);
  const turnOnModal = (index) => {
    setModalVisible(true);
    setModalSrc(index);
  };
  const turnOffModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    axios
      .get(`${REACT_APP_REST_URI}${params.name}`)
      .then((res) => {
        setUrls(res.data);
      })
      .catch((err) => console.log);
  }, [params.name, setUrls, REACT_APP_REST_URI]);
  console.log(process.env);
  return (
    <div className="Gallery">
      <h2>{params.name}</h2>
      <div className="gallery" key={params.name}>
        {urls.map((data, i) => {
          return (
            <div key={data._id}>
              <img
                className="galleryImage"
                src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}/${params.name}/${data.image}`}
                alt={params.name}
                onClick={() => {
                  turnOnModal(i);
                }}
              />
            </div>
          );
        })}
      </div>
      {modalVisible && (
        <div className="overlay">
          <button onClick={turnOffModal} className="close">
            close
          </button>
          {window.innerWidth > 1000 && urls[modalSrc].animation ? (
            <div className="iframe">
              <div>
                <iframe
                  title="3d"
                  src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${params.name}/${urls[modalSrc].animation}`}
                  allowFullScreen
                  frameBorder="0"
                  scrolling="no"
                ></iframe>
              </div>
            </div>
          ) : urls[modalSrc].clip ? (
            <video
              src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${params.name}/BRYLANT II ZU2 GAMAR.124.mp4`}
              type="video/mp4"
              width="750"
              height="500"
              autoPlay
              loop
            ></video>
          ) : (
            <img
              src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}${params.name}/${urls[modalSrc].image}`}
              alt={params.name}
            />
          )}
          <button
            className="arrowLeft"
            onClick={() => {
              setModalSrc(modalSrc === 0 ? urls.length - 1 : modalSrc - 1);
            }}
          >
            poprzedni
          </button>
          <button
            className="arrowRight"
            onClick={() => {
              setModalSrc(modalSrc === urls.length - 1 ? 0 : modalSrc + 1);
            }}
          >
            następny
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
