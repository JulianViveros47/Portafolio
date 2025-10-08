// resources/js/pages/home.jsx
import React, { useState } from "react";
import Navbar from "../components/littleComponents/navbar";
import Contact from "./navbarComponents/contact";
import MySkills from "./navbarComponents/mySkills";
import Projects from "./navbarComponents/projects";
import Footer from "../components/littleComponents/footer";
import About from "./navbarComponents/about";

import Calendar from "../components/googleComponents/calendar";
import Drive from "../components/googleComponents/drive";
import Maps from "./googleComponents/maps";
import GoogleLogin from "./googleComponents/googleLogin";
import Translate from "./googleComponents/translate";



import ImplementationsSkills from "../components/littleComponents/implementationsSkills";

export default function Home() {
  const [lang, setLang] = useState("es");
  const [activeSection, setActiveSection] = useState("about"); // sección por defecto

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        lang={lang}
        setLang={setLang}
        setActiveSection={setActiveSection}
      />

      {activeSection === "about" && <About lang={lang} />}
      {activeSection === "mySkills" && <MySkills lang={lang} setActiveSection={setActiveSection} />}

      {activeSection === "projects" && <Projects lang={lang} />}
      {activeSection === "contact" && <Contact lang={lang} />}
      {activeSection === "implementations" && (
        <ImplementationsSkills
          lang={lang}
          setActiveSection={setActiveSection} // ✅ importante para navegar a Calendar
        />
      )}
      {activeSection === "calendar" && <Calendar />}
      {activeSection === "drive" && <Drive lang={lang} />}
      {activeSection === "maps" && <Maps />}
      {activeSection === "googleLogin" && <GoogleLogin lang={lang} />}
      {activeSection === "translate" && <Translate lang={lang} />}
      <Footer />
    </div>
  );
}
