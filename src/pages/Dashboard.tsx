import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import Navbar from "../components/Navbar";
import type { Module } from "../types/Module";

// 🔵 AGORA NÃO EXISTE API — MÓDULOS SÃO LIDOS DO LOCALSTORAGE
// (você deve salvar os módulos no localStorage quando cadastrar)
const getLocalModules = () => {
  try {
    const data = localStorage.getItem("modules");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const normalize = (str = "") =>
  String(str)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function Dashboard() {
  const [profession, setProfession] = useState("");
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    // 🔵 Carrega dados locais do usuário
    setProfession(localStorage.getItem("profession") || "");
    setName(localStorage.getItem("userName") || "");

    const savedProgress = Number(localStorage.getItem("progress") || "0");
    setProgress(isNaN(savedProgress) ? 0 : savedProgress);
  }, []);

  // 🔵 Carrega os módulos do localStorage
  useEffect(() => {
    const allModules = getLocalModules();
    const profNorm = normalize(profession);

    const filtered = allModules.filter(
      (m: Module) => normalize(m.profissao) === profNorm
    );

    setModules(filtered);
  }, [profession]);

  const COLORS = ["#3A86FF", "#5CE1E6"];
  const data = [
    { name: "Concluído", value: progress > 0 ? progress : 0.0001 },
    { name: "Restante", value: 100 - progress },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-[#0A1A2F] text-[#E2E8F0] px-6 py-10">
        <div className="max-w-6xl mx-auto">

          {/* CABEÇALHO */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold">
                Olá, {name} 👋
              </h2>
              <p className="text-sm text-[#AFCBDA]">Profissão: {profession}</p>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-[#102A43] rounded-full flex items-center justify-center text-lg font-semibold text-white border border-white/10">
                {name?.charAt(0) || "U"}
              </div>
            </motion.div>
          </div>

          {/* PROGRESSO TOTAL */}
          <section className="bg-[#102A43] p-6 rounded-2xl shadow-lg border border-white/10 mb-8">
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

          {/* BOTÃO DO CHAT */}
          <div className="flex justify-center mb-8">
            <Link
              to="/chat"
              className="px-6 py-3 rounded-xl bg-[#3A86FF] text-white font-semibold 
              hover:bg-[#1E6BE6] hover:scale-105 transition shadow-lg"
            >
              Abrir MentorIA (Chat)
            </Link>
          </div>

          {/* MÓDULOS */}
          <section>
            <h3 className="text-2xl font-bold mb-5">Módulos recomendados</h3>

            {modules.length === 0 ? (
              <p className="text-[#AFCBDA]">
                Nenhum módulo encontrado para sua profissão…
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((mod, i) => (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={`/module/${mod.id}`}
                      className="block bg-[#0A1A2F]/40 hover:bg-[#0A1A2F]/20 
                      transition p-5 rounded-xl border border-white/10 shadow-lg"
                    >
                      <h4 className="font-semibold text-lg text-white">
                        {mod.nome}
                      </h4>

                      <p className="text-sm text-[#AFCBDA] mt-2 line-clamp-3">
                        {mod.descricao ||
                          mod.conteudo?.slice(0, 120)}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-[#5CE1E6]">Começar</span>
                        <span className="text-xs text-[#5CE1E6]">➜</span>
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
