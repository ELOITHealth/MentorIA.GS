import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Message {
  sender: "user" | "ia";
  text: string;
}

export default function Module() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const profession = localStorage.getItem("profession");

  useEffect(() => {
    const intro = [
      { sender: "ia", text: `Olá! Sou sua mentora virtual. Hoje falaremos sobre o módulo ${id}.` },
      { sender: "ia", text: `Como você acha que a IA pode ajudar na área de ${profession}?` },
    ];
    setMessages(intro);
  }, [id, profession]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];

    const iaReply = {
      sender: "ia",
      text:
        input.toLowerCase().includes("não") || input.toLowerCase().includes("n sei")
          ? "Sem problema! Vou te mostrar um exemplo prático de uso da IA nessa área. 💡"
          : "Ótimo! Você está no caminho certo. Vamos aprofundar um pouco mais...",
    };

    setMessages([...newMessages, iaReply]);
    setInput("");

    if (newMessages.length > 6) {
      setTimeout(() => navigate("/feedback"), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-900 text-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-4">Mentora Virtual 💬</h2>

      <div className="bg-indigo-800 w-full md:w-1/2 p-6 rounded-xl shadow-lg text-lg space-y-4 overflow-y-auto max-h-[60vh]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[80%] ${
              msg.sender === "ia" ? "bg-indigo-600 self-start" : "bg-white text-indigo-700 self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex mt-6 gap-2 w-full md:w-1/2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva sua resposta..."
          className="flex-1 px-4 py-2 rounded text-black"
        />
        <button
          onClick={handleSend}
          className="bg-white text-indigo-700 px-4 py-2 rounded font-semibold hover:scale-105 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
