import React from "react";
import TarjetSkills from "../littleComponents/cardSkills";
import ImplementationsSkills from "../littleComponents/implementationsSkills";
import { skillsTranslations } from "../../../translate/skillsTranslations"; 
import "../../../css/mySkills.css";


export default function MySkills({  lang, setActiveSection }) {
  const t = skillsTranslations[lang] || skillsTranslations["es"]; // fallback seguro

  return (
    <>
      <section className="my-implementations-section" id="myImplementations">
        <ImplementationsSkills lang={lang} setActiveSection={setActiveSection} />
      </section>

      <section className="my-skills-section" id="mySkills">
        <h2 className="skills-title">{t.mis_herramientas}</h2>
        <TarjetSkills lang={lang} />
      </section>
    </>
  );
}




