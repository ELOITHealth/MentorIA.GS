import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Module() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [moduleName, setModuleName] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Módulos por profissão (mesmo do dashboard)
  const modulesByProfession: Record<string, string[]> = {
    Marketing: [
      "IA para Posts Criativos",
      "Automação de Campanhas",
      "Análise de Tendências",
    ],
    RH: ["Análise de Currículos com IA", "Feedback Inteligente", "IA para Engajamento"],
    TI: ["IA no Desenvolvimento", "Automação de Tarefas", "Análise de Logs"],
    Educação: ["IA no Ensino", "Criação de Conteúdo", "Avaliação Automatizada"],
    Saúde: ["Diagnóstico Assistido", "Gestão Inteligente", "Atendimento Automatizado"],
  };

  useEffect(() => {
    const prof = localStorage.getItem("profession") || "";
    const modList = modulesByProfession[prof] || [];
    setModuleName(modList[Number(id)] || "Módulo");
  }, [id]);

  // Chat IA fake simples
  const sendMessage = () => {
    if (!inputValue.trim()) return;

    // sua mensagem
    setChatMessages((prev) => [...prev, { sender: "user", text: inputValue }]);

    const userMsg = inputValue;
    setInputValue("");

    // IA responde 700ms depois
    setTimeout(() => {
      const iaReply = generateAIResponse(userMsg);
      setChatMessages((prev) => [...prev, { sender: "ai", text: iaReply }]);
    }, 700);
  };

  // Respostas simuladas da IA
  function generateAIResponse(prompt: string) {
    if (prompt.toLowerCase().includes("exemplo")) {
      return "Claro! Aqui vai um exemplo aplicado ao seu módulo.";
    }
    if (prompt.toLowerCase().includes("como usar")) {
      return "Você pode usar IA analisando situações reais e aplicando prompts estratégicos.";
    }
    return "Ótima pergunta! Pense em como esse conceito pode melhorar seu dia a dia de trabalho.";
  }

  // Concluir módulo → aumenta progresso
  const completeModule = () => {
    const current = Number(localStorage.getItem("progress") || "0");
    const newValue = Math.min(current + 20, 100);

    localStorage.setItem("progress", String(newValue));
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-indigo-900 text-white px-6 py-10">

      {/* Título */}
      <motion.h1
        className="text-4xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {moduleName}
      </motion.h1>

      {/* FOTO do módulo */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg border border-white/10 max-w-3xl">
        <img
          src="/module-photo.jpg"   // <-- coloque sua imagem na pasta public
          className="w-full h-full object-cover"
          alt="Imagem do módulo"
        />

        {/* overlay escuro */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* texto por cima */}
        <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-md">
          {moduleName}
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="mt-10 bg-white/10 p-6 rounded-xl shadow-lg border border-white/10 max-w-3xl">
        <h2 className="text-2xl font-bold mb-3">Conteúdo do módulo</h2>
        <p className="text-indigo-200 mb-4">
          Aqui você aprende os fundamentos necessários para aplicar este módulo no seu trabalho.
        </p>

        <ul className="list-disc ml-6 space-y-2 text-indigo-200">
          <li>Como usar IA no contexto deste módulo</li>
          <li>Exemplos aplicados ao dia a dia</li>
          <li>Demonstrações práticas</li>
          <li>Dicas de prompts eficientes</li>
        </ul>
      </div>

      {/* Chat IA */}
      <div className="mt-10 bg-white/10 p-6 rounded-xl shadow-lg border border-white/10 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Pratique com IA</h2>

        <div className="h-60 overflow-y-auto bg-black/20 p-4 rounded-lg mb-4 space-y-3">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-indigo-600 ml-auto"
                  : "bg-indigo-800 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 bg-indigo-950 border border-white/10 px-4 py-2 rounded-lg outline-none"
            placeholder="Pergunte algo para a IA…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-500 px-4 py-2 rounded-lg"
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Botão de Concluir */}
      <div className="max-w-3xl mt-10">
        <button
          onClick={completeModule}
          className="bg-green-500 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition"
        >
          Concluir módulo
        </button>
      </div>

      {/* Modal de sucesso */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            className="bg-white text-black p-8 rounded-xl shadow-xl text-center"
          >
            <h2 className="text-2xl font-bold">Módulo concluído! 🎉</h2>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
