import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";

export default function PdfViewerWindow({ onClose }) {
  const [position, setPosition] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [windowHeight, setWindowHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 768);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    const width = windowWidth < 640 ? Math.min(500, windowWidth - 40) : 500;
    const height = windowWidth < 640 ? Math.min(450, windowHeight - 80) : 450;
    setPosition({
      x: Math.max(20, (windowWidth - width) / 2),
      y: Math.max(20, (windowHeight - height) / 2),
    });
  }, [windowWidth, windowHeight]);


  const handleDragStop = (e, d) => {
    setPosition({ x: d.x, y: d.y });
  };

  if (!position) return null;


  const width = windowWidth < 640 ? Math.min(500, windowWidth - 40) : 500;
  const height = windowWidth < 640 ? Math.min(450, windowHeight - 80) : 450;


  return (
    <Rnd
      position={position}
      size={{ width, height }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      onDragStop={handleDragStop}
      className="z-50"
      enableResizing={false}
      dragHandleClassName="drag-handle"
      cancel=".no-drag"
    >
      <div className="w-full h-full flex flex-col bg-white border border-gray-300 shadow-lg rounded-xl overflow-hidden">
        {/* Barra superior estilo macOS Preview */}
        <div className="drag-handle flex items-center justify-between px-3 py-1 bg-[#e5e5e5] border-b border-gray-300 rounded-t-xl cursor-move">
          <div className="flex space-x-2">
            <div
              className="no-drag w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              onClick={onClose} // Cerrar ventana al pulsar botón rojo
            />
            <div className="no-drag w-3 h-3 rounded-full bg-yellow-400 cursor-pointer" onClick={onClose} />
            <div className="no-drag w-3 h-3 rounded-full bg-green-500 cursor-pointer" onClick={onClose} />
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
            style={{ overflow: "hidden" }}
          />
        </div>
      </div>
    </Rnd>
  );
}
