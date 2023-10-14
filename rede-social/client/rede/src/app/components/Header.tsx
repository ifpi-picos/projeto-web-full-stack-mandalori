"use client"
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {FaSearch, FaBell} from 'react-icons/fa'
import {TbMessageCircle2Filled} from 'react-icons/tb'
import { makeRequest } from "../../../axios";
import { UserContext } from "@/context/UserContext";


function Header() {

    const {user, setUser} = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () =>{
            return await makeRequest.post('auth/logout').then((res)=>{
                res.data;
            });
        },
        onSuccess: ()=>{
            setUser(undefined)
            localStorage.removeItem('rede: user');
            router.push('/login')
        }
    })



    return(
        <header className=" fixed z-10 w-full bg-white flex justify-between py-2 px-4 items-center shadow-md" >
            <Link href='/main' className="font-bold text-sky-900 text-lg">codpet</Link>
            <div className="flex bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                <input type="text" placeholder='pesquisar' className="bg-zinc-100 focus-visible:outline-none"/>
                <FaSearch/>
            </div>
            <div className="flex gap-2 items-center text-gray-600">
                <div className="flex gap-3 ">
                    <button className="bg-zinc-200 p-2 rounded-full hover:bg-zinc-400">
                        <TbMessageCircle2Filled/>
                    </button >
                    <button className="bg-zinc-200 p-2 rounded-full hover:bg-zinc-400">
                        <FaBell/>
                    </button>
                </div>
                <div className="relative" onMouseLeave={()=>setShowMenu(false)}> 
                    <button className="flex gap-2 items-center " onClick={()=>setShowMenu(!showMenu)}>
                        <img 
                        src={user? user.userImg: 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'} 
                        alt="imagem do perfil" 
                        className="u-8 h-8 rounded-full" />
                        <span className="font-bold">{user?.username}</span>
                    </button>
                    {showMenu && (
                    <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t-3 whitespace-nowrap right-[-35px]">
                        <Link href='' className="border-b">editar perfil</Link>
                        <button onClick={() => mutation.mutate()}>logout</button>
                    </div>
                    )}
                </div>

            </div>
        </header>
    )
}

export default Header;