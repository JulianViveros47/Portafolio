import React from "react";
import { aboutTranslations } from "../../../translate/aboutTranslations"; 
import "../../../css/about.css";
import ItemAbout from "../littleComponents/itemAbout";

export default function about({ lang }) {
  const t = aboutTranslations[lang] || aboutTranslations["es"]; // fallback seguro

  return (
    <>
      {/* Sección principal de proyectos */}
      <section className="about-section" id="myProjects">
        <ItemAbout lang={lang} />
      </section>
    </>
  );
}