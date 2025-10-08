// resources/js/components/googleComponents/Translate.jsx
import React, { useEffect, useState } from "react";
import { googleTranslate } from "../../../translate/googleTranslate";
import "../../../css/googleComponents/translate.css";

export default function Translate({ lang = "es" }) {
  const [selectedLang, setSelectedLang] = useState(lang); // idioma de destino
  const [sourceLang, setSourceLang] = useState(lang); // idioma del texto base
  const [baseText, setBaseText] = useState(googleTranslate[lang]?.text || "");
  const [translatedText, setTranslatedText] = useState(baseText);

    const languages = [
    { code: "es", label: "Español" },
    { code: "en", label: "Inglés" },
    { code: "fr", label: "Francés" },
    { code: "de", label: "Alemán" },
    { code: "it", label: "Italiano" },
    { code: "pt", label: "Portugués" },
    { code: "ru", label: "Ruso" },
    { code: "zh-CN", label: "Chino (Simplificado)" },
    { code: "ja", label: "Japonés" },
    { code: "ko", label: "Coreano" },
    { code: "ar", label: "Árabe" },
    { code: "hi", label: "Hindi" },
    { code: "tr", label: "Turco" },
    { code: "nl", label: "Neerlandés" },
    { code: "sv", label: "Sueco" },
    { code: "no", label: "Noruego" },
    { code: "da", label: "Danés" },
    { code: "fi", label: "Finés" },
    { code: "pl", label: "Polaco" },
    { code: "cs", label: "Checo" },
    ];


  // Actualizar baseText si cambia lang
  useEffect(() => {
    setSourceLang(lang);
    setBaseText(googleTranslate[lang]?.text || "");
  }, [lang]);

  // Traducir cuando cambie selectedLang o baseText
  useEffect(() => {
    if (selectedLang === sourceLang) {
      setTranslatedText(baseText);
    } else {
      const translateText = async () => {
        try {
          const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${selectedLang}&dt=t&q=${encodeURIComponent(baseText)}`
          );
          const data = await res.json();
          setTranslatedText(data[0].map(item => item[0]).join(""));
        } catch (error) {
          console.error("Error traduciendo:", error);
          setTranslatedText("Error al traducir");
        }
      };
      translateText();
    }
  }, [selectedLang, baseText, sourceLang]);

  return (
    <div className="translate-wrapper">
      <div className="translate-header">
        <label htmlFor="language-select">Traducir a:</label>
        <select
          id="language-select"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="translate-content">
        <div className="translate-text-es">{baseText}</div>
        <div className="translate-text-tr">{translatedText}</div>
      </div>
    </div>
  );
}


