import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../services/api";
import type { Module } from "../types/Module";

export default function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [moduleData, setModuleData] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Buscar módulo na API real
  useEffect(() => {
    async function loadModule() {
      try {
        const res = await api.get(`/modulos/${id}`);
        setModuleData(res.data);
      } catch (err) {
        console.error("Erro ao carregar módulo:", err);
        alert("Erro ao carregar módulo!");
      }
      setLoading(false);
    }

    loadModule();
  }, [id]);

  function handleComplete() {
    let progress = Number(localStorage.getItem("progress") || "0");

    // ✔ aumenta 20% a cada módulo finalizado
    const newProgress = Math.min(progress + 20, 100);

    localStorage.setItem("progress", newProgress.toString());

    alert("Módulo concluído! 🎉");
    navigate("/dashboard");
  }

  if (loading) return <p className="text-white p-10">Carregando...</p>;
  if (!moduleData) return <p className="text-white p-10">Módulo não encontrado.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 text-white p-6">
      <div className="max-w-3xl mx-auto">

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6"
        >
          {moduleData.nome}
        </motion.h1>

        {/* Imagem */}
        {moduleData.imagem && (
          <motion.img
            src={moduleData.imagem}
            alt="Imagem do módulo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl mb-6 shadow-lg border border-white/10"
          />
        )}

        {/* Descrição */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-indigo-200 text-lg mb-4"
        >
          {moduleData.descricao}
        </motion.p>

        {/* Conteúdo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 p-6 rounded-xl border border-white/10 leading-relaxed"
        >
          {moduleData.conteudo}
        </motion.div>

        {/* Botão de concluir */}
        <motion.button
          onClick={handleComplete}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl font-semibold text-white shadow-xl"
        >
          Marcar como concluído ✔
        </motion.button>

      </div>
    </div>
  );
}
