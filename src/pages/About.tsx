export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Sobre / About</h1>

          <p className="text-indigo-200 mb-4">
            MentorIA é uma aplicação educativa para aprender a aplicar Inteligência Artificial no trabalho.
            Este projeto foi desenvolvido como parte do curso/trabalho acadêmico e contém módulos, chat de mentoria e conteúdo prático.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Objetivos</h2>
          <ul className="list-disc list-inside text-indigo-200">
            <li>Fornecer trilhas de aprendizagem aplicáveis ao dia a dia.</li>
            <li>Permitir prática com prompts e feedback automatizado.</li>
            <li>Documentar a equipe e demonstrar funcionamento do sistema.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
