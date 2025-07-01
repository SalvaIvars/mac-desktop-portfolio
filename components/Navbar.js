import { useEffect, useState } from "react";
import { FaApple, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("es-ES", { hour12: false });
      setTime(formatted);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-12 px-6 flex items-center justify-between bg-gray-100/70 backdrop-blur-md border-b border-gray-300 z-50 text-base text-black font-normal">
      {/* Left */}
      <div className="flex items-center space-x-6">
        <FaApple className="w-8 h-8" />
        <span className="font-semibold">Salva Ivars</span>
        <span className="cursor-pointer hover:underline">Information</span>
        <span className="cursor-pointer hover:underline">Contact</span>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
        <FaInstagram className="w-5 h-5" />
        <FaEnvelope className="w-5 h-5" />
        <span className="ml-3 tabular-nums tracking-tight">{time}</span>
      </div>
    </div>
  );
}
