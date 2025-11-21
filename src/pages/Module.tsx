import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function ModulePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // caso alguém acesse /module/123 sem state
  if (!state) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] text-white flex flex-col items-center justify-center">
        <p className="text-lg mb-4">Módulo não encontrado.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 bg-[#3A86FF] rounded-lg"
        >
          Voltar ao Dashboard
        </button>
      </div>
    );
  }

  const { nome, descricao, conteudo } = state;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A1A2F] text-white px-6 py-10">
        <div className="max-w-4xl mx-auto">

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold mb-4"
          >
            {nome}
          </motion.h1>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[#AFCBDA] mb-6"
          >
            {descricao}
          </motion.p>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#102A43] border border-white/10 p-6 rounded-xl shadow-lg leading-relaxed"
          >
            <h2 className="text-xl font-semibold mb-3">Conteúdo do Módulo</h2>
            <p className="text-[#E2E8F0] whitespace-pre-line">
              {conteudo}
            </p>
          </motion.div>

          {/* Voltar */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-3 bg-[#3A86FF] text-[#0A1A2F] rounded-xl font-semibold hover:bg-[#1E6BE6] transition"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
