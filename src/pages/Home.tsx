import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#0B102B] to-[#0A1A2F] text-[#E2E8F0] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* TEXTO */}
          <motion.section
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
              Domine a Inteligência Artificial <br /> no seu trabalho
            </h1>

            <p className="mt-6 text-[#B7C9E6] max-w-xl leading-relaxed">
              MentorIA te guia com trilhas práticas, feedback inteligente e
              exemplos reais aplicados à sua profissão. Aprenda em módulos curtos
              e aumente sua produtividade rapidamente.
            </p>

            {/* BOTÕES */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              {/* BOTÃO PRINCIPAL — COMEÇAR */}
              <Link
                to="/onboarding"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold
                text-white bg-gradient-to-r from-indigo-500 to-blue-500
                shadow-lg shadow-indigo-900/40 hover:scale-105 transition-transform"
              >
                Começar agora
              </Link>

            </div>

            {/* FEATURE CARDS */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#AFCBDA]">
              <div className="p-5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm shadow-md">
                <div className="font-semibold text-white">Trilhas práticas</div>
                <div className="mt-1 text-xs">Módulos diretos ao ponto</div>
              </div>

              <div className="p-5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm shadow-md">
                <div className="font-semibold text-white">Mentoria IA</div>
                <div className="mt-1 text-xs">Chat orientado por IA</div>
              </div>

              <div className="p-5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm shadow-md">
                <div className="font-semibold text-white">Resultados reais</div>
                <div className="mt-1 text-xs">Métricas de progresso</div>
              </div>
            </div>
          </motion.section>

          {/* PAINEL DE PREVIEW */}
          <motion.aside
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="text-sm text-[#BFD7F2]">Preview</div>

              <div className="mt-5">
                {/* gráfico demo */}
                <div className="h-48 rounded-xl bg-gradient-to-br from-[#162A45] to-[#0A1A2F]
                border border-white/10 p-5 flex flex-col justify-between shadow-inner">
                  <div>
                    <p className="text-xs text-[#AFCBDA]">Dashboard • MentorIA</p>
                    <p className="text-lg font-semibold mt-2">Progresso de aprendizado</p>
                  </div>

                  <div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "42%",
                          background: "linear-gradient(90deg,#3A86FF,#5CE1E6)",
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#AFCBDA] mt-2">
                      <span>42% concluído</span>
                      <span>3/9 módulos</span>
                    </div>
                  </div>
                </div>

                {/* mini cards */}
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-inner">
                    IA para Escrita
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg border border-white/10 shadow-inner">
                    Automação de Tarefas
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </>
  );
}
