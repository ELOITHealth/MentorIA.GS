import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 text-white text-center">
      <h1 className="text-5xl font-bold mb-4">MentorIA</h1>
      <p className="text-lg mb-8 max-w-md">
        Aprenda a usar a Inteligência Artificial como sua parceira no trabalho.
      </p>
      <Link
        to="/login"
        className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
      >
        Começar agora
      </Link>
    </div>
  );
}
