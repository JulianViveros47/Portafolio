import React from "react";
import { projectsTranslations } from "../../../translate/projectsTranslations"; 
import "../../../css/projects.css";
import CardProjects from "../littleComponents/cardProjects";

export default function Projects({ lang }) {
  const t = projectsTranslations[lang] || projectsTranslations["es"]; // fallback seguro

  return (
    <>
      {/* Sección principal de proyectos */}
      <section className="my-projects-section" id="myProjects">
        <CardProjects lang={lang} />
      </section>

      {/* Sección de proyectos destacados o carrusel */}
      <section className="my-featured-projects-section" id="myFeaturedProjects">
        
      </section>

      {/* Aquí puedes agregar más componentes relacionados a proyectos */}
      {/* <OtherProjects lang={lang} /> */}
    </>
  );
}
