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
        profissao: profession
      });

      // salva dados do usuário
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
    <div className="min-h-screen bg-indigo-900 text-white flex justify-center items-center px-6">
      <form onSubmit={handleRegister} className="bg-white/10 p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        <h2 className="text-3xl font-bold mb-6 text-center">Criar Conta</h2>

        <input 
          className="p-3 rounded-lg bg-white/20 w-full mb-3"
          placeholder="Seu nome"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <select 
          className="p-3 rounded-lg bg-white/20 w-full mb-3"
          value={profession}
          onChange={(e)=>setProfession(e.target.value)}
        >
          <option value="">Selecione sua profissão</option>
          <option value="TI">TI</option>
          <option value="Marketing">Marketing</option>
          <option value="RH">RH</option>
          <option value="Educação">Educação</option>
          <option value="Saúde">Saúde</option>
        </select>

        <input 
          className="p-3 rounded-lg bg-white/20 w-full mb-3"
          placeholder="Seu email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input 
          type="password"
          className="p-3 rounded-lg bg-white/20 w-full mb-3"
          placeholder="Sua senha"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="p-3 bg-indigo-600 rounded-lg w-full mt-2">
          Criar conta
        </button>
      </form>
    </div>
  );
}
