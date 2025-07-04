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
  externalLink,
}) {
  const dragging = useRef(false);
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const clickAllowed = useRef(true);

  const navbarHeight =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 80 : 64;

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

    const clampedY = Math.max(data.y, navbarHeight);

    onPositionChange({ x: data.x, y: clampedY });
  };

  // Pointer events
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
    if (clickAllowed.current) {
      if (externalLink) {
        window.open(externalLink, "_blank", "noopener,noreferrer");
      } else if (typeof onClick === "function") {
        onClick();
      }
    }
  };

  // Touch events for mobile/tablet
  const handleTouchStart = (e) => {
    clickAllowed.current = true;
    pointerDownPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchMove = (e) => {
    const dx = Math.abs(e.touches[0].clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.touches[0].clientY - pointerDownPos.current.y);
    if (dx > 10 || dy > 10) {
      clickAllowed.current = false;
    }
  };

  const handleTouchEnd = () => {
    if (clickAllowed.current) {
      if (externalLink) {
        window.open(externalLink, "_blank", "noopener,noreferrer");
      } else if (typeof onClick === "function") {
        onClick();
      }
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
      bounds={isMobile ? { top: navbarHeight, left: 0, right: 0, bottom: 0 } : { top: navbarHeight, left: 0, right: 0, bottom: 0 }}
      style={{ position: "absolute", cursor: dragging.current ? "grabbing" : "grab" }}
    >
      <div
        className={`cursor-pointer w-full text-center text-white drop-shadow-sm select-none ${textClass}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img src={icon} alt={label} className={`${size.imgClass} mx-auto pointer-events-none`} />
<span
  className={`block mt-1 pointer-events-none text-shadow`}
  style={{
    padding: "2px 6px",
    fontWeight: "600",
    color: "white",
  }}
>
  {label}
</span>
      </div>
    </Rnd>
  );
}
