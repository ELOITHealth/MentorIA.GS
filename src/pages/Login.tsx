import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    localStorage.setItem("profession", profession);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-indigo-900 text-white">
      <h2 className="text-3xl font-semibold mb-6">Bem-vindo à MentorIA</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-indigo-800 p-6 rounded-2xl shadow-md"
      >
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-2 rounded text-black"
        />
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          required
          className="px-4 py-2 rounded text-black"
        >
          <option value="">Selecione sua área</option>
          <option value="Marketing">Marketing</option>
          <option value="RH">Recursos Humanos</option>
          <option value="TI">Tecnologia da Informação</option>
          <option value="Educação">Educação</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button className="bg-white text-indigo-700 px-6 py-2 rounded font-semibold hover:scale-105 transition">
          Entrar
        </button>
      </form>
    </div>
  );
}
