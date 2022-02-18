import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Gallery.css";

function Gallery() {
  const { REACT_APP_REST_PRODUCTION_URI, PUBLIC_URL, REACT_APP_IMAGES_PATH } =
    process.env;
  const [urls, setUrls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSrc, setModalSrc] = useState(0);
  const turnOnModal = (index) => {
    setModalVisible(true);
    setModalSrc(index);
    document.body.style = "overflow:hidden";
  };
  const turnOffModal = () => {
    setModalVisible(false);
    document.body.style = "";
  };
  useEffect(() => {
    document.body.style = "";
    const source = axios.CancelToken.source();
    axios
      .get(REACT_APP_REST_PRODUCTION_URI, { cancelToken: source.token })
      .then((res) => {
        setUrls(res.data);
        if (!res.data.length)
          setUrls([{ image: "mocked.jpg", title: "zdjęcie 1", _id: 1 }]);
      })
      .catch(() => {
        if (!urls.length)
          setUrls([{ image: "mocked.jpg", title: "zdjęcie 1", _id: 1 }]);
      });
    return () => source.cancel();
  }, [setUrls, REACT_APP_REST_PRODUCTION_URI]);
  return (
    <div>
      <h1>REALIZACJA</h1>
      <div className="gallery">
        {urls.map((data, i) => {
          return (
            <div key={data._id} className="imageContainer">
              <div>
                <img
                  className="galleryImage"
                  src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}production/${data.image}`}
                  alt={data.title}
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
          <img
            className="modalImage"
            src={`${PUBLIC_URL}${REACT_APP_IMAGES_PATH}production/${urls[modalSrc].image}`}
            alt={urls[modalSrc].title}
          />
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
