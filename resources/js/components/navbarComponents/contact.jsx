import React, { useState } from "react";
import { contactTranslations } from "../../../translate/contactTranslations";
import "../../../css/contact.css";

export default function Contact({ lang }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [toast, setToast] = useState(false);

  const t = contactTranslations[lang] || contactTranslations["es"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (result.success) {
          setStatus({ type: "success", msg: "✅ Correo enviado con éxito" });
          setFormData({ name: "", email: "", message: "" });
          setToast(true);
          setTimeout(() => setToast(false), 4000);
        } else {
          setStatus({ type: "error", msg: "❌ " + result.message });
        }
      } else {
        const text = await response.text();
        console.error("Respuesta inesperada:", text);
        setStatus({
          type: "error",
          msg: "⚠️ El servidor devolvió algo inesperado, revisa consola",
        });
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus({
        type: "error",
        msg: "Error de conexión con el servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="contact-section">
      {/* Fondo animado */}
      <div className="letters-bg">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="letter">✉️</div>
        ))}
      </div>

      {/* Tarjeta */}
      <div className="contact-card">
        <h2 className="contact-title">{t.contactame}</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t.tu_nombre}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t.tu_correo}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder={t.tu_mensaje}
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contact-btn" disabled={loading}>
            {loading ? "Enviando..." : t.enviar}
          </button>
        </form>

        {/* Mensajes de estado inline */}
        {status && (
          <p className={status.type === "success" ? "msg-success" : "msg-error"}>
            {status.msg}
          </p>
        )}
      </div>

      {/* Toast de éxito */}
      <div className={`toast ${toast ? "show" : ""}`}>
        <span className="icon">✅</span>
        <span>Mensaje enviado con éxito</span>
      </div>
    </section>
  );
}
