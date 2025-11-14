import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Aprenda a aplicar IA no trabalho",
    text: "Módulos curtos e objetivos para aplicar IA em tarefas do dia a dia — e-mails, planilhas, atendimento e muito mais.",
    icon: "🤖",
  },
  {
    title: "Feedback prático e personalizado",
    text: "Nossa mentora IA analisa suas respostas e dá dicas práticas para melhorar rapidamente.",
    icon: "📈",
  },
  {
    title: "Rápido, acessível e escalável",
    text: "Trilhas para equipes e profissionais com relatórios que provam o impacto em produtividade.",
    icon: "🚀",
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // se já viu o onboarding, redireciona
    const seen = localStorage.getItem("onboardingSeen");
    if (seen === "true") navigate("/login");
  }, [navigate]);

  const handleNext = () => {
    if (index < steps.length - 1) {
      setIndex((s) => s + 1);
    } else {
      localStorage.setItem("onboardingSeen", "true");
      navigate("/login");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboardingSeen", "true");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold">Bem-vindo à MentorIA</h2>
            <p className="text-sm text-indigo-200">Um passo rápido para começar a aprender com IA</p>
          </div>
          <button onClick={handleSkip} className="text-sm text-indigo-200 hover:underline">
            Pular
          </button>
        </div>

        <motion.div
          key={index}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <div className="flex-none bg-indigo-800/30 rounded-xl p-6 text-center w-full md:w-1/3">
            <div className="text-6xl mb-2">{steps[index].icon}</div>
            <h3 className="text-xl font-semibold">{steps[index].title}</h3>
          </div>

          <div className="flex-1">
            <p className="text-indigo-200 mb-6">{steps[index].text}</p>

            <div className="flex items-center gap-3">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full ${i === index ? "w-10 bg-indigo-400" : "w-4 bg-white/20"}`}
                />
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={handleNext} className="bg-indigo-500 px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
                {index < steps.length - 1 ? "Próximo" : "Começar"}
              </button>
              <button onClick={handleSkip} className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5">
                Pular
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
