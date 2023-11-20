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
          <h1 className="text-center" style={{ color: "#21344d", fontSize: "50px", fontWeight: "bold", fontStyle: "italic", alignItems: 'center' }}>login</h1>
      
          <h1 className="text-center" style={{ color: "#21344d", fontSize: "24px", fontWeight: "bold", fontFamily: 'Inter',fontStyle: "italic", textAlign: 'left' }}>email</h1>  
          <AuthInput label=" " newState={setEmail} />
          <h1 className="text-center" style={{ color: "#21344d", fontSize: "24px", fontWeight: "bold", fontFamily: 'Inter',fontStyle: "italic", textAlign: 'left' }}>senha</h1>
          <AuthInput label=" " newState={setPassword} isPassword />

          {error.length > 0 && <span className="text-red-600">* {error}</span>}

          <button 
         style={{
        backgroundColor: '#1457ae',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: '#ffffff',
        paddingLeft: '10px',
       
      }}
      className="py-3 font-bold text-white rounded-lg hover:092948" 
      onClick={(e) => handleLogin(e)}
    >entrar
    </button>

          <Link href='/register' 
            style={{
            fontSize: '20px',
            fontWeight: 'italic',
            color: "#53566e"
            }}
          className="text-center" >
            Ainda não possui uma conta?
            <br/>
            <strong className="text-center underline color:#0000" >crie uma conta!</strong>
            </Link>
        </>
       
            
        )
        }
      

export default Login;