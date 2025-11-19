import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/6 bg-[#0A1A2F]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#3A86FF] to-[#5CE1E6] text-black font-bold">
            MI
          </div>
          <div>
            <div className="text-white font-bold">MentorIA</div>
            <div className="text-xs text-[#AFCBDA]">Aprenda IA no trabalho</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden sm:inline-block px-4 py-2 rounded-lg font-medium text-[#0A1A2F] bg-[#3A86FF] hover:opacity-95 transition"
            aria-label="Ir para dashboard"
          >
            Dashboard
          </Link>

          <Link
            to="/chat"
            className="px-3 py-2 rounded-lg border border-white/10 text-sm text-white hover:bg-white/5 transition"
            aria-label="Abrir chat MentorIA"
          >
            Chat
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
            className="ml-2 px-3 py-2 rounded-lg text-sm text-[#0A1A2F] bg-[#5CE1E6] hover:opacity-95 transition"
            aria-label="Sair / resetar sessão"
            title="Sair (apaga dados locais)"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
