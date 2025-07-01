import { useState } from "react";
import DesktopIcon from "../components/DesktopIcon";
import Navbar from "../components/Navbar";
import TextEditWindow from "../components/TextEditWindow";
import PdfViewerWindow from "../components/PdfViewerWindow"; // ← NUEVO

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [showPdf, setShowPdf] = useState(false); // ← NUEVO

  const icons = [
    { id: "about", icon: "/icons/txt.png", label: "About me.txt", defaultPosition: { x: 60, y: 80 } },
    { id: "cv", icon: "/icons/pdf.png", label: "CV_2025.pdf", defaultPosition: { x: 60, y: 160 } },
    { id: "project3", icon: "/icons/folder.png", label: "Project 3", defaultPosition: { x: 60, y: 240 } },
    { id: "project4", icon: "/icons/folder.png", label: "Project 4", defaultPosition: { x: 60, y: 320 } },
    { id: "project1", icon: "/icons/folder.png", label: "Project 1", defaultPosition: { x: 60, y: 400 } },
    { id: "trash", icon: "/icons/trash.png", label: "Don't look in here", defaultPosition: { x: 60, y: 560 } },
  ];

  return (
    <div className="h-screen w-screen bg-[url('/wallpaper.jpg')] bg-cover relative overflow-hidden">
      <Navbar />

      {/* Íconos del escritorio */}
      {icons.map(icon => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          icon={icon.icon}
          label={icon.label}
          defaultPosition={icon.defaultPosition}
          onClick={() => {
            if (icon.id === "about") setShowAbout(true);
            if (icon.id === "cv") setShowPdf(true); // ← NUEVO
          }}
        />
      ))}

      {/* Ventana tipo TextEdit */}
      {showAbout && (
        <TextEditWindow onClose={() => setShowAbout(false)}>
          Hello. I am a designer. I’ve worked on lots of projects — and thankfully have lots on my plate, but I am always on the lookout for interesting and fun situations. Feel free to send me an email. To see my full resume just click the PDF icon on the “desktop” ;)

          As well, this year I started a print magazine called “Control” — a long realized dream. For “Control” related inquiries please email info@controlmag.com.

          Thanks and look forward to hearing from you. 👽🖖
        </TextEditWindow>
      )}

      {/* Ventana PDF estilo Preview */}
      {showPdf && (
        <PdfViewerWindow onClose={() => setShowPdf(false)} />
      )}
    </div>
  );
}
