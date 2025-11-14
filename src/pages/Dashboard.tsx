import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";

interface ModulesByProfession {
  [key: string]: string[];
}

export default function Dashboard() {
  const [profession, setProfession] = useState("");
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProfession(localStorage.getItem("profession") || "");
    setName(localStorage.getItem("userName") || "");

    const savedProgress = Number(localStorage.getItem("progress") || "0");
    setProgress(isNaN(savedProgress) ? 0 : savedProgress);
  }, []);

  const modules: ModulesByProfession = {
    Marketing: [
      "IA para Posts Criativos",
      "Automação de Campanhas",
      "Análise de Tendências",
    ],
    RH: ["Análise de Currículos", "Feedback Inteligente", "Engajamento com IA"],
    TI: ["IA no Desenvolvimento", "Automação de Tarefas", "Análise de Logs"],
    Educação: ["IA no Ensino", "Criação de Conteúdo", "Avaliação Automatizada"],
    Saúde: ["Diagnóstico Assistido", "Gestão Inteligente", "Atendimento IA"],
  };

  const COLORS = ["#4F46E5", "#6366F1"];

  const data = [
    { name: "Concluído", value: progress > 0 ? progress : 0.0001 },
    { name: "Restante", value: 100 - progress },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold">Olá, {name} 👋</h2>
          <p className="text-indigo-200">Profissão: {profession}</p>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl shadow-lg border border-white/10"
        >
          {name.charAt(0)}
        </motion.div>
      </div>

      {/* Progress Area */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg border border-white/10">
          <h3 className="text-xl font-semibold mb-4">Seu progresso total</h3>

          <ProgressBar progress={progress} />

          <p className="mt-2 text-indigo-200">{progress}% concluído</p>

          {/* Pie chart */}
          <div className="flex justify-center mt-6">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>

      {/* Modules section */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Módulos recomendados</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules[profession]?.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/module/${i}`}
                className="block bg-white/10 hover:bg-white/20 transition p-6 rounded-xl shadow-lg border border-white/10"
              >
                <h4 className="font-semibold">{mod}</h4>
                <p className="text-xs text-indigo-200 mt-1">
                  Clique para começar
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
