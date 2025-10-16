import React, { useEffect, useState } from "react";

export default function Bubble({ message }) {
  const [position, setPosition] = useState({
    top: Math.random() * 70 + "%",
    left: Math.random() * 70 + "%",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        top: Math.random() * 70 + "%",
        left: Math.random() * 70 + "%",
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute bg-purple-500 text-white px-5 py-3 rounded-full shadow-lg text-center max-w-xs break-words cursor-pointer transition-all duration-1000"
      style={{ top: position.top, left: position.left }}
    >
      {message.length > 30 ? message.slice(0, 30) + "..." : message}
    </div>
  );
}
