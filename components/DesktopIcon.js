import { Rnd } from "react-rnd";
import { useRef } from "react";

export default function DesktopIcon({
  id,
  icon,
  label,
  position,
  onPositionChange,
  onClick,
  isMobile,
  folderSize,
  textSize,
}) {
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

  const folderSizesMap = {
    small: { width: 100, height: 120, imgClass: "w-16 h-16" },
    medium: { width: 140, height: 160, imgClass: "w-24 h-24" },
    large: { width: 180, height: 200, imgClass: "w-32 h-32" },
  };

  const textSizesMap = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-lg",
  };

  const size = folderSizesMap[folderSize] || folderSizesMap.medium;
  const textClass = textSizesMap[textSize] || textSizesMap.medium;

  if (position == null) return null;

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
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
        <img src={icon} alt={label} className={`${size.imgClass} mx-auto pointer-events-none`} />
        <span className="block mt-1 pointer-events-none">{label}</span>
      </div>
    </Rnd>
  );
}
