import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";

export default function DesktopIcon({ id, icon, label, defaultPosition, onClick }) {
  const storageKey = `icon-pos-${id}`;
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setPosition(JSON.parse(saved));
    }
  }, []);

  const handleDragStop = (e, d) => {
    const newPos = { x: d.x, y: d.y };
    setPosition(newPos);
    localStorage.setItem(storageKey, JSON.stringify(newPos));
  };

  return (
    <Rnd
      size={{ width: 100, height: 120 }}
      position={position}
      onDragStop={handleDragStop}
      enableResizing={false}
      bounds="parent"
      style={{ position: "absolute" }}
    >
      <div
        className="cursor-pointer w-full text-center text-white drop-shadow-sm"
        onClick={onClick}
      >
        <img src={icon} alt={label} className="w-24 h-24 mx-auto" />
        <span className="block text-sm mt-1">{label}</span>
      </div>
    </Rnd>
  );
}
