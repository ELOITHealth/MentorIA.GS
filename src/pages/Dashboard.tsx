import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import Navbar from "../components/Navbar";
import { mockModules } from "../data/mockModules";
import Skeleton from "../components/Skeleton";

// mapa para converter ID → nome da profissão
const professionMap: Record<number, string> = {
  1: "Tecnologia da Informação (TI)",
  2: "Marketing",
  3: "Recursos Humanos (RH)",
  4: "Educação",
  5: "Saúde",
  6: "Engenharia",
  7: "Administração",
  8: "Finanças",
  9: "Jurídico",
  10: "Logística",
};

// relaciona ID com chave do mockModules
const professionKey: Record<number, keyof typeof mockModules> = {
  1: "ti",
  2: "marketing",
  3: "rh",
  4: "educacao",
  5: "saude",
  6: "engenharia",
  7: "administracao",
  8: "financas",
  9: "juridico",
  10: "logistica",
};

// texto personalizado por profissão
const professionTheme: Record<number, string> = {
  1: "Use IA para automatizar tarefas, gerar código e acelerar desenvolvimento.",
  2: "Crie campanhas, copies e análises com IA para impulsionar resultados.",
  3: "Selecione candidatos, gere avaliações e otimize rotinas de RH com IA.",
  4: "Crie aulas, atividades e roteiros educacionais com apoio de IA.",
  5: "Use IA para triagem, registros e suporte clínico com segurança.",
  6: "Aplique IA para cálculos, simulações e otimização de processos.",
  7: "Ganhe produtividade com IA em relatórios, análises e organização.",
  8: "Use IA para análise financeira, previsões e controle de dados.",
  9: "Acelere documentos jurídicos, resumos e análises com IA.",
  10: "Otimize rotas, estoques e operações logísticas usando IA.",
};

export default function Dashboard() {
  const [name, setName] = useState("");
  const [profissaoId, setProfissaoId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    const userName = localStorage.getItem("userName") || "";
    const profId = Number(localStorage.getItem("profissaoId"));
    const savedProgress = Number(localStorage.getItem("progress") || "0");

    setName(userName);
    setProfissaoId(profId);
    setProgress(isNaN(savedProgress) ? 0 : savedProgress);

    // carregar módulos da profissão
    if (profId) {
      const key = professionKey[profId];
      setModules(mockModules[key] || []);
    }
  }, []);

  const COLORS = ["#3A86FF", "#5CE1E6"];
  const data = [
    { name: "Concluído", value: progress > 0 ? progress : 0.0001 },
    { name: "Restante", value: 100 - progress },
  ];

  if (!name || !profissaoId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1A2F] p-10 text-white">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-[#0A1A2F] text-[#E2E8F0] px-6 py-10">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold">Olá, {name} 👋</h2>

              {profissaoId && (
                <p className="text-sm text-[#AFCBDA]">
                  Profissão:{" "}
                  <span className="font-semibold text-white">{professionMap[profissaoId]}</span>
                </p>
              )}
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-[#102A43] rounded-full flex items-center justify-center text-lg font-semibold text-[#E2E8F0] border border-white/10">
                {name?.charAt(0) || "U"}
              </div>
            </motion.div>
          </div>

          {/* TEMA PERSONALIZADO */}
          {profissaoId && (
            <div className="bg-[#102A43] p-5 rounded-2xl border border-white/10 shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-2">IA aplicada à sua profissão</h3>
              <p className="text-[#AFCBDA]">{professionTheme[profissaoId]}</p>
            </div>
          )}

          {/* PROGRESSO */}
          <section className="bg-[#102A43] p-6 rounded-2xl shadow-lg border border-white/10 mb-10">
            <h3 className="text-xl font-semibold mb-3">Seu progresso total</h3>
            <ProgressBar progress={progress} />

            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-[#AFCBDA]">{progress}% concluído</p>
              <div className="w-28 h-28">
                <PieChart width={112} height={112}>
                  <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={50}
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
          </section>

          {/* CHAT */}
          <div className="flex justify-center mb-12">
            <Link
              to="/chat"
              className="px-5 py-3 rounded-xl primary-bg text-[#0A1A2F] font-semibold hover:shadow-lg transition"
            >
              Abrir MentorIA (Chat)
            </Link>
          </div>

          {/* LISTA DE MÓDULOS */}
          <section>
            <h3 className="text-2xl font-bold mb-5">Seus Módulos</h3>

            {modules.length === 0 ? (
              <p className="text-[#AFCBDA]">Nenhum módulo disponível para sua profissão.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((mod, i) => (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/module/${mod.id}`}
                      state={mod} // enviamos o módulo completo para o ModulePage
                      className="block bg-[#0A1A2F]/40 hover:bg-[#0A1A2F]/30 transition p-5 rounded-xl border border-white/10 shadow"
                    >
                      <h4 className="font-semibold text-lg">{mod.nome}</h4>
                      <p className="text-sm text-[#AFCBDA] mt-2">{mod.descricao}</p>

                      <div className="mt-4 flex items-center justify-between text-xs text-[#AFCBDA]">
                        <span>Começar</span>
                        <span>➜</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
