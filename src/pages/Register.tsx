import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/usuarios", {
        nome: name,
        email: email,
        senha: password,
        profissao: profession,
      });

      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userName", res.data.nome);
      localStorage.setItem("profession", res.data.profissao);
      localStorage.setItem("email", res.data.email);

      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao registrar:", err);
      alert("Erro ao criar usuário!");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B102B] to-[#0A1A2F] text-white flex justify-center items-center px-6 py-12">
      
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-2xl border border-white/20 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Criar Conta
        </h2>

        {/* NOME */}
        <input
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* PROFISSÃO */}
        <select
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        >
          <option value="" className="text-black">
            Selecione sua profissão
          </option>
          <option value="TI" className="text-black">TI</option>
          <option value="Marketing" className="text-black">Marketing</option>
          <option value="RH" className="text-black">RH</option>
          <option value="Educação" className="text-black">Educação</option>
          <option value="Saúde" className="text-black">Saúde</option>
        </select>

        {/* EMAIL */}
        <input
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* SENHA */}
        <input
          type="password"
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg shadow-indigo-900/30 hover:scale-105 transition font-semibold mt-2"
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}
