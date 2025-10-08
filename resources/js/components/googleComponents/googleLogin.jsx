// resources/js/components/googleComponents/googleLogin.jsx
import React, { useEffect, useState } from "react";
import { googleLoginTranslations } from "../../../translate/googleLoginTranslations";
import "../../../css/googleComponents/googleLogin.css";

const CLIENT_ID = "656709606289-l1n5d6hkubi6103t63fmhr014kpi75jm.apps.googleusercontent.com";

export default function GoogleLogin({ lang = "es" }) {
  const t = googleLoginTranslations[lang] || googleLoginTranslations["es"];
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const existingScript = document.getElementById("googleIdentityScript");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "googleIdentityScript";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = initializeGSI;
    } else {
      initializeGSI();
    }
  }, []);

  const initializeGSI = () => {
    if (!window.google?.accounts?.id || user) return;

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
    });

    // Renderiza el botón solo si no hay usuario
    if (!user) {
      window.google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large", type: "standard" }
      );
      window.google.accounts.id.prompt(); // Muestra prompt si es necesario
    }
  };

  const handleCredentialResponse = (response) => {
    if (response?.credential) {
      // Decodificar JWT manualmente para obtener nombre y foto
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64));

      setUser({
        name: decodedPayload.name,
        picture: decodedPayload.picture,
        email: decodedPayload.email,
      });

      setStatus({ type: "success", msg: t.success });
      showToast();
    } else {
      setStatus({ type: "error", msg: t.error });
      showToast();
    }
  };

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="google-login-container">
      <div className="google-login-card">
        <h2>{t.title}</h2>
        <p>{t.description}</p>

        {!user && <div id="g_id_signin"></div>}

        {status && <p className={`google-login-status ${status.type}`}>{status.msg}</p>}

        {user && (
          <div className="google-user-info">
            <img src={user.picture} alt={user.name} className="google-user-pic" />
            <p className="google-user-name">{user.name}</p>
          </div>
        )}
      </div>

      <div className={`toast ${toast ? "show" : ""}`}>
        <span className="icon">✅</span>
        <span>{status?.msg || t.success}</span>
      </div>
    </div>
  );
}
