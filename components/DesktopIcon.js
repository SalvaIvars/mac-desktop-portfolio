import { Rnd } from "react-rnd";
import { useRef } from "react";

export default function DesktopIcon({ id, icon, label, position, onPositionChange, onClick, isMobile }) {
  const dragging = useRef(false);
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const clickAllowed = useRef(true);

  const handleDragStart = (e, data) => {
    dragging.current = true;
    clickAllowed.current = true;
    pointerDownPos.current = { x: data.x, y: data.y };
    document.body.style.cursor = "grabbing";
  };

  const handleDragStop = (e, data) => {
    dragging.current = false;
    document.body.style.cursor = "default";

    const dx = Math.abs(data.x - pointerDownPos.current.x);
    const dy = Math.abs(data.y - pointerDownPos.current.y);
    const moved = dx > 10 || dy > 10;

    clickAllowed.current = !moved;

    onPositionChange({ x: data.x, y: data.y });
  };

  const handlePointerDown = (e) => {
    clickAllowed.current = true;
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);
    if (dx > 10 || dy > 10) {
      clickAllowed.current = false;
    }
  };

  const handlePointerUp = () => {
    if (clickAllowed.current && typeof onClick === "function") {
      onClick();
    }
  };

  // Si es móvil o tablet, iconos más grandes
  const iconWidth = isMobile ? 120 : 160;
  const iconHeight = isMobile ? 140 : 180;
  const imgClass = isMobile ? "w-28 h-28" : "w-28 h-28";
  const textClass = isMobile ? "text-lg" : "text-base";

  if (position == null) return null;

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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <img src={icon} alt={label} className={`${imgClass} mx-auto pointer-events-none`} />
        <span className="block mt-1 pointer-events-none">{label}</span>
      </div>
    </Rnd>
  );
}
