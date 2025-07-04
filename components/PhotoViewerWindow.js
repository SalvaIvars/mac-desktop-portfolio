import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

export default function PhotoViewerWindow({ onClose, photoSrc }) {
  const storageKey = "window-pos-photoViewer";
  const [position, setPosition] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 768
  );

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const pos = JSON.parse(saved);
        if (typeof pos.x === "number" && typeof pos.y === "number") {
          setPosition(pos);
        } else {
          setPosition({ x: 150, y: 100 });
        }
      } catch {
        setPosition({ x: 150, y: 100 });
      }
    } else {
      setPosition({ x: 150, y: 100 });
    }
  }, []);

  const handleDragStop = (e, d) => {
    const newPos = { x: d.x, y: d.y };
    setPosition(newPos);
    localStorage.setItem(storageKey, JSON.stringify(newPos));
  };

  if (!position) return null;

  const width = windowWidth < 640 ? Math.min(500, windowWidth - 40) : 600;
  const height = windowWidth < 640 ? Math.min(500, windowHeight - 80) : 600;

  return (
    <Rnd
      position={position}
      size={{ width, height }}
      minWidth={400}
      minHeight={400}
      bounds="parent"
      onDragStop={handleDragStop}
      className="z-50"
      enableResizing={false}
      dragHandleClassName="drag-handle"
      cancel=".no-drag"
    >
      <div className="w-full h-full flex flex-col bg-black rounded-xl overflow-hidden">
        {/* Barra superior estilo macOS */}
        <div className="drag-handle flex items-center justify-between px-3 py-1 bg-[#e5e5e5] border-b border-gray-300 rounded-t-xl select-none cursor-move">
          <div className="flex space-x-2">
            <div
              className="no-drag w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              onClick={onClose} // Cerrar ventana al pulsar botón rojo
              title="Close"
            />
            <div className="no-drag w-3 h-3 rounded-full bg-yellow-400 cursor-pointer" onClick={onClose} title="Close" />
            <div className="no-drag w-3 h-3 rounded-full bg-green-500 cursor-pointer" onClick={onClose} title="Close" />
          </div>
          <span className="text-sm text-gray-700 select-none">My Photo</span>
          <div className="w-16" />
        </div>

        {/* Contenido con imagen */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <img
            src={photoSrc}
            alt="My Photo"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
              margin: "auto",
            }}
          />
        </div>
      </div>
    </Rnd>
  );
}
