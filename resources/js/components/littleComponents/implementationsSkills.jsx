// resources/js/components/littleComponents/implementationsSkills.jsx
import React, { useState } from "react";
import "../../../css/implementationsSkills.css";
import { implementationsTranslations } from "../../../translate/implementationsTranslations";

export default function ImplementationsSkills({ lang = "es", setActiveSection }) {
  // ahora setActiveSection viene de Home

  const t = implementationsTranslations[lang] || implementationsTranslations["es"];
  const [activeCategory, setActiveCategory] = useState("Google");

  const categories = {
    Google: ["Calendar", "Drive", "Maps", "GoogleLogin", "Translate"],
    Microsoft: ["Graph API", "Excel", "Azure Cognitive Services"],
    RedesSociales: ["Twitter API", "Instagram API", "LinkedIn API"],
    Productividad: ["Notion API", "Trello API", "Slack API", "Discord API"],
    Pagos: ["Stripe", "PayPal", "MercadoPago"],
    Extras: ["Weather API", "News API", "PokéAPI"],
  };

  const logos = {
    Calendar: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
    Drive: "https://raw.githubusercontent.com/devicons/devicon/master/icons/google/google-original.svg",
    Maps: "https://cdn-icons-png.flaticon.com/512/2991/2991231.png",
    GoogleLogin: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
    Translate: "https://cdn-icons-png.flaticon.com/512/2875/2875332.png",

    "Graph API": "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    Excel: "https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoft/microsoft-original.svg",
    "Azure Cognitive Services": "https://cdn-icons-png.flaticon.com/512/5968/5968953.png",

    "Twitter API": "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    "Instagram API": "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    "LinkedIn API": "https://cdn-icons-png.flaticon.com/512/174/174857.png",

    "Notion API": "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    "Trello API": "https://cdn-icons-png.flaticon.com/512/5968/5968895.png",
    "Slack API": "https://cdn-icons-png.flaticon.com/512/2111/2111615.png",
    "Discord API": "https://cdn-icons-png.flaticon.com/512/2111/2111370.png",

    Stripe: "https://cdn-icons-png.flaticon.com/512/5968/5968383.png",
    PayPal: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
    MercadoPago:
      "https://http2.mlstatic.com/frontend-assets/mp-web-navigation/ui-navigation/5.21.2/mercadopago/logo__large.png",

    "Weather API": "https://cdn-icons-png.flaticon.com/512/1116/1116453.png",
    "News API": "https://cdn-icons-png.flaticon.com/512/2965/2965879.png",
    "PokéAPI": "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png",
  };

  // Solo Calendar necesita cambiar la sección
  const handleCardClick = (impl) => {
  if (impl === "Calendar") {
    setActiveSection("calendar"); // ✅ cambia la sección
  }if (impl === "Drive") {
    setActiveSection("drive"); // ✅ cambia la sección
  } if (impl === "Maps") {
    setActiveSection("maps"); // ✅ cambia la sección
  }if (impl === "GoogleLogin") {
    setActiveSection("googleLogin"); // ✅ cambia la sección
  }if (impl === "Translate") {
    setActiveSection("translate"); // ✅ cambia la sección
  }
  // Si quieres, puedes agregar más "if" para otras implementaciones
};


  return (
    <section className="implementations-section" id="implementations">
      <h2 className="implementations-title">{t.mis_implementaciones}</h2>

      {/* Menú de categorías */}
      <div className="implementations-menu">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`menu-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {t.categorias[category]}
          </button>
        ))}
      </div>

      {/* Lista de implementaciones */}
      <div className="implementations-list">
        {categories[activeCategory].map((impl, index) => (
          <div key={index} className="implementation-card">
            <div className="icon">
              <img src={logos[impl]} alt={impl} />
            </div>
            <h3>{impl}</h3>
            <p>{t.descripciones?.[impl] || "Próximamente más detalles..."}</p>
            <button
              className="learn-more"
              onClick={() => handleCardClick(impl)}
            >
              Ver más
            </button>

          </div>
        ))}
      </div>
    </section>
  );
}
