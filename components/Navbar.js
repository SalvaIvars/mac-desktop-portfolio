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
    <div className="fixed top-0 left-0 w-full h-12 sm:h-14 md:h-13 px-4 sm:px-6 md:px-8 flex items-center justify-between bg-gray-100/70 backdrop-blur-md border-b border-gray-300 z-50 text-base sm:text-lg md:text-xl text-black font-normal">
      {/* Left */}
      <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
        <FaApple className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        <span className="font-semibold hidden sm:inline">Salva Ivars</span>
        <span className="cursor-pointer hover:underline text-sm sm:text-base">Information</span>
        <span className="cursor-pointer hover:underline text-sm sm:text-base">Contact</span>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
        <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
        <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
        <span className="ml-2 sm:ml-3 tabular-nums tracking-tight text-xs sm:text-sm md:text-base">{time}</span>
      </div>
    </div>
  );
}
