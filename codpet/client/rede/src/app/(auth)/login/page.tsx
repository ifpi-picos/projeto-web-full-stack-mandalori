"use client"

import Link from "next/link";
import { useContext, useState } from "react";
import AuthInput from "../../components/AuthInput";
import { makeRequest } from "../../../../axios";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";

// página de login
function Login() {
  // estados para controlar os campos de email, senha, erro, carregamento e contexto do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // hook do Next.js para manipulação da rota
  const router = useRouter();

  // função para lidar com o envio do formulário de login
  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true); // inicia o estado de carregamento

    // faz a requisição para a API de login
    makeRequest
      .post("auth/login", { email, password })
      .then((res) => {
        // armazena o usuário no localStorage e no contexto
        localStorage.setItem("rede: user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setError("");
        router.push("/main"); // redireciona para a página principal após o login
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.msg);
      })
      .finally(() => {
        setLoading(false); // finaliza o estado de carregamento, independentemente do resultado
      });
  };

  // componente de login
  return (
    <>
      <title>Login</title>
      <h1 className="font-bold text-2xl text-center">Login</h1>
      <AuthInput label="Email: " newState={setEmail} />
      <AuthInput label="Senha: " newState={setPassword} isPassword />
      {error.length > 0 && <span className="text-red-600">* {error}</span>}
      <button
        className="bg-blue-800 py-3 font-bold text-white rounded-lg hover:bg-blue-600"
        onClick={(e) => handleLogin(e)}
        disabled={loading} // Desativa o botão durante o carregamento
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
      <Link href="/register" className="text-center">
        <p className="text-center color:#0000">Ainda não possui uma conta?</p>
        <strong>Criar uma conta</strong>
      </Link>
    </>
  );
}

export default Login;
