import React from "react";
import { aboutTranslations } from "../../../translate/aboutTranslations";
import "../../../css/itemAbout.css";

export default function ItemAbout({ lang }) {
  const t = aboutTranslations[lang] || aboutTranslations["es"];

  return (
    <div className="item-about-container">

      {/* Columna izquierda: Foto + Habilidades blandas */}
      <div className="left-column">
        <div className="about-photo">
          <img src="/images/fotoJulian.png" alt="Foto de Julian" />
        </div>
        <div className="section-container soft-skills">
          <div className="section-header"><h3>{t.sofsTitle || "Habilidades blandas"}</h3></div>
          <div className="section-content">
            {(t.softSkills || ["Trabajo en equipo", "Adaptabilidad", "Resolución de problemas", "Comunicación efectiva","Aprendizaje Continuo","Creatividad","Pensamiento crítico","Gestión del tiempo"]).map((skill, i) => (
              <p key={i}>{skill}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Columna derecha: Sobre mí + Mis Estudios + Mi Experiencia */}
      <div className="right-column">
        <div className="section-container">
          <div className="section-header"><h3>{t.title || "Sobre mí"}</h3></div>
          <div className="section-content">
            <p>{t.description}</p>
          </div>
        </div>

        <div className="section-container">
          <div className="section-header"><h3>{t.studiesTitle || "Mis Estudios"}</h3></div>
          <div className="section-content">
            {(t.studies || []).map((study, i) => (<p key={i}>{study}</p>))}
          </div>
        </div>

        <div className="section-container">
          <div className="section-header"><h3>{t.experienceTitle || "Mi Experiencia"}</h3></div>
          <div className="section-content">
            {(t.experience || []).map((exp, i) => (<p key={i}>{exp}</p>))}
          </div>
        </div>
      </div>

    </div>
  );
}
