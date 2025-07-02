import { useState, useEffect } from "react";
import DesktopIcon from "../components/DesktopIcon";
import Navbar from "../components/Navbar";
import TextEditWindow from "../components/TextEditWindow";
import PdfViewerWindow from "../components/PdfViewerWindow";
import SettingsMenu from "../components/SettingsMenu";
import PhotoViewerWindow from "../components/PhotoViewerWindow"; // Nuevo componente para la foto

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false); // Estado para la ventana de foto

  const [windowWidth, setWindowWidth] = useState(0);
  const [positions, setPositions] = useState({});
  const [wallpaper, setWallpaper] = useState("/wallpaper3.jpg");
  const [folderSize, setFolderSize] = useState("medium");
  const [textSize, setTextSize] = useState("medium");

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth > 0 && windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  useEffect(() => {
    if (windowWidth === 0) return;

    if (isDesktop) {
      const savedPositions = {};
      ["about", "cv", "project3", "project4", "trash", "settings", "profilePic"].forEach((id) => {
        const saved = localStorage.getItem(`icon-pos-${id}`);
        if (saved) savedPositions[id] = JSON.parse(saved);
      });
      setPositions(savedPositions);
    } else {
      setPositions({});
    }
  }, [isDesktop, windowWidth]);

  const icons = [
    { id: "about", icon: "/icons/txt.png", label: "About me.txt", defaultPosition: { x: 60, y: 80 } },
    { id: "cv", icon: "/icons/pdf.png", label: "CV_2025.pdf", defaultPosition: { x: 60, y: 160 } },
    { id: "project3", icon: "/icons/folder.png", label: "Project 3", defaultPosition: { x: 60, y: 240 } },
    { id: "project4", icon: "/icons/folder.png", label: "Project 4", defaultPosition: { x: 60, y: 320 } },
    { id: "trash", icon: "/icons/trash.png", label: "Don't look in here", defaultPosition: { x: 60, y: 560 } },
    { id: "settings", icon: "/icons/gear.png", label: "Settings", defaultPosition: { x: 60, y: 640 } },
    { id: "profilePic", icon: "/icons/profilepicture_thumb.png", label: "My Photo", defaultPosition: { x: 300, y: 80 } },
  ];

  const updatePosition = (id, newPos) => {
    setPositions((prev) => {
      const updated = { ...prev, [id]: newPos };
      if (isDesktop) localStorage.setItem(`icon-pos-${id}`, JSON.stringify(newPos));
      return updated;
    });
  };

  if (windowWidth === 0) return null;

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-x-hidden overflow-y-auto"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <Navbar />

      {icons.map((icon, index) => {
        let pos;

        if (positions[icon.id]) {
          pos = positions[icon.id];
        } else if (isMobile) {
          const col = index % 2;
          const row = Math.floor(index / 2);
          pos = { x: 20 + col * 250, y: 150 + row * 240 };
        } else if (isTablet) {
          const col = index % 3;
          const row = Math.floor(index / 3);
          pos = { x: 20 + col * 250, y: 150 + row * 240 };
        } else {
          pos = icon.defaultPosition;
        }

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
              if (icon.id === "settings") setShowSettings(true);
              if (icon.id === "profilePic") setShowPhoto(true);
            }}
            folderSize={folderSize}
            textSize={textSize}
            isMobile={isMobile || isTablet}
          />
        );
      })}

      {showAbout && <TextEditWindow onClose={() => setShowAbout(false)}>{/* contenido */}</TextEditWindow>}

      {showPdf && <PdfViewerWindow onClose={() => setShowPdf(false)} />}

      {showSettings && (
        <SettingsMenu
          onClose={() => setShowSettings(false)}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
          folderSize={folderSize}
          setFolderSize={setFolderSize}
          textSize={textSize}
          setTextSize={setTextSize}
        />
      )}

      {showPhoto && (
        <PhotoViewerWindow
          onClose={() => setShowPhoto(false)}
          photoSrc="/picture/profilepicture.jpg"
        />
      )}
    </div>
  );
}
