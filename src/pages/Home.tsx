import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center flex flex-col items-center">

        {/* TÍTULO PRINCIPAL */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Eleve seu trabalho com Inteligência Artificial  
        </motion.h1>

        {/* SUBTEXTO */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-lg md:text-xl text-indigo-200 max-w-3xl"
        >
          O MentorIA guia você passo a passo para dominar IA no seu trabalho:
          produtividade, automação, escrita, análise de dados e muito mais.
        </motion.p>

        {/* BOTÕES */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/onboarding")}
            className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl shadow-md hover:scale-105 transition text-lg"
          >
            Criar Conta
          </button>

          <Link
            to="/login"
            className="border border-white/40 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition text-lg flex items-center justify-center"
          >
            Entrar
          </Link>
        </motion.div>

        {/* BENEFÍCIOS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/10 p-6 rounded-xl shadow border border-white/10"
          >
            <h3 className="font-bold text-xl">Treinamento Personalizado</h3>
            <p className="text-indigo-200 mt-2 text-sm">
              Conteúdo adaptado à sua área de trabalho e nível de conhecimento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 p-6 rounded-xl shadow border border-white/10"
          >
            <h3 className="font-bold text-xl">Prática com IA</h3>
            <p className="text-indigo-200 mt-2 text-sm">
              Interaja com uma IA simulada para aprender prompts e técnicas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white/10 p-6 rounded-xl shadow border border-white/10"
          >
            <h3 className="font-bold text-xl">Trilhas rápidas</h3>
            <p className="text-indigo-200 mt-2 text-sm">
              Módulos curtos e práticos para aplicar IA no dia a dia.
            </p>
          </motion.div>
        </div>

        {/* RODAPÉ */}
        <footer className="mt-20 text-indigo-300 text-sm">
          © {new Date().getFullYear()} MentorIA — Aprendizado com Inteligência
        </footer>
      </div>
    </div>
  );
}
