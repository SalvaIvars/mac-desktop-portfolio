import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";

export default function TextEditWindow({ onClose, children }) {
  const storageKey = "window-pos-about";
  const [position, setPosition] = useState(null);

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

  return (
    <Rnd
      position={position}
      size={{ width: 600, height: 520 }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      onDragStop={handleDragStop}
      className="z-40"
      enableResizing={false}
    >
      <div
        className="w-full h-full flex flex-col bg-[#f2f2f2] shadow-md rounded-xl border border-gray-300 font-sans"
        style={{ fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#e5e5e5] border-b border-gray-300 rounded-t-xl">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-700">About Me.txt</span>
          <div className="w-16" />
        </div>

        {/* Toolbar */}
        <div className="flex items-center px-3 py-2 gap-[6px] bg-[#dedede] border-b border-gray-300 text-sm text-gray-800">
          <select
            disabled
            className="px-1.5 py-0.5 border border-gray-300 rounded text-sm bg-white text-gray-800 cursor-default pointer-events-none"
          >
            <option>Helvetica Neue</option>
          </select>
          <select
            disabled
            className="px-1.5 py-0.5 border border-gray-300 rounded text-sm bg-white text-gray-800 cursor-default pointer-events-none"
          >
            <option>Regular</option>
          </select>
          <select
            disabled
            className="px-1.5 py-0.5 border border-gray-300 rounded text-sm bg-white text-gray-800 cursor-default pointer-events-none"
          >
            <option>18</option>
          </select>

          <div className="flex items-center gap-1 ml-1">
            <div className="w-5 h-5 bg-black border border-gray-300 rounded-sm pointer-events-none cursor-default" />
            <div className="w-5 h-5 border border-gray-300 rounded-sm relative pointer-events-none cursor-default">
              <div className="absolute top-1/2 left-1/2 w-4 h-[2px] bg-red-600 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            </div>
          </div>

          <div className="flex gap-1 ml-1">
            <button
              disabled
              className="font-bold w-5 h-5 border border-gray-300 rounded-sm bg-white text-black cursor-default pointer-events-none"
            >
              B
            </button>
            <button
              disabled
              className="italic w-5 h-5 border border-gray-300 rounded-sm bg-white text-black cursor-default pointer-events-none"
            >
              I
            </button>
            <button
              disabled
              className="underline w-5 h-5 border border-gray-300 rounded-sm bg-white text-black cursor-default pointer-events-none"
            >
              U
            </button>
          </div>

          <div className="flex gap-1 ml-1">
            <div className="w-5 h-5 border border-gray-300 rounded-sm bg-white pointer-events-none cursor-default" />
            <div className="w-5 h-5 border border-gray-300 rounded-sm bg-white pointer-events-none cursor-default" />
            <div className="w-5 h-5 border border-gray-300 rounded-sm bg-white pointer-events-none cursor-default" />
          </div>

          <div className="ml-auto flex gap-1 items-center">
            <select
              disabled
              className="px-1 py-0.5 border border-gray-300 text-xs rounded-sm bg-white text-gray-800 cursor-default pointer-events-none"
            >
              <option>1.0</option>
            </select>
            <div className="w-5 h-5 border border-gray-300 bg-white rounded-sm pointer-events-none cursor-default" />
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 px-6 py-4 text-[18px] font-normal leading-[1.6] text-black overflow-auto whitespace-pre-wrap bg-white rounded-b-xl">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
