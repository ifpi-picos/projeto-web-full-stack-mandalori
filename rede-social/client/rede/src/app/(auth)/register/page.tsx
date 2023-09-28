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
    const[sucess, setSucess] =useState('')


    const handleRegister = (e:any)=>{
        e.preventDefault()
        makeRequest.post("auth/register", {username, email, password, confirmPassword}).then((res)=>{
            console.log(res.data)
            setSucess(res.data.msg)
            setError('')
        }).catch((err)=>{
            console.log(err);
            setError(err.response.data.msg)
            setSucess('')
        })
    }

    return(
        <>
        <h1 className="font-bold text-2xl">registrar</h1>
        <AuthInput label="nome" newState={setUserName}/>
        <AuthInput label="email" newState={setEmail}/>
        <AuthInput label="senha" newState={setPassword} isPassword/>
        <AuthInput label="confirme sua senha" newState={setConfirmPassword}isPassword/>
        {error.length>0 && <span className="text-red-600">* {error}</span>}
        {sucess.length>0 && <span className="text-green-600">* {sucess}</span>}
        <button className="bg-blue-400 py-3 font-bold text-white rounded-lg hover:bg-blue-600" 
                onClick={(e)=>handleRegister(e)}>cadastrar</button>
                <Link href='/login' className="text-center underline">logar</Link>
        </>
        )
    }

export default Register