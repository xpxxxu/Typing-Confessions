import React, { useState } from "react";
import Bubble from "./Bubble";

export default function App() {
  const [message, setMessage] = useState("");
  const [bubbles, setBubbles] = useState([
    "This is a test confession!",
    "I ate the last cookie 🍪",
    "I secretly like pineapple on pizza 🍍",
  ]);

  const postMessage = () => {
    if (message.trim() === "") return;
    setBubbles((prev) => [...prev, message]);
    setMessage("");
  };

  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 overflow-hidden">

      {/* Confessions */}
      {bubbles.map((b, i) => (
        <Bubble key={i} message={b} />
      ))}

      {/* Input Area */}
      <div className="absolute bottom-5 w-full px-4 flex gap-2">
        <input
          className="flex-1 px-4 py-3 rounded-full text-black text-lg"
          type="text"
          placeholder="Type your secret..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold text-lg"
          onClick={postMessage}
        >
          Post
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 overflow-hidden">
      {bubbles.map((b) => (
        <Bubble key={b.id} message={b.message} />
      ))}

      <div className="absolute bottom-5 w-full px-4 flex gap-2">
        <input
          className="flex-1 px-4 py-3 rounded-full text-black text-lg"
          type="text"
          placeholder="Type your secret..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold text-lg"
          onClick={postMessage}
        >
          Post
        </button>
      </div>
    </div>
  );
}
