import React, { useEffect, useRef } from "react";
import "../../../css/googleComponents/mapSkills.css";

const CONTINENTS = [
  {
    name: "América del Sur",
    position: { lat: -15.6, lng: -56.1 },
    skills: ["PHP", "JavaScript", "React", "Laravel"],
  },
  {
    name: "América del Norte",
    position: { lat: 39.8283, lng: -98.5795 },
    skills: ["Spring Boot", "API REST", "Java", "JWT"],
  },
  {
    name: "Europa",
    position: { lat: 54.526, lng: 15.2551 },
    skills: ["MySQL", "PostgreSQL", "Node.js"],
  },
  {
    name: "África",
    position: { lat: 1.6508, lng: 17.6791 },
    skills: ["HTML", "CSS", "UI/UX"],
  },
  {
    name: "Asia",
    position: { lat: 34.0479, lng: 100.6197 },
    skills: ["Python", "C", "C++", "Machine Learning"],
  },
  {
    name: "Oceanía",
    position: { lat: -25.2744, lng: 133.7751 },
    skills: ["Git", "Colaboración", "Resolución de problemas"],
  },
];

export default function Maps() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        console.log("✅ Google Maps cargado correctamente");
        initMap();
      } else {
        console.log("⏳ Esperando que Google Maps se cargue...");
        setTimeout(loadGoogleMaps, 500);
      }
    };

    if (!document.getElementById("googleMapsScript")) {
      const script = document.createElement("script");
      script.id = "googleMapsScript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCKnuXeQxLmo_0tbNqOVqz5VopqLT5ZOYc&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      document.body.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, []);

  const initMap = () => {
    if (!mapRef.current) {
      console.error("❌ El contenedor del mapa no está disponible.");
      return;
    }

    if (!window.google || !window.google.maps) {
      console.error("⚠️ Google Maps aún no está disponible.");
      return;
    }

    if (mapInstance.current) return; // evita recargarlo

    // Crear mapa
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20, lng: 0 },
      zoom: 2,
      styles: [
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#aadaff" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f3f3f3" }],
        },
      ],
    });

    // Agregar marcadores
    CONTINENTS.forEach((continent) => {
      const marker = new window.google.maps.Marker({
        position: continent.position,
        map: mapInstance.current,
        title: continent.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="info-window">
            <h3>${continent.name}</h3>
            <ul>
              ${continent.skills.map((s) => `<li>✅ ${s}</li>`).join("")}
            </ul>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map: mapInstance.current,
          shouldFocus: false,
        });
      });
    });
  };

  return (
    <section className="map-section">
      <h2>🌍 Mapa de habilidades</h2>
      <p>Haz clic en un continente para ver las habilidades destacadas.</p>
      <div ref={mapRef} id="map"></div>
    </section>
  );
}
