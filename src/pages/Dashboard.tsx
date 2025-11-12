import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";

interface ModulesByProfession {
  [key: string]: string[];
}

export default function Dashboard() {
  const [profession, setProfession] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const loadData = () => {
      setProfession(localStorage.getItem("profession") || "");
      setName(localStorage.getItem("userName") || "");

      const savedProgress = localStorage.getItem("progress");
      const progressValue = savedProgress ? Number(savedProgress) : 0;

      if (isNaN(progressValue)) {
        localStorage.setItem("progress", "0");
        setProgress(0);
      } else {
        setProgress(progressValue);
      }
    };

    // Carrega os dados na primeira montagem
    loadData();

    // 🔁 Atualiza automaticamente quando o usuário volta pro Dashboard
    window.addEventListener("focus", loadData);

    // Limpa o listener ao sair da página
    return () => {
      window.removeEventListener("focus", loadData);
    };
  }, []);

  const modules: ModulesByProfession = {
    Marketing: [
      "IA para Posts Criativos",
      "Automação de Campanhas",
      "Análise de Tendências",
    ],
    RH: [
      "Análise de Currículos com IA",
      "Feedback Inteligente",
      "IA para Engajamento",
    ],
    TI: ["IA no Desenvolvimento", "Automação de Tarefas", "Análise de Logs"],
    Educação: [
      "IA no Ensino",
      "Criação de Conteúdo",
      "Avaliação Automatizada",
    ],
    Saúde: [
      "Diagnóstico Assistido",
      "Gestão Inteligente",
      "Atendimento Automatizado",
    ],
  };

  const COLORS = ["#4F46E5", "#6366F1"];

  const data = [
    { name: "Concluído", value: progress > 0 ? progress : 0.0001 },
    { name: "Restante", value: 100 - progress },
  ];

  return (
    <div className="min-h-screen bg-indigo-900 text-white flex flex-col items-center transition-all duration-300">
      <h2 className="text-4xl font-bold mt-10">Olá, {name} 👋</h2>
      <p className="text-lg mt-2 mb-6">Sua área: {profession}</p>

      {/* Barra de progresso circular */}
      <div className="mb-10">
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <p className="text-center font-semibold text-indigo-200">
          Progresso: {progress}%
        </p>
      </div>

      {/* Lista de módulos */}
      <div className="w-3/4 mt-4">
        <h3 className="text-2xl mb-4 text-center">Módulos recomendados:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules[profession]?.map((mod, index) => (
            <Link
              key={index}
              to={`/module/${index}`}
              className="bg-indigo-700 p-6 rounded-xl shadow hover:scale-105 transition text-center"
            >
              <p className="font-semibold">{mod}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
