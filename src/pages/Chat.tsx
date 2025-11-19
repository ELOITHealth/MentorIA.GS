import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";

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
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function load() {
      if (!userId) return;
      try {
        const res = await api.get(`/chat/${userId}`);
        setMessages(res.data || []);
        setTimeout(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }), 50);
      } catch (err) {
        console.error("Erro ao carregar chat:", err);
      }
    }
    load();
  }, [userId]);

  async function sendMessage() {
    if (!text.trim()) return;
    if (!userId) return alert("Usuário não encontrado.");
    try {
      const body = { pergunta: text, usuarioId: userId };
      const res = await api.post("/chat", body);
      setMessages(prev => [...prev, res.data]);
      setText("");
      setTimeout(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }), 100);
    } catch (err) {
      console.error("Erro ao enviar:", err);
      alert("Erro ao enviar mensagem.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-[#0A1A2F] text-[#E2E8F0] p-6 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-[#102A43] rounded-2xl p-5 shadow-lg border border-white/6 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">MentorIA</h1>

          <div ref={scroller} className="flex-1 overflow-y-auto p-3 bg-[#0A1A2F]/30 rounded-lg" style={{ maxHeight: "60vh" }}>
            {messages.length === 0 && <p className="text-[#AFCBDA]">Nenhuma conversa ainda — comece perguntando algo!</p>}
            <div className="flex flex-col gap-3">
              {messages.map(m => (
                <div key={m.id} className="space-y-1">
                  <div className="text-xs text-[#AFCBDA] font-semibold">Você</div>
                  <div className="self-start bg-[#0A1A2F] p-3 rounded-lg w-fit max-w-[85%]">{m.pergunta}</div>

                  <div className="text-xs text-[#AFCBDA] font-semibold mt-1">MentorIA</div>
                  <div className="self-end bg-[#3A86FF] p-3 rounded-lg w-fit text-[#0A1A2F] max-w-[85%]">{m.resposta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 p-3 rounded-lg text-black" placeholder="Digite sua pergunta..." />
            <button onClick={sendMessage} className="px-5 py-2 rounded-lg bg-[#3A86FF] text-[#0A1A2F] font-semibold">Enviar</button>
          </div>
        </div>
      </div>
    </>
  );
}
