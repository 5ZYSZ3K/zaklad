import dotenv from "dotenv";
import "../styles/Contact.css";
dotenv.config();

function Contact() {
  const { REACT_APP_GOOGLE_MAPS_API } = process.env;
  return (
    <div className="contact">
      <div className="contactInfo">
        <div className="content">
          <h2>Jakaś notka</h2>
          <p>Lorem ipsum</p>
        </div>
        <div className="content">
          <img src="assets/location.svg" alt="location" />
          <div>
            Cieniawa 420
            <br /> 33-333
          </div>
        </div>
        <div className="content">
          <img src="assets/phone.svg" alt="phone" />
          <div>606 317 893</div>
        </div>
        <div className="content">
          <img src="assets/mail.svg" alt="@" />
          <div>mateuszleksan@onet.pl</div>
        </div>
      </div>
      <div className="map">
        <iframe
          title="Mapa"
          src={`https://www.google.com/maps/embed/v1/place?key=${REACT_APP_GOOGLE_MAPS_API}&q=ML+Kamieniarstwo+Mateusz+Leksan&zoom=12&language=pl`}
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
