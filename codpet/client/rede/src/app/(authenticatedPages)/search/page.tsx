"use client"

import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../../../axios"
import { IPost, IUser } from "@/interfaces"
import Link from "next/link"
import Post from "@/app/components/Post"

function Search({searchParams}: {searchParams: {params: string}}) {
    
    const users = useQuery({
        queryKey: ['searchUsers', searchParams],
        queryFn: ()=> makeRequest.get(`search/search-users?params=${searchParams.params}`).then((res)=>{
            return res.data
        }),
        enabled: !!searchParams.params //so vai fazer a req quando houver um user
    })

    if(users.error){
        console.log(users.error)
    }

    const posts = useQuery({
        queryKey: ['searchPosts', searchParams],
        queryFn: ()=> makeRequest.get(`search/search-posts?params=${searchParams.params}`).then((res)=>{
            return res.data
        }),
        enabled: !!searchParams.params //so vai fazer a req quando houver um user
    })

    if(posts.error){
        console.log(posts.error)
    }

    
    
    return (
<>
  <title>Buscar</title>
  <div className="w-full md:w-[60%] flex flex-col md:flex-row items-center">
    <div className="sm:md-80 gap-5 w-3/4 md:w-1/3 p-4 flex flex-col items-center">
      <span className="font-semibold text-lg">Usuários</span>
      {users.data?.map((user: IUser, id: number) => (
        <div className="w-full bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300" key={id}>
          <Link href={'/profile?id=' + user.id} key={id} className="flex items-center gap-2 hover:text-blue-500">
            <img
              src={user && user.userImg ? user.userImg : 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'}
              alt="imagem do perfil"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-bold">{user.username}</span>
          </Link>
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-5 w-3/5 md:w-1/2 p-4 items-center">
      <span className="font-semibold text-lg">Posts</span>
      {posts.data?.map((post: IPost, id: number) => (
        <Post post={post} key={id} />
      ))}
    </div>
  </div>
</>



    )
}

export default Search