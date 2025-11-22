
const members = [
  {
    nome: "Vitor Augusto",
    rm: "564227",
    turma: "1TDSPK",
    foto: "/images/vitor.jpg",
    github: "https://github.com/Vitor-Augusto-olv",
    linkedin: "https://www.linkedin.com/in/vitor-augusto-91234a353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    nome: "Andre Bellandi",
    rm: "564662",
    turma: "1TDSPK",
    foto: "",
    github: "",
    linkedin: "",
  },
  {
    nome: "Matheus Moratti",
    rm: "562480",
    turma: "1TDSPK",
    foto: "",
    github: "",
    linkedin: "",
  },
];

export default function Integrantes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-6">Integrantes</h1>

        <p className="text-indigo-200 mb-6">Lista com nome, foto, RM, turma e links para GitHub/LinkedIn.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {members.map((m) => (
            <div key={m.rm} className="bg-white/10 p-6 rounded-2xl border border-white/10 flex gap-4 items-center shadow-lg">
              <img src={m.foto || `https://avatars.dicebear.com/api/initials/${encodeURIComponent(m.nome)}.svg`} alt={m.nome} className="w-20 h-20 rounded-full object-cover border border-white/10" />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{m.nome}</h3>
                <p className="text-sm text-indigo-200">RM: {m.rm} • Turma: {m.turma}</p>

                <div className="mt-3 flex gap-3">
                  <a href={m.github || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20">
                    <span className="font-semibold">GitHub</span>
                  </a>
                  <a href={m.linkedin || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20">
                    <span className="font-semibold">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
