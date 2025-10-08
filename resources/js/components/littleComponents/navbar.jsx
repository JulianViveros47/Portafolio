import React from "react";
import "../../../css/navbar.css";
import { navbarTranslations } from "../../../translate/navbarTranslations";

export default function Navbar({ lang, setLang, setActiveSection }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const t = navbarTranslations[lang] || navbarTranslations["es"]; // 👈 fallback seguro

  return (
    <nav className="navbar">
      <div className="navbar-logo">Eider Julian Viveros Yace</div>

      {/* Botón hamburguesa */}
      <div className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {/* Fila superior solo visible en móvil */}
        <div className="navbar-top-row mobile-only">
          <li><a onClick={() => setActiveSection("about")}>{t.sobre_mi}</a></li>
          <li>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="navbar-lang2"
            >
              <option value="es">ESPAÑOL</option>
              <option value="en">ENGLISH</option>
            </select>
          </li>
        </div>

        {/* Links */}
        <li>
          <a
            id="about"
            className="desktop-only"
            onClick={() => setActiveSection("about")}
          >
            {t.sobre_mi}
          </a>
        </li>
        <li><a onClick={() => setActiveSection("mySkills")}>{t.mis_habilidades}</a></li>
        <li><a onClick={() => setActiveSection("projects")}>{t.proyectos}</a></li>
        <li>
          <a
            href="/Hoja De Vida Eider Julian Viveros Yace.pdf"
            download="Eider_Julian_CV.pdf"
          >
            {t.hoja_de_vida}
          </a>
        </li>
        <li><a onClick={() => setActiveSection("contact")}>{t.contacto}</a></li>
      </ul>

      {/* Selector de idioma */}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="navbar-lang"
      >
        <option value="es">ESPAÑOL</option>
        <option value="en">ENGLISH</option>
      </select>
    </nav>
  );
}
