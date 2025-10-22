import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  // ✅ Use your deployed backend URL
  const BACKEND_URL = "https://ecommerce-backend-silk-theta.vercel.app";

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ No response received from the bot." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I couldn't connect to the server." },
      ]);
    }
  };

  return (
    <>
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#c586a5] text-white shadow-lg hover:bg-[#b56d94]"
        >
          <MessageCircle size={28} />
        </motion.button>
      )}

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-5 right-5 w-80 bg-white shadow-2xl rounded-xl p-4 border border-gray-200 z-50"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-700">Shopping Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-64 overflow-y-auto mb-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-[#c586a5] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              className="flex-1 border rounded-l px-2 py-1 outline-none focus:ring-1 focus:ring-[#c586a5]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
            />
            <button
              onClick={sendMessage}
              className="bg-[#c586a5] text-white px-3 rounded-r hover:bg-[#b56d94]"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Chatbot;
