import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Feedback() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("progress");
    const current = saved ? Number(saved) : 0;
    const newProgress = Math.min(current + 20, 100);
    localStorage.setItem("progress", newProgress.toString());
    setProgress(newProgress);
  }, []);

  const messages = [
    "Excelente! Você está se tornando um profissional do futuro 💪",
    "A IA é sua aliada — continue explorando novas ferramentas!",
    "Seu progresso está incrível, mantenha o ritmo! 🚀",
    "Cada módulo te aproxima de dominar a IA no trabalho.",
    "Você está pronto para aplicar IA em tarefas reais! 🎯",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-900 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Parabéns! 🎉</h2>
      <p className="text-lg mb-6 max-w-md">{randomMessage}</p>
      <p className="text-indigo-200 font-semibold mb-8">
        Seu progresso atual: {progress}%
      </p>
      <Link
        to="/dashboard"
        className="bg-white text-indigo-700 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
      >
        Voltar ao painel
      </Link>
    </div>
  );
}
