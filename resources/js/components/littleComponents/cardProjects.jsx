import React from "react";
import "../../../css/cardProjects.css";
import { projectsTranslations } from "../../../translate/projectsTranslations";

export default function CardProjects({ lang = "es" }) {
  const t = projectsTranslations[lang] || projectsTranslations["es"];

  return (
    <div className="cards-container">
      {t.proyectos.map((proj, index) => (
        <div key={index} className="card-project">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${proj.image || 'https://via.placeholder.com/400x200'})` }}
          ></div>
          <div className="card-content">
            <h3 className="card-title">{proj.title}</h3>
            <p className="card-date">{proj.startDate} - {proj.endDate}</p>
            <p className="card-description">{proj.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
