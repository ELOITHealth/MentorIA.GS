import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.get("/usuarios");

      const usuarios = res.data;

      const usuarioEncontrado = usuarios.find((u: any) => 
        u.email === email && u.senha === password
      );

      if (!usuarioEncontrado) {
        alert("Email ou senha inválidos.");
        return;
      }

      localStorage.setItem("userId", usuarioEncontrado.id);
      localStorage.setItem("userName", usuarioEncontrado.nome);
      localStorage.setItem("profession", usuarioEncontrado.profissao);

      navigate("/dashboard");

    } catch (err) {
      console.error("Erro no login:", err);
    }
  }

  return (
    <div className="min-h-screen bg-indigo-900 text-white flex justify-center items-center px-6">
      <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        <h2 className="text-3xl font-bold mb-6 text-center">Entrar</h2>

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
          Entrar
        </button>
      </form>
    </div>
  );
}
