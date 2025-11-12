import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Module() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);

  const profession = localStorage.getItem("profession");

  const lessons: { [key: string]: string[][] } = {
    Marketing: [
      [
        "Oi! Vamos aprender sobre IA para Posts Criativos.",
        "Você costuma usar IA para gerar ideias de conteúdo?",
      ],
      [
        "A IA pode sugerir legendas e hashtags otimizadas automaticamente!",
        "Experimente pedir: 'Crie um post sobre sustentabilidade para o Instagram da minha marca.'",
      ],
    ],
    RH: [
      [
        "Olá! Vamos ver como a IA pode ajudar na seleção de currículos.",
        "Sabia que ela pode resumir perfis e comparar competências?",
      ],
      [
        "Exemplo: 'Compare o currículo de dois candidatos e mostre quem se encaixa melhor no perfil da vaga.'",
      ],
    ],
    // Adicione outras profissões se quiser
  };

  useEffect(() => {
    const initial = lessons[profession || "Marketing"][Number(id)] || [];
    setMessages(initial);
  }, [profession, id]);

  const handleNext = () => {
    if (step < messages.length - 1) setStep(step + 1);
    else navigate("/feedback");
  };

  return (
    <div className="min-h-screen bg-indigo-900 text-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-4">Mentora Virtual 💬</h2>
      <div className="bg-indigo-800 w-full md:w-1/2 p-6 rounded-xl shadow-lg text-lg space-y-4">
        <p>{messages[step]}</p>
      </div>

      <button
        onClick={handleNext}
        className="mt-8 bg-white text-indigo-700 font-semibold px-6 py-2 rounded-lg shadow hover:scale-105 transition"
      >
        Próximo
      </button>
    </div>
  );
}
