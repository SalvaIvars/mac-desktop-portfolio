import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";

const wallpapers = [
  "/wallpaper3.jpg",
  "/wallpaper4.jpg",
  "/wallpaper5.jpg",
  "/wallpaper6.jpg",
  "/wallpaper7.jpg",
  "/wallpaper8.jpg",
];

export default function SettingsMenu({
  onClose,
  wallpaper,
  setWallpaper,
  folderSize,
  setFolderSize,
  textSize,
  setTextSize,
}) {
  const [position, setPosition] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 768
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const folderSizes = ["small", "medium", "large"];
  const textSizes = ["small", "medium", "large"];


  useEffect(() => {
    const width = windowWidth < 640 ? Math.min(500, windowWidth - 40) : 500;
    const height = windowHeight < 640 ? Math.min(450, windowHeight - 80) : 450;
    setPosition({
      x: Math.max(20, (windowWidth - width) / 2),
      y: Math.max(20, (windowHeight - height) / 2),
    });
  }, [windowWidth, windowHeight]);

  const width = windowWidth < 640 ? Math.min(500, windowWidth - 40) : 500;
  const height = windowWidth < 640 ? Math.min(450, windowHeight - 80) : 450;


  return (
    <Rnd
      size={{ width, height }}
      position={position}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      bounds="parent"
      enableResizing={false}
      className="z-50"
      dragHandleClassName="drag-handle"
      cancel=".no-drag"
    >
      <div className="w-full h-full bg-[#f2f2f2] rounded-xl border border-gray-300 shadow-md flex flex-col font-sans">
        {/* Header */}
        <div className="drag-handle flex items-center justify-between bg-[#e5e5e5] border-b border-gray-300 rounded-t-xl px-3 py-2 cursor-move">
          <div className="flex space-x-2">
            <div
              className="no-drag w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              onClick={onClose} // Cerrar al pulsar botón rojo
              title="Close"
            ></div>
            <div
              className="no-drag w-3 h-3 rounded-full bg-yellow-400 cursor-pointer"
              onClick={onClose} // También cerrar con amarillo
              title="Close"
            ></div>
            <div
              className="no-drag w-3 h-3 rounded-full bg-green-500 cursor-pointer"
              onClick={onClose} // Y con verde también
              title="Close"
            ></div>
          </div>
          <span className="text-sm text-gray-700 font-semibold select-none">System Preferences</span>
          <div className="w-16" />
        </div>

        {/* Body */}
        <div className="flex flex-col p-4 gap-6 overflow-auto">
          {/* Wallpapers */}
          <div>
            <h3 className="font-semibold mb-2 select-none">Wallpaper</h3>
            <div className="grid grid-cols-4 gap-3">
              {wallpapers.map((wp) => (
                <div
                  key={wp}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-4 ${
                    wallpaper === wp ? "border-blue-600" : "border-transparent"
                  }`}
                  onClick={() => setWallpaper(wp)}
                >
                  <img
                    src={wp}
                    alt="Wallpaper preview"
                    className="w-full h-24 object-cover"
                    draggable={false}
                  />
                  {wallpaper === wp && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Folder Size */}
          <div>
            <h3 className="font-semibold mb-2 select-none">Folder Size</h3>
            <div className="flex gap-3">
              {folderSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setFolderSize(size)}
                  className={`px-4 py-1 rounded border ${
                    folderSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Text Size */}
          <div>
            <h3 className="font-semibold mb-2 select-none">Text Size</h3>
            <div className="flex gap-3">
              {textSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={`px-4 py-1 rounded border ${
                    textSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Rnd>
  );
}
