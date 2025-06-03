
import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { text: input, sender: "You" }]);
    setInput("");
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl">
      <h2 className="text-lg font-bold mb-2">Community Chat</h2>
      <div className="h-40 overflow-y-auto bg-white dark:bg-gray-900 border rounded p-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm mb-1">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded border dark:bg-gray-700"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-black text-white px-4 rounded">Send</button>
      </div>
    </div>
  );
}
