import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-sans">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            className="w-20 drop-shadow-[0_0_10px_#facc15] hover:scale-110 transition-transform"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="w-20 drop-shadow-[0_0_10px_#61dafb] hover:scale-110 transition-transform"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-5xl font-extrabold mb-4">
        🚀 Vite + React + <span className="text-yellow-300">Tailwind</span>
      </h1>

      <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-all"
        >
          count is {count}
        </button>
        <p className="mt-3 text-lg">
          Edit <code className="text-yellow-200">src/App.jsx</code> e salva pra
          testar o HMR ⚡
        </p>
      </div>

      <p className="mt-6 opacity-75">
        Click on the logos to learn more 💡
      </p>
    </div>
  );
}

export default App;
