import React, { useEffect, useState } from "react";
import { driveTranslations } from "../../../translate/driveTranslations";
import "../../../css/googleComponents/drive.css";

const CLIENT_ID = "656709606289-l1n5d6hkubi6103t63fmhr014kpi75jm.apps.googleusercontent.com";
const API_KEY = "AIzaSyCKnuXeQxLmo_0tbNqOVqz5VopqLT5ZOYc";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

export default function Drive({ lang }) {
  // 🔹 Detección automática del idioma del navegador si no se pasa por props
  const detectedLang = lang || (navigator.language.startsWith("en") ? "en" : "es");
  const t = driveTranslations[detectedLang] || driveTranslations["es"];

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const waitForGoogle = () => {
      if (window.gapi && window.google?.accounts?.oauth2) {
        window.gapi.load("client", async () => {
          await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            ],
          });
          console.log("✅ GAPI y Google Identity listos");
          setLoading(false);
        });
      } else {
        console.warn("⏳", t.loading);
        setTimeout(waitForGoogle, 500);
      }
    };

    waitForGoogle();
  }, [t.loading]);

  const signIn = async () => {
    try {
      if (!window.google?.accounts?.oauth2) {
        console.warn("⚠️ Google Identity aún no está disponible.");
        setStatus({ type: "error", msg: t.signInError });
        showToast();
        return;
      }

      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          if (response?.access_token) {
            setToken(response.access_token);
            setStatus({ type: "success", msg: t.uploadSuccess });
          } else {
            setStatus({ type: "error", msg: t.signInError });
          }
          showToast();
        },
      });

      tokenClient.requestAccessToken();
    } catch (err) {
      console.error("Sign-in error:", err);
      setStatus({ type: "error", msg: t.signInError });
      showToast();
    }
  };

  const signOut = () => {
    setToken(null);
    setStatus({ type: "success", msg: t.signOut });
    showToast();
  };

  const uploadFile = async (file) => {
    if (!file || !token) {
      setStatus({ type: "error", msg: t.notConnected });
      showToast();
      return;
    }

    const metadata = { name: file.name, mimeType: file.type };
    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    try {
      setStatus({ type: "info", msg: t.uploading });
      showToast();

      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
        {
          method: "POST",
          headers: new Headers({ Authorization: `Bearer ${token}` }),
          body: form,
        }
      );

      const data = await res.json();

      if (data.id) {
        setStatus({
          type: "success",
          msg: `${t.uploadSuccess} `,
        });
      } else {
        throw new Error("No se obtuvo ID del archivo");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setStatus({ type: "error", msg: t.uploadError });
    }
    showToast();
  };

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  if (loading) {
    return (
      <section className="drive-section">
        <h2>{t.title}</h2>
        <p>{t.loading}</p>
      </section>
    );
  }

  return (
    <section className="drive-section">
      <h2>{t.title}</h2>
      <p>{t.description}</p>

      {!token ? (
        <button className="contact-btn" onClick={signIn}>
          {t.signIn}
        </button>
      ) : (
        <>
          <input
            type="file"
            onChange={(e) => uploadFile(e.target.files[0])}
            aria-label={t.upload}
          />
          <button className="contact-btn" onClick={signOut}>
            {t.signOut}
          </button>
        </>
      )}

      {status && (
        <div className={`toast ${toast ? "show" : ""} ${status.type}`}>
          <span>{status.msg}</span>
        </div>
      )}
    </section>
  );
}
