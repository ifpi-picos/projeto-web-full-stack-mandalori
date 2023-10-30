"use client"

import UserContext from "@/context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import {FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { makeRequest } from "../../../axios";

function Share() {

    const {user} = useContext(UserContext)
    const [post_desc, setDesc] = useState('')
    const [postImg, setPostImg] = useState('')
    const [img, setImg] = useState<File | null>(null)

    const queryCliente = useQueryClient()

    useEffect(()=>{
        if(img){
            setPostImg(URL.createObjectURL(img))
        }}, [img]);

    const mutation = useMutation({
        mutationFn: async(newPost:{}) =>{
            await makeRequest.post('post/', newPost).then((res)=>{
                return res.data
            })
        },
        onSuccess:()=>{
            queryCliente.invalidateQueries({queryKey: ['posts']})
        },
    })

    const upload = async ()=>{
        try {
            const formData = new FormData
            img && formData.append('file', img)
            const res= await makeRequest.post('upload/', formData)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const sharePost = async () =>{
        let imgUrl = ''
        if(img){
            imgUrl = await upload()
        }
        mutation.mutate({post_desc, img: imgUrl, userId: user?.id})
        setDesc('')
        setImg(null)
    }


    return(
    <div className="w-full bg-white rounded-lg p-4 shadow-md flex flex-col gap-3">
        {
            img && <img className="rounded-full" src={postImg} alt="img do post"></img>
        }
        <div>                    
            <div className="flex gap-4 pt-6">
        <img 
            src={user?.userImg? user.userImg: 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'} 
            alt="imagem do perfil" 
            className="u-8 h-8 rounded-full"  />
        
        <div className="w-full bg-zinc-100 flex items-center text-gray rounded-full">
            <input placeholder= {`o que esta acontecendo, ${user?.username}?`} 
            value={post_desc}
            type="text" className="bg-zinc-100 w-full focus-visible:outline:none rounded-full" 
            onChange={(e)=> setDesc(e.target.value)}/>
            <button onClick={()=> sharePost()}>
            <FaPaperPlane/>
            </button>
        </div>
    </div>

        <div className="flex justify-around py-4 text-gray-600 border-y">
            <input className="hidden" type='file' id='img' onChange={(e)=> e.target.files && setImg(e.target.files[0])} />
            <label htmlFor="img" className="flex">
            <TbPhoto className= 'text-2xl'/>imagem</label>
            <button className="flex items-center gap-1"><FaUserFriends className= 'text-2xl'/>marcar amigo</button>   
        </div>



        </div>
    </div>
)
}

export default Share;