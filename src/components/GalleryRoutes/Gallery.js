import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/Gallery.css";

function Gallery() {
  const { REACT_APP_REST_URI, PUBLIC_URL, REACT_APP_IMAGES_PATH } = process.env;
  const params = useParams();
  const [urls, setUrls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSrc, setModalSrc] = useState(0);
  const turnOnModal = (index) => {
    setModalVisible(true);
    setModalSrc(index);
    if (/safari/i.test(navigator.userAgent)) {
      document.body.style = "overflow:hidden";
    } else {
      document.body.style = "-webkit-overflow-scrolling: touch";
    }
  };
  const turnOffModal = () => {
    setModalVisible(false);
    document.body.style = "";
  };
  useEffect(() => {
    document.body.style = "";
    const source = axios.CancelToken.source();
    axios
      .get(`${REACT_APP_REST_URI}${params.category}/${params.name}`, { cancelToken: source.token })
      .then((res) => {
        setUrls(res.data);
      })
      .catch(() => {
        setUrls([]);
      });
    return () => source.cancel();
  }, [params.name, params.category, setUrls, REACT_APP_REST_URI]);
  return (
    <div>
      <h1>{params.name.toUpperCase()}</h1>
      <div className="gallery" key={params.name}>
        {urls.map((data, i) => {
          return (
            <div key={data._id} className="imageContainer">
              <div>
                <img
                  className="galleryImage"
                  src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}/${params.category}/${params.name}/${data.image}`}
                  alt={params.name}
                  onClick={() => {
                    turnOnModal(i);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {modalVisible && (
        <div
          className="overlay"
          onClick={(e) => {
            if (e.target.tagName === "DIV") turnOffModal();
          }}
        >
          <div onClick={turnOffModal} className="close">
            <span></span>
            <span></span>
          </div>
          {window.innerWidth > 1000 && urls[modalSrc].animation ? (
            <div className="iframe">
              <div>
                <iframe
                  title="3d"
                  src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}/${params.category}/${params.name}/${urls[modalSrc].animation}`}
                  allowFullScreen
                  frameBorder="0"
                  scrolling="no"
                ></iframe>
              </div>
            </div>
          ) : urls[modalSrc].clip ? (
            <video
              src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}/${params.category}/${params.name}/${urls[modalSrc].clip}`}
              type="video/mp4"
              width="750"
              height="500"
              autoPlay
              loop
            ></video>
          ) : (
            <img
              className="modalImage"
              src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}/${params.category}/${params.name}/${urls[modalSrc].image}`}
              alt={params.name}
            />
          )}
          <img
            src="/assets/arrow.svg"
            alt="arrow-left"
            className="arrowLeft"
            onClick={() => {
              setModalSrc(modalSrc === 0 ? urls.length - 1 : modalSrc - 1);
            }}
          />
          <img
            src="/assets/arrow.svg"
            alt="arrow-right"
            className="arrowRight"
            onClick={() => {
              setModalSrc(modalSrc === urls.length - 1 ? 0 : modalSrc + 1);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Gallery;
