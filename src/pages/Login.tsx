import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.get("/usuarios");
      const users = res.data;

      const user = users.find(
        (u: any) => u.email === email && u.senha === senha
      );

      if (!user) {
        alert("Email ou senha incorretos!");
        return;
      }

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.nome);
      localStorage.setItem("email", user.email);
      localStorage.setItem("profissaoId", user.profissaoId);
      localStorage.setItem("progress", user.progresso);

      navigate("/dashboard");

    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro ao acessar o sistema!");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white flex justify-center items-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Entrar</h2>

        <input
          className="p-3 rounded-lg bg-white/10 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="p-3 rounded-lg bg-white/10 w-full mb-3"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="p-3 bg-[#3A86FF] rounded-lg w-full mt-2 font-semibold hover:bg-[#1E6BE6] transition">
          Entrar
        </button>
      </form>
    </div>
  );
}
