import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const t = localStorage.getItem('theme');
      if (t === 'dark' || t === 'light') return t;
    } catch {}
    // default: follow system preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  return (
    <nav className="w-full border-b border-white/6 bg-[#0A1A2F]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center logo-gradient text-black font-bold">
            MI
          </div>
          <div>
            <div className="text-white font-bold">MentorIA</div>
            <div className="text-xs text-[#AFCBDA]">Aprenda IA no trabalho</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/integrantes" className="hidden sm:inline-block px-3 py-2 rounded-lg text-sm text-white hover:bg-white/5 transition">Integrantes</Link>
          <Link to="/about" className="hidden sm:inline-block px-3 py-2 rounded-lg text-sm text-white hover:bg-white/5 transition">Sobre</Link>
          <Link to="/faq" className="hidden sm:inline-block px-3 py-2 rounded-lg text-sm text-white hover:bg-white/5 transition">FAQ</Link>

          <Link
            to="/chat"
            className="px-3 py-2 rounded-lg border border-white/10 text-sm text-white hover:bg-white/5 transition"
            aria-label="Abrir chat MentorIA"
          >
            Chat
          </Link>

          <button onClick={toggleTheme} aria-label="Alternar tema" title="Alternar tema" className="ml-2 px-3 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10 transition">
            {theme === 'dark' ? (
              // sun icon for light
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3.5a.75.75 0 01.75.75v1.25a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5zM10 14a4 4 0 100-8 4 4 0 000 8z" />
                <path d="M4.22 4.22a.75.75 0 011.06 0l.88.88a.75.75 0 11-1.06 1.06l-.88-.88a.75.75 0 010-1.06zM14.84 14.84a.75.75 0 011.06 0l.88.88a.75.75 0 11-1.06 1.06l-.88-.88a.75.75 0 010-1.06zM3.5 10a.75.75 0 01.75-.75h1.25a.75.75 0 010 1.5H4.25A.75.75 0 013.5 10zM14 10a.75.75 0 01.75-.75h1.25a.75.75 0 010 1.5H14.75A.75.75 0 0114 10zM4.22 15.78a.75.75 0 010-1.06l.88-.88a.75.75 0 111.06 1.06l-.88.88a.75.75 0 01-1.06 0zM14.84 5.16a.75.75 0 010-1.06l.88-.88a.75.75 0 111.06 1.06l-.88.88a.75.75 0 01-1.06 0z" />
              </svg>
            ) : (
              // moon icon for dark
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-200" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 116.707 2.707a6 6 0 0010.586 10.586z" />
              </svg>
            )}
          </button>

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
