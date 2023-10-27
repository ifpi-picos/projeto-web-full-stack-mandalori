"use client"

import Link from "next/link";
import { useContext, useState } from "react";
import AuthInput from "../../components/AuthInput";
import { makeRequest } from "../../../../axios";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";

function Login() {

    const [email, setEmail] = useState("teste@gmail.com")
    const [password, setPassword] = useState("teste")
    const [error, setError] = useState("")
    const {setUser} =useContext(UserContext)
     
    const router = useRouter()
    const handleLogin= (e:any)=>{
        e.preventDefault()
        makeRequest.post("auth/login", {email, password})
        .then((res)=>{
            localStorage.setItem('rede: user', JSON.stringify(res.data.user));
            setUser(res.data.user)
            setError('')
            router.push('/main')
        })
        .catch((err)=>{
            console.log(err)
            setError(err.response.data.msg)
        })
    }

    return (
        <> 
                <h1 className="font-bold text-2lx">login</h1>
                <AuthInput label="email: " newState={setEmail}/>
                <AuthInput label="senha: " newState={setPassword} isPassword/>
                {error.length>0 && <span className="text-red-600">* {error}</span>}
                <button className="bg-blue-400 py-3 font-bold text-white rounded-lg hover:bg-blue-600" 
                onClick={(e)=>handleLogin(e)}>entrar</button>
                <Link href='/register' className="text-center underline">criar uma conta</Link>
        </>
    )
}

export default Login;