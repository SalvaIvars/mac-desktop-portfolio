import { Rnd } from "react-rnd";
import { useRef } from "react";

export default function DesktopIcon({ id, icon, label, position, onPositionChange, onClick, isMobile }) {
  const dragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const clickAllowed = useRef(true);

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

    clickAllowed.current = !moved;

    onPositionChange({ x: data.x, y: data.y });
  };

  const handleClick = () => {
    if (clickAllowed.current && typeof onClick === "function") {
      onClick();
    }
  };

  const iconWidth = typeof window !== "undefined" && window.innerWidth < 640 ? 90 : 100;
  const iconHeight = typeof window !== "undefined" && window.innerWidth < 640 ? 110 : 120;
  const imgClass = typeof window !== "undefined" && window.innerWidth < 640 ? "w-20 h-20" : "w-24 h-24";
  const textClass = typeof window !== "undefined" && window.innerWidth < 640 ? "text-base" : "text-sm";

  if (position == null) return null; // evitar renderizar sin posición

  return (
    <Rnd
      size={{ width: iconWidth, height: iconHeight }}
      position={position}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      enableResizing={false}
      bounds={isMobile ? "window" : "parent"}
      style={{ position: "absolute", cursor: dragging.current ? "grabbing" : "grab" }}
    >
      <div
        className={`cursor-pointer w-full text-center text-white drop-shadow-sm select-none ${textClass}`}
        onClick={handleClick}
      >
        <img src={icon} alt={label} className={`${imgClass} mx-auto pointer-events-none`} />
        <span className="block mt-1 pointer-events-none">{label}</span>
      </div>
    </Rnd>
  );
}
