import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Home() {
  useScrollReveal();
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#0B102B] to-[#0A1A2F] text-[#E2E8F0] px-6 pt-20 pb-32">
        
        {/* HERO */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
              Domine a Inteligência Artificial <br /> na sua profissão
            </h1>

            <p className="mt-6 text-[#B7C9E6] max-w-xl leading-relaxed">
              A MentorIA te ensina a usar IA no dia a dia com trilhas práticas,
              feedback inteligente e módulos feitos para sua área de atuação.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-transform cta-gradient"
              >
                Criar conta gratuita
              </Link>

              <Link
                to="/login"
                className="px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/10 transition"
              >
                Já tenho conta
              </Link>
            </div>
          </motion.div>

          {/* IMAGEM / ILUSTRAÇÃO */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <img
              src="/images/hero-ai.svg"
              alt="Ilustração MentorIA - IA no trabalho"
              className="w-full drop-shadow-2xl rounded-xl"
            />
          </motion.div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="max-w-6xl mx-auto mt-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Por que usar a MentorIA?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#AFCBDA]">
            <div className="p-5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm shadow-md text-center">
              <div className="text-3xl mb-2"></div>
              <div className="font-semibold text-white">Produtividade de outro nível</div>
            </div>

            <div className="p-5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm shadow-md text-center">
              <div className="text-3xl mb-2"></div>
              <div className="font-semibold text-white">Aplicação real no trabalho</div>
            </div>

            <div className="p-5 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm shadow-md text-center">
              <div className="text-3xl mb-2"></div>
              <div className="font-semibold text-white">Aprenda rápido e fácil</div>
            </div>
          </div>
        </section>

        {/* O QUE VOCÊ APRENDE */}
        <section className="max-w-6xl mx-auto mt-24">
          <h2 className="text-3xl font-bold mb-10 text-center">O que você vai aprender?</h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#AFCBDA] text-lg">
            <li>• Criar prompts profissionais</li>
            <li>• Automatizar tarefas repetitivas</li>
            <li>• Usar IA na sua área de atuação</li>
            <li>• Produzir documentos, análises e ideias</li>
            <li>• Aumentar sua velocidade de entrega</li>
            <li>• Aplicações reais para sua profissão</li>
          </ul>
        </section>

        {/* CTA FINAL */}
        <section className="max-w-4xl mx-auto mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para aprender IA do jeito certo?
          </h2>

          <Link
            to="/register"
            className="px-8 py-4 text-lg rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-transform inline-block cta-gradient"
          >
            Criar conta gratuita agora
          </Link>
        </section>

      </main>
    </>
  );
}
