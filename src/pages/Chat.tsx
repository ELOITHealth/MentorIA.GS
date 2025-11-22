import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";

interface ChatMessage {
  id: number;
  usuarioId: number;
  pergunta: string;
  resposta: string;
}

function generateLocalReply(text: string) {
  const t = text.toLowerCase();

  // saudações
  if (/\b(oi|olá|ola|bom dia|boa tarde|boa noite|eai|opa)\b/.test(t)) {
    return "Olá! 😊 Em que posso ajudar hoje? Você tem alguma dúvida específica sobre os módulos ou precisa de um resumo rápido?";
  }

  // dúvidas gerais
  if (t.includes("duvida") || t.includes("dúvida") || t.includes("pergunta") || t.includes("?")) {
    return "Pode me descrever melhor sua dúvida? Posso ajudar com passos, exemplos e links rápidos.";
  }
  // perguntas sobre como fazer algo (foco: IA no trabalho)
  if (t.includes("como") && (t.includes("fazer") || t.includes("usar") || t.includes("aplicar"))) {
    return "Explique o contexto (ex.: e-mails, planilhas, atendimento, relatórios) e eu descrevo passos práticos usando IA — por exemplo, gerar modelos de e-mail, resumir documentos ou criar prompts para extrair dados.";
  }

  // perguntas específicas sobre IA / inteligência artificial
  if (t.includes("ia") || t.includes("inteligencia") || t.includes("inteligência")) {
    return (
      "Posso ajudar a aplicar IA no trabalho. Exemplos: automatizar respostas de e-mail, resumir documentos longos, extrair insights de planilhas, gerar templates de texto, automatizar classificação de tarefas. " +
      "Se quiser, peça um exemplo específico (ex.: 'me mostre um prompt para resumir um relatório') e eu te passo o passo a passo."
    );
  }

  // pedidos por exemplos ou templates
  if (t.includes("exemplo") || t.includes("exemplos") || t.includes("modelo") || t.includes("template")) {
    return (
      "Posso fornecer exemplos práticos: \n- Template de e-mail para follow-up\n- Prompt para resumir reuniões\n- Prompt para gerar checklist de revisão\n- Fórmula/automação para planilha.\nDiga qual exemplo você quer e eu gero na hora."
    );
  }

  // dicas de prompt engineering
  if (t.includes("prompt")) {
    return (
      "Dica rápida para prompts: seja específico sobre o formato (títulos, bullets), forneça contexto e exemplos, e peça por 2-3 variações. Ex.: 'Resuma este texto em 3 bullets com tom formal'." 
    );
  }

  // resposta padrão curta pedindo mais contexto
  if (t.length < 30) {
    return "Interessante — pode dar um pouco mais de contexto (ex.: 'em e-mails', 'em planilhas', 'atendimento ao cliente') para eu ajudar com sugestões práticas?";
  }

  // default
  return "Não captei tudo — conte um pouco mais do contexto (qual ferramenta, qual objetivo) e eu respondo com um passo a passo ou um prompt pronto.";
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
        console.warn("API chat load failed, using localStorage fallback.", err);
        // fallback: load from localStorage
        try {
          const raw = localStorage.getItem(`chat-${userId}`);
          if (raw) setMessages(JSON.parse(raw));
        } catch (e) {
          setMessages([]);
        }
      }
    }
    load();
  }, [userId]);

  async function sendMessage() {
    if (!text.trim()) return;
    if (!userId) return alert("Usuário não encontrado.");

    const pergunta = text.trim();

    // optimistic local message while we try API
    const tempId = Date.now();
    const tempMessage: ChatMessage = { id: tempId, usuarioId: userId, pergunta, resposta: "..." };
    setMessages((prev) => [...prev, tempMessage]);
    setText("");
    setTimeout(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }), 100);

    try {
      const body = { pergunta, usuarioId: userId };
      const res = await api.post("/chat", body);
      // replace temp message with server response
      setMessages((prev) => prev.map((m) => (m.id === tempId ? res.data : m)));
      // persist to localStorage as backup
      try {
        const next = [...(messages || []), res.data];
        localStorage.setItem(`chat-${userId}`, JSON.stringify(next));
      } catch {}
    } catch (err) {
      console.warn("API send failed, using local responder.", err);
      const reply = generateLocalReply(pergunta);
      const newMsg: ChatMessage = { id: tempId, usuarioId: userId, pergunta, resposta: reply };
      setMessages((prev) => prev.map((m) => (m.id === tempId ? newMsg : m)));
      // save to localStorage
      try {
        const raw = localStorage.getItem(`chat-${userId}`);
        const arr = raw ? JSON.parse(raw) : [];
        arr.push(newMsg);
        localStorage.setItem(`chat-${userId}`, JSON.stringify(arr));
      } catch {}
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
              {messages.map((m) => (
                <div key={m.id} className="space-y-1">
                  <div className="text-xs text-[#AFCBDA] font-semibold">Você</div>
                  <div className="self-start bg-[#0A1A2F] p-3 rounded-lg w-fit max-w-[85%]">{m.pergunta}</div>

                  <div className="text-xs text-[#AFCBDA] font-semibold mt-1">MentorIA</div>
                  <div className="self-end primary-bg p-3 rounded-lg w-fit text-[#0A1A2F] max-w-[85%]">{m.resposta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 p-3 rounded-lg text-black" placeholder="Digite sua pergunta..." />
            <button onClick={sendMessage} className="px-5 py-2 rounded-lg primary-bg text-[#0A1A2F] font-semibold">Enviar</button>
          </div>
        </div>
      </div>
    </>
  );
}
