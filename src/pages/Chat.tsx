import { useEffect, useState } from "react";
import { api } from "../services/api";

interface ChatMessage {
  id: number;
  usuarioId: number;
  pergunta: string;
  resposta: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const userId = Number(localStorage.getItem("userId") || "0");

  // Carregar histórico do usuário
  useEffect(() => {
    async function loadChat() {
      try {
        const res = await api.get(`/chat/${userId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Erro ao carregar chat:", err);
      }
    }

    loadChat();
  }, [userId]);

  // Enviar nova mensagem
  async function sendMessage() {
    if (!text.trim()) return;

    try {
      const body = {
        pergunta: text,
        usuarioId: userId
      };

      const res = await api.post("/chat", body);

      // Adiciona no histórico imediatamente
      setMessages((prev) => [...prev, res.data]);

      setText("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Erro ao enviar mensagem");
    }
  }

  return (
    <div className="min-h-screen bg-indigo-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">MentorIA - Chat</h1>

      <div className="bg-white/10 w-full max-w-3xl p-5 rounded-xl border border-white/10 shadow-xl flex flex-col gap-4">
        <div className="h-[400px] overflow-y-auto flex flex-col gap-4 pr-2">
          {messages.length === 0 && (
            <p className="text-indigo-200 text-center">Nenhuma conversa ainda...</p>
          )}

          {messages.map((m) => (
            <div key={m.id} className="bg-white/10 p-3 rounded-lg border border-white/10">
              <p className="font-semibold text-indigo-300">Você:</p>
              <p>{m.pergunta}</p>

              <p className="font-semibold text-indigo-300 mt-2">MentorIA:</p>
              <p>{m.resposta}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-3 rounded-lg text-black"
            placeholder="Digite sua pergunta..."
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-lg font-semibold"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
