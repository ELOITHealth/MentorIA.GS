import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Aprenda a aplicar IA no trabalho",
    text: "Módulos curtos e objetivos para aplicar IA imediatamente em tarefas do dia a dia.",
    icon: "🤖",
  },
  {
    title: "Feedback prático e personalizado",
    text: "Nossa mentora IA analisa suas respostas e te dá dicas para evoluir rapidamente.",
    icon: "📈",
  },
  {
    title: "Rápido, escalável e intuitivo",
    text: "Trilhas criadas para turbinar sua produtividade com clareza e foco.",
    icon: "🚀",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem("onboardingSeen");
    if (seen === "true") navigate("/dashboard");
  }, [navigate]);

  function handleNext() {
    if (index < steps.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("onboardingSeen", "true");
      navigate("/dashboard");
    }
  }

  function handleSkip() {
    localStorage.setItem("onboardingSeen", "true");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B102B] to-[#0A1A2F] text-white flex items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold">Bem-vindo à MentorIA 🚀</h2>
          <button onClick={handleSkip} className="text-[#5CE1E6] hover:underline">
            Pular
          </button>
        </div>

        {/* SLIDE */}
        <motion.div
          key={index}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row gap-8 items-center"
        >
          {/* CARD LATERAL */}
          <div className="w-full md:w-1/3 bg-white/10 p-8 rounded-2xl shadow-md border border-white/10 text-center">
            <div className="text-6xl mb-3">{steps[index].icon}</div>
            <h3 className="text-xl font-semibold">{steps[index].title}</h3>
          </div>

          {/* TEXTO PRINCIPAL */}
          <div className="flex-1">
            <p className="text-[#B7C9E6] mb-8 leading-relaxed">{steps[index].text}</p>

            {/* INDICADORES */}
            <div className="flex items-center gap-3 mb-6">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-10 bg-[#5CE1E6]" : "w-4 bg-white/20"
                  }`}
                />
              ))}
            </div>

            {/* BOTÕES */}
            <div className="flex gap-4">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-[#3A86FF] to-[#5CE1E6]
                shadow-lg shadow-blue-900/30 hover:scale-105 transition"
              >
                {index < steps.length - 1 ? "Próximo" : "Começar"}
              </button>

              <button
                onClick={handleSkip}
                className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
              >
                Pular
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
