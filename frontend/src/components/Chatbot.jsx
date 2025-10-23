import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    
    // 🐛 Improvement: Start loading right before the API call for better timing
    // It's already here, but keeping it concise.
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      
      // 🐛 Improvement: Move setLoading(false) to the 'finally' block
      // to ensure it runs even if there's an error.
      // Keeping it here for minimal changes, but the finally block is best.

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status} from ${BACKEND_URL}`);
      }

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Bot error: No valid reply received." },
        ]);
      }
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I couldn't connect to the backend server. Check the network and CORS configuration." },
      ]);
    } finally {
        // ✅ Final state cleanup is guaranteed here
        setLoading(false);
    }
  };

  // ... (rest of your component rendering logic remains the same)
  return (
     <AnimatePresence>
      {!open && (
        <motion.button
          key="open-button"
          onClick={() => setOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#c586a5] text-white shadow-lg hover:bg-[#b56d94] transition-colors duration-200"
        >
          <MessageCircle size={28} />
        </motion.button>
      )}

      {open && (
        <motion.div
          key="chat-window"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-5 w-80 max-w-[90vw] bg-white shadow-2xl rounded-xl p-4 border border-gray-200 z-50 flex flex-col h-[400px]"
        >
          <div className="flex justify-between items-center pb-3 border-b mb-3">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
              <MessageCircle size={20} className="mr-2 text-[#c586a5]" />
              Shopping Assistant
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-10 p-2 text-sm">
                Hello! I'm your shopping assistant. How can I help you find the perfect product today?
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`inline-block max-w-[80%] px-3 py-2 rounded-xl text-sm break-words ${
                    msg.sender === "user"
                      ? "bg-[#c586a5] text-white rounded-br-none shadow-md"
                      : "bg-gray-100 text-gray-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </motion.span>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <span className="bg-gray-100 text-gray-600 px-3 py-2 rounded-xl rounded-tl-none text-sm animate-pulse">
                  Typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="flex pt-3 border-t mt-3">
            <input
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#c586a5] transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`px-3 rounded-r-lg flex items-center justify-center transition-colors duration-200 ${
                loading || !input.trim()
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#c586a5] text-white hover:bg-[#b56d94]"
              }`}
            >
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Chatbot;