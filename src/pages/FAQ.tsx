import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function FAQ() {
  const faqs = [
    {
      q: "Como uso os módulos?",
      a: "Acesse o dashboard e clique no módulo desejado para abrir o conteúdo e marcar como concluído.",
    },
    {
      q: "Como interajo com o MentorIA (chat)?",
      a: "Use a página de Chat para enviar perguntas; as respostas são salvas no histórico.",
    },
    {
      q: "Posso contribuir com o projeto?",
      a: "Sim — abra um PR no repositório com suas melhorias e coloque seu nome na página de integrantes.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-900 to-indigo-700 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="text-sm px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10">← Voltar ao menu</Link>
          </div>

          <h1 className="text-4xl font-bold mb-6">FAQ / Perguntas Frequentes</h1>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg">
                <h3 className="text-lg font-semibold">{f.q}</h3>
                <p className="text-indigo-200 mt-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
