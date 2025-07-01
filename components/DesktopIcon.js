import { Rnd } from "react-rnd";
import { useEffect, useState, useRef } from "react";

export default function DesktopIcon({ id, icon, label, defaultPosition, onClick }) {
  const storageKey = `icon-pos-${id}`;
  const [position, setPosition] = useState(defaultPosition);
  const dragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const clickAllowed = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setPosition(JSON.parse(saved));
    }
  }, []);

  const handleDragStart = (e, data) => {
    dragging.current = true;
    clickAllowed.current = true;
    dragStartPos.current = { x: data.x, y: data.y };
    document.body.style.cursor = "grabbing";
  };

  const handleDragStop = (e, data) => {
    dragging.current = false;
    document.body.style.cursor = "default";

    const dx = Math.abs(data.x - dragStartPos.current.x);
    const dy = Math.abs(data.y - dragStartPos.current.y);
    const moved = dx > 5 || dy > 5;

    if (moved) {
      clickAllowed.current = false;
    } else {
      clickAllowed.current = true;
    }

    const newPos = { x: data.x, y: data.y };
    setPosition(newPos);
    localStorage.setItem(storageKey, JSON.stringify(newPos));
  };

  const handleClick = () => {
    if (clickAllowed.current && typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <Rnd
      size={{ width: 100, height: 120 }}
      position={position}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      enableResizing={false}
      bounds="parent"
      style={{ position: "absolute", cursor: dragging.current ? "grabbing" : "grab" }}
    >
      <div
        className="cursor-pointer w-full text-center text-white drop-shadow-sm select-none"
        onClick={handleClick}
      >
        <img src={icon} alt={label} className="w-24 h-24 mx-auto pointer-events-none" />
        <span className="block text-sm mt-1 pointer-events-none">{label}</span>
      </div>
    </Rnd>
  );
}
