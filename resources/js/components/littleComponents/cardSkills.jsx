
import React, { useEffect, useState, useRef } from "react";
import { skillsTranslations } from "../../../translate/skillsTranslations";
import "../../../css/cardSkills.css";

export default function TarjetSkills({ lang = "es" }) {
  const skills = skillsTranslations[lang]?.skills || skillsTranslations.es.skills;

  const logos = {     
    PHP: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
    Java: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
    C: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
    Cpp: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
    Python: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    Laravel: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
    Django: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
    SpringBoot: "https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg",
    React: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    Angular: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg",
    MySQL: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    PostgreSQL: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    Oracle: "https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg",
    HTML5: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    CSS3: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    JavaScript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", };

  const [progress, setProgress] = useState(skills.map(() => 0));
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const containerRef = useRef(); // ref para la sección completa

  // Detecta cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animación barras al aparecer en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar las barras
            skills.forEach((skill, i) => {
              setTimeout(() => {
                setProgress((prev) => {
                  const updated = [...prev];
                  updated[i] = skill.level;
                  return updated;
                });
              }, i * 200);
            });
            obs.disconnect(); // deja de observar después de la animación
          }
        });
      },
      { threshold: 0.3 } // cuando el 30% de la sección sea visible
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [lang, skills]);

  const handleCardClick = (index) => {
    if (!isMobile) return;
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getRowIndex = (index) => Math.floor(index / 4);

  return (
    <div className="skills-container" id="mySkills" ref={containerRef}>
      {skills.map((skill, index) => {
        const rowIndex = getRowIndex(index);
        const isActiveMobile = isMobile && activeIndex === index;
        const isActiveDesktop = !isMobile && activeRow === rowIndex;

        return (
          <div
            key={index}
            className={`skill-card ${isActiveMobile || isActiveDesktop ? "active" : ""}`}
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => !isMobile && setActiveRow(rowIndex)}
            onMouseLeave={() => !isMobile && setActiveRow(null)}
          >
            <div className="skill-header">
              <img src={logos[skill.name]} alt={skill.name} className="skill-logo" />
              <h3>{skill.name}</h3>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress[index]}%` }}>
                <span className="progress-text">{progress[index]}%</span>
              </div>
            </div>

            <p className="skill-description">{skill.description}</p>
          </div>
        );
      })}
    </div>
  );
}
