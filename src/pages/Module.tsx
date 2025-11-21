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
  const [error, setError] = useState(false);

  // 🔥 Buscar módulo da API real (único ponto com API no projeto)
  useEffect(() => {
    async function loadModule() {
      try {
        const res = await api.get(`/modulos/${id}`);
        setModuleData(res.data);
      } catch (err) {
        console.error("Erro ao carregar módulo:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadModule();
  }, [id]);

  function handleComplete() {
    const progress = Number(localStorage.getItem("progress") || "0");
    const newProgress = Math.min(progress + 20, 100);

    localStorage.setItem("progress", String(newProgress));

    alert("Módulo concluído! 🎉");
    navigate("/dashboard");
  }

  // 🟦 Loading elegante
  if (loading)
    return (
      <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center text-white text-xl">
        Carregando módulo...
      </div>
    );

  // 🔴 Caso o backend esteja fora do ar
  if (error)
    return (
      <div className="min-h-screen bg-[#0A1A2F] flex flex-col items-center justify-center text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Erro ao carregar módulo 😥</h1>
        <p className="text-[#AFCBDA] max-w-md">
          Não foi possível carregar os dados do módulo no momento.  
          Verifique sua API ou tente novamente mais tarde.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-6 py-3 rounded-lg bg-[#3A86FF] hover:bg-[#1E6BE6] text-white font-semibold"
        >
          Voltar ao Dashboard
        </button>
      </div>
    );

  if (!moduleData)
    return (
      <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center text-white text-xl">
        Módulo não encontrado.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B102B] to-[#0A1A2F] text-white p-6">
      <div className="max-w-3xl mx-auto">

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-6"
        >
          {moduleData.nome}
        </motion.h1>

        {/* Imagem */}
        {moduleData.imagem && (
          <motion.img
            src={moduleData.imagem}
            alt="Imagem do módulo"
            className="rounded-xl mb-6 shadow-lg border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Descrição */}
        <p className="text-[#AFCBDA] text-lg mb-4">
          {moduleData.descricao}
        </p>

        {/* Conteúdo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 p-6 rounded-xl border border-white/10 leading-relaxed shadow-lg"
        >
          {moduleData.conteudo}
        </motion.div>

        {/* Botão de concluir */}
        <motion.button
          onClick={handleComplete}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full bg-[#3A86FF] hover:bg-[#1E6BE6] transition py-3 rounded-xl font-semibold text-white shadow-xl"
        >
          ✔ Marcar como concluído
        </motion.button>
      </div>
    </div>
  );
}
