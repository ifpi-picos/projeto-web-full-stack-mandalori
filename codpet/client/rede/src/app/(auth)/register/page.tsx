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
        <h1 className="text-center" style={{ color: "#21344d", fontSize: "50px", fontWeight: "bold", fontStyle: "italic", alignItems: 'center' }}>registrar</h1>
          
        <h1 className="text-center" style={{ fontFamily: 'Inter', color: "#21344d", fontSize: "20px", fontWeight: "bold", fontStyle: "italic", textAlign: 'left' }}>nome</h1>
        <AuthInput label="  " newState={setUserName} />
        <h1 className="text-center" style={{fontFamily: 'Inter', color: "#21344d", fontSize: "20px", fontWeight: "bold", fontStyle: "italic", textAlign: 'left' }}>email</h1>
        <AuthInput label=" " newState={setEmail}/>
        <h1 className="text-center" style={{ fontFamily: 'Inter', color: "#21344d", fontSize: "20px", fontWeight: "bold", fontStyle: "italic", textAlign: 'left' }}>senha</h1>
          
        <AuthInput label=" " newState={setPassword} isPassword/>
        <h1 className="text-center" style={{fontFamily: 'Inter',  color: "#21344d", fontSize: "20px", fontWeight: "bold", fontStyle: "italic", textAlign: 'left' }}>confirme a senha</h1>
          
        <AuthInput label="  " newState={setConfirmPassword}isPassword/>

        {error.length>0 && <span className="text-red-600">* {error}</span>}
        {sucess.length>0 && <span className="text-green-600">* {sucess}</span>}

        <button 
         style={{
        backgroundColor: '#1457ae',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: '#ffffff',
       
      }}
      className="py-3 font-bold text-white rounded-lg hover:092948" 
      onClick={(e)=>handleRegister(e)}>cadastrar</button>
       

    <Link href='/login' 
     style={{
        fontSize: '20px',
        fontWeight: 'italic',
        color: "#00000"
        }}
    className="text-center underline">
    <strong>logar</strong>
    </Link>
        </>
        )
    }

export default Register