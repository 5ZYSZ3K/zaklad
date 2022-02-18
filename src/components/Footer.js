import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <img src="/assets/mail.svg" alt="@" />
        <span>&nbsp;&nbsp;mateuszleksan@onet.pl</span>
      </div>
      <div>
        <img src="/assets/location.svg" alt="location" />
        <span>&nbsp;Cieniawa 420, 33-333</span>
      </div>
      <div>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.facebook.com/ML-Kamieniarstwo-Nowy-Sącz-107757028410610/"
        >
          <img src="/assets/facebook.svg" alt="@" />
          <span>&nbsp;&nbsp;ML Kamieniarstwo</span>
        </a>
      </div>
      <div>
        <img src="/assets/phone.svg" alt="location" />
        <span>&nbsp;606 317 893</span>
      </div>
    </div>
  );
}
