import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    // marca que abriu o onboarding (opcional) e vai pro onboarding
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: hero */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow">
            MentorIA
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-indigo-100 max-w-xl">
            Aprenda a usar a Inteligência Artificial como sua parceira no trabalho.
            Treinamentos personalizados, feedbacks práticos e recomendações para aplicar IA no dia a dia.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleStart}
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transform transition"
            >
              Começar agora
            </button>

            <Link
              to="/login"
              className="border border-white/30 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-white/10 transition"
            >
              Entrar
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-sm text-indigo-100">
            <div className="space-y-1">
              <p className="font-semibold">Para empresas</p>
              <p className="text-xs">Treinamentos escaláveis e métricas reais</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Para profissionais</p>
              <p className="text-xs">Domine prompts, automação e IA aplicada</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Rápido e prático</p>
              <p className="text-xs">Módulos curtos com feedbacks acionáveis</p>
            </div>
          </div>
        </motion.div>

        {/* Right: preview card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1 w-full max-w-md"
        >
          <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-indigo-100">Dashboard • MentorIA</p>
                <h3 className="font-semibold text-white">Progresso do aprendizado</h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-200">Conta</p>
                <p className="font-medium">Vitor</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300" style={{ width: "35%" }} />
              </div>
              <div className="flex justify-between text-xs text-indigo-200 mt-2">
                <span>35% concluído</span>
                <span>3/9 módulos</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-indigo-800/40 p-3 rounded-lg">
                <p className="text-sm font-semibold">IA para Escrita</p>
                <p className="text-xs text-indigo-200">Dicas rápidas para e-mails e relatórios</p>
              </div>
              <div className="bg-indigo-800/40 p-3 rounded-lg">
                <p className="text-sm font-semibold">Automação de Tarefas</p>
                <p className="text-xs text-indigo-200">Use IA para repetir processos manuais</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-indigo-600/80 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition">Ver dashboard</button>
              <button className="px-3 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition">Compartilhar</button>
            </div>
          </div>

          <p className="text-xs text-indigo-200 mt-4">Demo UI — funcionalidade completa disponível no protótipo.</p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-indigo-200">
          <div>© {new Date().getFullYear()} MentorIA</div>
          <div className="text-sm">MentorIA — Aprendizado inteligente para o futuro do trabalho</div>
        </div>
      </footer>
    </div>
  );
}
