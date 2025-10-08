// resources/js/components/Footer.jsx
import React from "react";
import "../../../css/footer.css"; // 👈 nuevo archivo
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Izquierda: Redes */}
      <div className="footer-left">
        <a
          href="https://www.linkedin.com/in/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://wa.me/573001234567" // 👈 tu número con código de país
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* Derecha: Copyright */}
      <div className="footer-right">
        © 2025 Eider Julian Viveros Yace
      </div>
    </footer>
  );
}
