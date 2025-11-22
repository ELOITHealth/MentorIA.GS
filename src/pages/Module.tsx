import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";

type Lesson = {
  id: string;
  title: string;
  description?: string;
  resource?: string;
  videoUrl?: string;
};

export default function ModulePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

  // module data may come via state (from Dashboard) or later we could fetch by id
  const moduleData = state || { id: params.id, nome: "Módulo", descricao: "", conteudo: "" };

  // normalize lessons: if moduleData.conteudo is an array use it, if string try to split by lines
  const lessons: Lesson[] = useMemo(() => {
    if (!moduleData) return [];

    // if already has lessons array
    if (Array.isArray(moduleData.conteudo)) {
      return moduleData.conteudo.map((l: any, idx: number) => ({
        id: l.id ?? `${moduleData.id}-lesson-${idx}`,
        title: l.title ?? l.titulo ?? l.nome ?? `Aula ${idx + 1}`,
        description: l.description ?? l.descricao ?? "",
        resource: l.resource ?? l.link ?? undefined,
        videoUrl: l.videoUrl ?? l.video ?? undefined,
      }));
    }

    // if conteudo is a string, split by double newlines into lessons
    if (typeof moduleData.conteudo === "string") {
      const parts = moduleData.conteudo.split(/\n\n+/).map((p: string) => p.trim()).filter(Boolean);
      return parts.map((p: string, idx: number) => ({
        id: `${moduleData.id}-lesson-${idx}`,
        title: `Aula ${idx + 1}`,
        description: p,
      }));
    }

    return [];
  }, [moduleData]);

  // load completed lessons from localStorage
  useEffect(() => {
    const key = `module-${moduleData.id}-completed`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) setCompletedLessons(JSON.parse(raw));
    } catch {
      setCompletedLessons({});
    }
  }, [moduleData.id]);

  function toggleLesson(id: string) {
    const next = { ...completedLessons, [id]: !completedLessons[id] };
    setCompletedLessons(next);
    localStorage.setItem(`module-${moduleData.id}-completed`, JSON.stringify(next));
  }

  function markModuleComplete() {
    // basic progress handling: increase stored progress by 20 up to 100
    const progress = Number(localStorage.getItem("progress") || "0");
    const newProgress = Math.min(progress + 20, 100);
    localStorage.setItem("progress", String(newProgress));
    alert("Módulo concluído! Progresso atualizado.");
    navigate("/dashboard");
  }

  if (!moduleData || (!state && !params.id)) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] text-white flex flex-col items-center justify-center">
        <p className="text-lg mb-4">Módulo não encontrado.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 bg-[#3A86FF] rounded-lg"
        >
          Voltar ao Dashboard
        </button>
      </div>
    );
  }

  const { nome, descricao } = moduleData;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A1A2F] text-white px-6 py-10">
        <div className="max-w-4xl mx-auto">

          <motion.h1 initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold mb-4">
            {nome}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-[#AFCBDA] mb-6">
            {descricao}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#102A43] border border-white/10 p-6 rounded-xl shadow-lg leading-relaxed">
            <h2 className="text-xl font-semibold mb-4">Conteúdo do Módulo</h2>

            {lessons.length === 0 ? (
              <p className="text-[#E2E8F0] whitespace-pre-line">{String(moduleData.conteudo) || "Sem conteúdo definido."}</p>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="flex items-start gap-4">
                      <input type="checkbox" checked={!!completedLessons[lesson.id]} onChange={() => toggleLesson(lesson.id)} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{lesson.title}</h3>
                          {lesson.videoUrl && (
                            <button onClick={() => window.open(lesson.videoUrl, "_blank")} className="text-sm text-indigo-200 underline">Abrir vídeo</button>
                          )}
                        </div>
                        {lesson.description && <p className="text-indigo-200 mt-2">{lesson.description}</p>}
                        <div className="mt-3 flex gap-3">
                          {lesson.resource && (
                            <a href={lesson.resource} target="_blank" rel="noreferrer" className="text-sm bg-white/10 px-3 py-2 rounded-lg">Recurso</a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => navigate("/dashboard")} className="px-4 py-2 rounded-lg bg-white/5">Voltar</button>
              <button onClick={markModuleComplete} className="px-4 py-2 rounded-lg bg-[#3A86FF] text-[#0A1A2F] font-semibold">Marcar módulo como concluído</button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
