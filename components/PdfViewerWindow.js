import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";

export default function PdfViewerWindow({ onClose }) {
  const storageKey = "window-pos-pdf";
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const pos = JSON.parse(saved);
        if (typeof pos.x === "number" && typeof pos.y === "number") {
          setPosition(pos);
        } else {
          setPosition({ x: 200, y: 150 });
        }
      } catch {
        setPosition({ x: 200, y: 150 });
      }
    } else {
      setPosition({ x: 200, y: 150 });
    }
  }, []);

  const handleDragStop = (e, d) => {
    const newPos = { x: d.x, y: d.y };
    setPosition(newPos);
    localStorage.setItem(storageKey, JSON.stringify(newPos));
  };

  if (!position) return null;

  return (
    <Rnd
      position={position}
      size={{ width: 800, height: 600 }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      onDragStop={handleDragStop}
      className="z-50"
      enableResizing={false}
    >
      <div className="w-full h-full flex flex-col bg-white border border-gray-300 shadow-lg rounded-xl overflow-hidden">
        {/* Barra superior estilo macOS Preview */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#e5e5e5] border-b border-gray-300 rounded-t-xl">
          <div className="flex space-x-2">
            <div
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              onClick={onClose}
            ></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-700">CV_2025.pdf</span>
          <div className="w-16" />
        </div>

        {/* PDF Viewer */}
        <div className="flex-1">
          <iframe
            src="/pdfs/CV_2025.pdf"
            className="w-full h-full"
            title="PDF Viewer"
            frameBorder="0"
          />
        </div>
      </div>
    </Rnd>
  );
}
