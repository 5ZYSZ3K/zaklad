import "./Gallery.css";
import images from "./images.json";

function Gallery() {
  return (
    <div className="Gallery">
      <h2>Alpina</h2>
      <div className="gallery" key="gallery1">
        {images.alpina.map((data, i) => {
          return (
            <img
              src={process.env.PUBLIC_URL + data}
              key={`alpinaimg${i}`}
              alt="alpina"
            />
          );
        })}
      </div>
      <h2>Arkada</h2>
      <div className="gallery" key="gallery2">
        {images.ARKADA.map((data, i) => {
          return (
            <img
              src={process.env.PUBLIC_URL + data}
              key={`alpinaimg${i}`}
              alt="arkada"
            />
          );
        })}
      </div>
      <h2>Astra</h2>
      <div className="gallery" key="gallery3">
        {images.ASTRA.map((data, i) => {
          return (
            <img
              src={process.env.PUBLIC_URL + data}
              key={`alpinaimg${i}`}
              alt="astra"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
