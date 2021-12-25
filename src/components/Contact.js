import dotenv from "dotenv";
dotenv.config();

function Contact() {
  const { REACT_APP_GOOGLE_MAPS_API } = process.env;
  return (
    <div className="contact">
      <h2>Totally basic contact page</h2>
      <iframe
        title="Mapa"
        width="1000"
        height="500"
        src={`https://www.google.com/maps/embed/v1/place?key=${REACT_APP_GOOGLE_MAPS_API}&q=ML+Kamieniarstwo+Mateusz+Leksan&zoom=12`}
      ></iframe>
    </div>
  );
}

export default Contact;
