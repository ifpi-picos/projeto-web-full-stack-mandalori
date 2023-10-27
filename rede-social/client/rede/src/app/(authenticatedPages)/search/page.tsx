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
        <div className="w-[60%] flex gap-6">
            <div className="flex flex-col gap-8 w-1/3 border-r p-4 items-center">
                <span className="font-semibold text-lg" >usuários</span>
                {users.data?.map((user:IUser, id:number)=>{
                    return  (
                        <div className="w-full bg-white rounded-lg p-4 shadow-md" key={id}>
                            
                            
                            <Link href={'/profile?id=' + user.id} key={id} className="flex items-center gap-2">
                        
                                <img src={users? user.userImg: 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'} 
                                alt="imagem do perfil" 
                                className="u-8 h-8 rounded-full" />
                                    <span className="font-bold">{user.username}</span>  
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col gap-8 w-1/2 p-4 items-center">
                <span className="font-semibold text-lg" >posts</span>
                {posts.data?.map((post:IPost, id:number)=>{
                    return(
                        <Post post = {post} key={id} />
                    )
                })}
            </div>
        </div>
    )
}

export default Search