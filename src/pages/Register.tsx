import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [profissaoId, setProfissaoId] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/usuarios", {
        nome,
        cpf,
        email,
        senha,
        progresso: 0,
        profissaoId: Number(profissaoId),
      });

      // salvar dados do usuário
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userName", res.data.nome);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("profissaoId", String(res.data.profissaoId));
      localStorage.setItem("progress", String(res.data.progresso));

      navigate("/dashboard");

    } catch (err) {
      console.error("Erro ao registrar:", err);
      alert("Erro ao criar a conta!");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white flex justify-center items-center px-6">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Criar Conta</h2>

        <input
          className="p-3 rounded-lg bg-white/10 w-full mb-3 focus:outline-none"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="p-3 rounded-lg bg-white/10 w-full mb-3 focus:outline-none"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <input
          className="p-3 rounded-lg bg-white/10 w-full mb-3 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="p-3 rounded-lg bg-white/10 w-full mb-3 focus:outline-none"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <select
          className="p-3 rounded-lg bg-white/10 w-full mb-3 text-black focus:outline-none"
          value={profissaoId}
          onChange={(e) => setProfissaoId(e.target.value)}
        >
          <option value="">Selecione a profissão</option>
          <option value="1">Tecnologia da Informação (TI)</option>
          <option value="2">Marketing</option>
          <option value="3">Recursos Humanos (RH)</option>
          <option value="4">Educação</option>
          <option value="5">Saúde</option>
          <option value="6">Engenharia</option>
          <option value="7">Administração</option>
          <option value="8">Finanças</option>
          <option value="9">Jurídico</option>
          <option value="10">Logística</option>
        </select>

        <button
          className="p-3 bg-[#3A86FF] hover:bg-[#1E6BE6] rounded-lg w-full mt-2 font-semibold transition"
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}
