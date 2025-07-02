import { useState, useEffect } from "react";
import DesktopIcon from "../components/DesktopIcon";
import Navbar from "../components/Navbar";
import TextEditWindow from "../components/TextEditWindow";
import PdfViewerWindow from "../components/PdfViewerWindow";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  const [windowWidth, setWindowWidth] = useState(0);

  const [positions, setPositions] = useState({});

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth > 0 && windowWidth < 640;

  useEffect(() => {
    if (windowWidth === 0) return;

    if (!isMobile) {
      const savedPositions = {};
      [
        "about",
        "cv",
        "project3",
        "project4",
        "project1",
        "trash",
      ].forEach((id) => {
        const saved = localStorage.getItem(`icon-pos-${id}`);
        if (saved) savedPositions[id] = JSON.parse(saved);
      });
      setPositions(savedPositions);
    } else {
      setPositions({});
    }
  }, [isMobile, windowWidth]);

  const icons = [
    { id: "about", icon: "/icons/txt.png", label: "About me.txt", defaultPosition: { x: 60, y: 80 } },
    { id: "cv", icon: "/icons/pdf.png", label: "CV_2025.pdf", defaultPosition: { x: 60, y: 160 } },
    { id: "project3", icon: "/icons/folder.png", label: "Project 3", defaultPosition: { x: 60, y: 240 } },
    { id: "project4", icon: "/icons/folder.png", label: "Project 4", defaultPosition: { x: 60, y: 320 } },
    { id: "project1", icon: "/icons/folder.png", label: "Project 1", defaultPosition: { x: 60, y: 400 } },
    { id: "trash", icon: "/icons/trash.png", label: "Don't look in here", defaultPosition: { x: 60, y: 560 } },
  ];

  const updatePosition = (id, newPos) => {
    setPositions((prev) => {
      const updated = { ...prev, [id]: newPos };
      if (!isMobile) localStorage.setItem(`icon-pos-${id}`, JSON.stringify(newPos));
      return updated;
    });
  };

  if (windowWidth === 0) {
    // Espera a cargar windowWidth para evitar render incorrecto en SSR
    return null;
  }

  return (
    <div className="relative w-full h-screen bg-[url('/wallpaper.jpg')] bg-cover bg-center overflow-x-hidden overflow-y-auto">
      <Navbar />

      {icons.map((icon, index) => {
        const pos = positions[icon.id] || (isMobile ? { x: 20, y: 150 + index * 140 } : icon.defaultPosition);

        return (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            icon={icon.icon}
            label={icon.label}
            position={pos}
            onPositionChange={(newPos) => updatePosition(icon.id, newPos)}
            onClick={() => {
              if (icon.id === "about") setShowAbout(true);
              if (icon.id === "cv") setShowPdf(true);
            }}
            isMobile={isMobile}
          />
        );
      })}

      {showAbout && <TextEditWindow onClose={() => setShowAbout(false)}>{/* contenido */}</TextEditWindow>}

      {showPdf && <PdfViewerWindow onClose={() => setShowPdf(false)} />}
    </div>
  );
}
