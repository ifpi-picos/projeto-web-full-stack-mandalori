"use client"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {FaSearch, FaBell, FaDoorOpen} from 'react-icons/fa'
import {TbMessageCircle2Filled} from 'react-icons/tb'
import { makeRequest } from "../../../axios";
import { UserContext } from "@/context/UserContext";
import { IUser } from "@/interfaces";


function Header() {

    const {user, setUser} = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false);
    const [search, setSearch ] = useState<string|null>(null)
    const [searchResults, setSearchResults] = useState(false)
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


    const {data, error} = useQuery({
        queryKey: ['search'],
        queryFn: ()=> makeRequest.get(`search/search-users?params=${search}`).then((res)=>{
            return res.data
        }),
        enabled: !!search //so vai fazer a req quando houver um user
    })

    if(error){
        console.log(error)
    }

    console.log(data)

    return(
<header className="fixed z-10 w-full bg-white flex justify-between py-2 px-4 items-center shadow-md">
  <Link href="/main" className="font-bold text-sky-900 text-lg flex items-center gap-2">
    <img
      src="https://github.com/joyzinhw/projeto-integrador/blob/main/assets/img/www.png?raw=true"
      alt="Logo Codpet"
      className="w-10 h-10 rounded-full"
    />
  </Link>

  <div className="flex bg-white items-center text-gray-600 px-2 py-1 rounded-full relative" 
    onClick={() => setSearchResults(true)}
    onMouseLeave={() => setSearchResults(false)}
  >

<input
  type="text"
  placeholder='Buscar'
  className="bg-white focus-visible:outline-none w-28 sm:w-40 border-b-2 border-gray" // Adicionado a classe border-b-2
  onChange={(e) => setSearch(e.target.value)}
  value={search ? search : ''}
/>

            
    <Link href={'/search?params=' + search}>
      <FaSearch onClick={() => { setSearch(null), setSearchResults(false) }} />
    </Link>

    {search && searchResults && (
      <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t-3 whitespace-nowrap right-0 left-0 top-[100%]">
        {data?.map((users: IUser, id: number) => (
          <Link
            href={'/profile?id=' + users.id}
            key={id}
            className="flex items-center gap-2"
            onClick={() => { setSearch(null), setSearchResults(false) }}
          >
            <img
              src={users?.userImg ? users.userImg : 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'}
              alt="imagem do perfil"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
            <span className="font-bold text-sm md:text-base">{users?.username}</span>
          </Link>
        ))}
        <Link
          href={'/search?params=' + search}
          className="font-semibold border-t border-zinc-300 text-center pt-2"
          onClick={() => { setSearch(null), setSearchResults(false) }}
        >
          Ver todos resultados
        </Link>
      </div>
    )}
  </div>

  {/* User profile section */}
  <div className="flex gap-2 items-center text-gray-600">
    <div className="relative" onMouseLeave={() => setShowMenu(false)} onMouseEnter={() => setShowMenu(true)}>
      <button
        onClick={() => mutation.mutate()}
        className={`cursor-pointer flex items-center ${showMenu ? 'hover:text-blue-600' : ''}`}
      >
        <FaDoorOpen className="w-6 h-6 md:w-8 md:h-8 mr-2" />
        Sair
      </button>
    </div>
  </div>
</header>




    )
}

export default Header;