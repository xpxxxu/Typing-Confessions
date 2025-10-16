import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import Bubble from "./Bubble";

export default function App() {
  const [message, setMessage] = useState("");
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "confessions"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date();
      const freshBubbles = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const age = now - data.timestamp?.toDate();
        if (age < 24 * 60 * 60 * 1000) {
          freshBubbles.push({ id: docSnap.id, message: data.message });
        } else {
          deleteDoc(doc(db, "confessions", docSnap.id));
        }
      });
      setBubbles(freshBubbles);
    });
    return () => unsubscribe();
  }, []);

  const postMessage = async () => {
    if (message.trim() === "") return;
    await addDoc(collection(db, "confessions"), {
      message,
      timestamp: serverTimestamp(),
    });
    setMessage("");
  };

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