"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../../../axios"
import Feed from "@/app/components/Feed"
import { useContext, useState } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";
import {IFriendship, IPost} from '@/interfaces'
import {FaTimesCircle} from 'react-icons/fa'
import AuthInput from "@/app/components/AuthInput";



function Profile({searchParams}:{searchParams: {id:string} })
{
    const {user, setUser} = useContext(UserContext)
    const queryClient = useQueryClient();

    const [followed, setFollowed] = useState(false)
    const [username, setUserName] = useState('')
    const [userImg, setUserImg] = useState('')
    const [bgImg, setBgImg] = useState('')
    const [editProfile, setEditProfile] = useState(false)

    const profileQuery = useQuery({
        queryKey:['profile', searchParams.id],
        queryFn:()=> 
        makeRequest.get('users/get-user?id=' + searchParams.id).then((res)=>{
            setUserName(res.data[0].username)
            setUserImg(res.data[0].userImg)
            setBgImg(res.data[0].bgImg)
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
        mutationFn: async (unfollow: { followed_id: number; 
            follower_id: number; 
            followed: boolean }) => {
          if (followed) {
            return await makeRequest
              .delete(
                `friendship/?follower_id=${unfollow.follower_id}&followed_id=${unfollow.followed_id}`
              )
              .then((res) => {
                setFollowed(false)  
                res.data});
              
          } else {
            return await makeRequest
              .post(`friendship/`, { 
                follower_id: unfollow.follower_id, 
                followed_id: unfollow.followed_id })
              .then((res) => {
                setFollowed(true)
                res.data});
          }
        },
        onSuccess: () => {
        setFollowed(false)
          queryClient.invalidateQueries({ queryKey: ['friendship'] });
        },
      });

      // mutation vai receber uma função async que vai receber os dados do usuario pra atualizar
      // vai atualizar os dados do usuario na rota oferecida, vai pegar os dados da requisição e se der tudo certo ele retorna o res.data
      const editProfileMutation = useMutation({
        mutationFn: async (data:{username: string, userImg: string, bgImg:string, id: number}) => {
            return makeRequest
              .put(`users/update-user`, data)
              .then((res) => {
                if(user){
                    const newUser = {username:data.username, userImg: data.userImg,  bgImg: data.bgImg, id: data.id, email: user.email}
                    setUser(newUser)
                    return res.data
                }
              });
        },
        onSuccess: () => {
            setEditProfile(false)
          queryClient.invalidateQueries({ queryKey: ['profile', searchParams.id] }); //se for um retorno 200 ele vai ivvalidar a nossa query de profile la de cima
        },
      });
      



    return(
        <>
        <title>{`perfil de `+ profileQuery.data?.username}</title>
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
            user?.id != + searchParams.id ? (
            <button onClick={()=> user && mutation.mutate(
                {followed, followed_id: + searchParams.id, follower_id:user.id})
            } 
                className={`w-1/2 rounded-md py-2 font-semibold ${followed? 
                    `bg-zinc-300  hover:text-black`:`bg-blue-600 text-white hover:bg-blue-700`}`} >
                        {followed? "deixar de seguir" : "seguir"}</button>
            )
            
            :
            <button className={`w-1/2 rounded-md py-2 font-semibold bg-blue-300 hover:text-black`} 
            onClick={()=> setEditProfile(true)} >
                editar perfil
            </button>
            
            }
            {editProfile && 
                <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000094] z-10 flex items-center justify-center">
                    <div className="bg-white w-2/3 rounded-xl flex flex-col items-center">
                        <header className="w-full border-b font-semibold text-lg text-zinc-600 flex justify-between items-center p-2">
                            editar perfil
                            <button onClick={()=> setEditProfile(false)}>
                                <FaTimesCircle className='text-red-600'/>
                            </button>
                            </header>
                        <form className="w-2/3 py-8 flex flex-col gap-8">
                        <AuthInput label="nome: " newState={setUserName}/>
                        <AuthInput label="imagem do perfil: " newState={setUserImg}/>
                        <AuthInput label="imagem de capa: " newState={setBgImg}/>
                        <button 
                            className={`w-1/2 rounded-md py-2 font-semibold bg-blue-300 hover:text-black self-center`}
                            onClick={(e)=> { 
                                e.preventDefault()
                                editProfileMutation.mutate({username, userImg, bgImg, id: + searchParams.id})
                                
                                } }>
                        editar perfil
                        </button>
                        
                        
                        </form>

                    </div>
                </div>
            }
            <Feed post={postQuery.data}/>
        </div>
    </div>
    </>
    )
}


export default Profile;


 