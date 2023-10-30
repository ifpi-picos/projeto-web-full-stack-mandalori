"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../../../axios"
import Feed from "@/app/components/Feed"
import { useContext, useState } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";
import {IFriendship, IPost} from '@/interfaces'



function Profile({searchParams}:{searchParams: {id:string} })
{
    const {user} = useContext(UserContext)
    const queryClient = useQueryClient();

    const [followed, setFollowed] = useState(false)

    const profileQuery = useQuery({
        queryKey:['profile'],
        queryFn:()=> makeRequest.get('users/get-user?id=' + searchParams.id).then((res)=>{
            return res.data[0]
        }),
})

    if(profileQuery.error){
        console.log(profileQuery.error)}

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ['posts'],
        queryFn: () => makeRequest.get('post/?id=' + searchParams.id)
            .then((res) => {
                return res.data.data;
            }),
    });

    if (postQuery.error) {
        console.log(postQuery.error);
    }

    const friendshipQuery = useQuery({
        queryKey:[`friendship`], 
        queryFn:()=> makeRequest.get('friendship/?follower_id=' + user?.id).then((res)=>{
            res.data.data.find((e:IFriendship)=> {
                if(e.followed_id === + searchParams.id){
                    setFollowed(true)
                }
            })
            return res.data.data;
        }),
    })

    
    if(friendshipQuery.error){
        console.log(friendshipQuery.error)
    }

    const mutation = useMutation({
        mutationFn: (unfollow: { followed_id: number; follower_id: number; followed: boolean }) => {
          if (followed) {
            return makeRequest
              .delete(
                `friendship/?follower_id=${unfollow.follower_id}&followed_id=${unfollow.followed_id}`
              )
              .then((res) => res.data);
          } else {
            return makeRequest
              .post(`friendship/`, { follower_id: unfollow.follower_id, followed_id: unfollow.followed_id })
              .then((res) => res.data);
          }
        },
        onSuccess: () => {
            setFollowed(false)
          queryClient.invalidateQueries({ queryKey: ['friendship'] });
        },
      });
      

    return(
        <div className="w-3/5 flex flex-col items-center">
            <div className="relative">
                <img className="rounded-xl" src={profileQuery.data?.bgImg? profileQuery.data.bgImg: 
                    'https://img.freepik.com/fotos-gratis/fundo-azul-do-gradiente-de-luxo-abstrato-liso-azul-escuro-com-vinheta-preta-studio-banner_1258-52393.jpg?w=740&t=st=1696028331~exp=1696028931~hmac=ff6d78a9446b39ef04877dee2de00952857aa4f088936de0c5b8778ce72ad8c6'} 
                    alt="capa" />

            <div className="flex absolute bottom-[-110px] left-10 items-center">
                <img className="w-40 h-40 rounded-full border-zinc-100 border-4" src={profileQuery.data?.userImg? profileQuery.data.userImg: "https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png"} alt="imagem do perfil" />
                <span className="text-2m font-bold pl-2">{profileQuery.data?.username}</span>
            </div>
        </div>
        <div className="pt-36 w-3/5 flex flex-col items-center gap-3" > 
        {
            user?.id != + searchParams.id &&(
            <button onClick={()=> user && mutation.mutate(
                {followed, followed_id: + searchParams.id, follower_id:user.id})
            } 
                className={`w-1/2 rounded-md py-2 font-semibold ${followed? 
                    `bg-zinc-300  hover:text-black`:`bg-blue-600 text-white hover:bg-blue-700`}`} >
                        {followed? "deixar de seguir" : "seguir"}</button>
            )}
            <Feed post={postQuery.data}/>
        </div>
    </div>
    )
}


export default Profile;


 