import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Feedback() {
  const [progress, setProgress] = useState<number>(30);

  useEffect(() => {
    const newProgress = Math.min(progress + 20, 100);
    setProgress(newProgress);
    localStorage.setItem("progress", newProgress.toString());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-900 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Parabéns! 🎉</h2>
      <p className="text-lg mb-6 max-w-md">
        Você concluiu mais um módulo de aprendizado. Continue praticando e
        descubra novas formas de usar a IA no seu dia a dia profissional!
      </p>
      <p className="text-indigo-200 font-semibold mb-8">
        Seu progresso atual: {progress}%
      </p>

      <Link
        to="/dashboard"
        className="bg-white text-indigo-700 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
      >
        Voltar ao painel
      </Link>
    </div>
  );
}
