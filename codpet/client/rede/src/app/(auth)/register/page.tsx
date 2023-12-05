"use client"

import AuthInput from "../../components/AuthInput"
import {useState } from "react"
import Link from "next/link"
import axios from "axios"
import { makeRequest } from "../../../../axios"




function Register(){

    const[username, setUserName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword ] =useState('')
    const[confirmPassword, setConfirmPassword ] =useState('')
    const[error, setError] =useState('')
    const[success, setSuccess] =useState('')


    const handleRegister = (e:any)=>{
        e.preventDefault()
        makeRequest.post("auth/register", {username, email, password, confirmPassword}).then((res)=>{
            console.log(res.data)
            setSuccess(res.data.msg)
            setError('')
        }).catch((err)=>{
            console.log(err);
            setError(err.response.data.msg)
            setSuccess('')
        })
    }

    return(
        
            <>
            <title>Cadastro</title>
            <h1 className="font-bold text-2xl text-center">Cadastre-se</h1>
            <AuthInput label="Username" newState={setUserName} />
            <AuthInput label="Email" newState={setEmail} />
            <AuthInput label="Senha" newState={setPassword} isPassword />
            <AuthInput label="Confirme sua senha" newState={setConfirmPassword} isPassword />
            {error.length > 0 && <span className="text-red-600">* {error}</span>}
            {success.length > 0 && <span className="text-green-600">* {success}</span>}
            <button className="bg-blue-800 py-3 font-bold text-white rounded-lg hover:bg-blue-600" onClick={(e) => handleRegister(e)}>
                Cadastrar
            </button>
            <Link href="/login" className="text-center underline">
                Logar
            </Link>
            </>

        )
    }

export default Register