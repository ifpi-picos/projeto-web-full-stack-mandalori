"use client"

import { create } from "domain";
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaPaperPlane, FaRegComment, FaThumbsUp } from "react-icons/fa";
import moment from 'moment';
import 'moment/locale/pt-br';
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import UserContext from "@/context/UserContext";
import Comment from "./Comment";
import Link from "next/link";
import { IPost, IComments, ILikes, IUser } from "@/interfaces";


function Post(props:{post: IPost}) {


    const{post_desc, img, username, userImg, created_at, id, userId} = props.post

    const {user} = useContext(UserContext)
    const [comment_desc, setComment_desc] = useState('')
    const [showComments, setShowComments] = useState(false)
    const [liked, setLiked] = useState(false)
    const [showLikes, setShowLikes] = useState(false)
    const queryClient = useQueryClient()
    
    // Likes QUery

    const likesQuery = useQuery<ILikes[] | undefined>({
        queryKey: ['likes', id],
        queryFn: ()=> makeRequest.get('likes/?likes_post_id='+ id).then((res)=>{
            res.data.data.map((like:ILikes)=>{
                if (like.likes_user_id == user?.id){
                    return setLiked(true)
                }
                else[
                    setLiked(false)
                ]
        });
            return res.data.data;
        }),
        enabled: !!id

    })  

    if (likesQuery.error){
        console.log(likesQuery.error)
    }

    const likesMutation = useMutation({
        mutationFn: async (newLikes: {})=>{
            if(liked){
                await makeRequest.delete(`likes/?likes_post_id=${id}&likes_user_id=${user?.id}`)
                .then((res)=>{
                    setLiked(false)
                    return res.data;
            })
        }else
            await makeRequest.post('likes/', newLikes).then((res)=>{
                return res.data
            });

        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['likes', id] })
        }
    })

    const shareLikes = async () =>{
        likesMutation.mutate({ 
            likes_user_id: user?.id, 
            likes_post_id: id,
     });
    }   


    // comments query
    
    const commentQuery = useQuery<IComments[] | undefined>({
        queryKey: ['comments', id],
        queryFn: ()=> makeRequest.get('comment/?post_id='+ id).then((res)=>{
            return res.data.data;
        }),
        enabled: !!id

    })  

    if (commentQuery.error){
        console.log(commentQuery.error)
    }

    const commentMutation = useMutation({
        mutationFn: async (newComment: {})=>{
            await makeRequest.post('comment/', newComment).then((res)=>{
                return res.data
            });

        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['comments', id] })
        }
    })

    const shareComment = async ()=>{
        commentMutation.mutate({ comment_desc, comment_user_id: user?.id, post_id: id });
        setComment_desc('')
    }
    
    return (
<div className="w-full bg-white rounded-lg p-4 shadow-md min-h-[300px]">
  <div className="overflow-hidden"> {/* Adicionado div com overflow-hidden */}
    <header className="flex gap-2 pb-4 border-b items-center">
      <Link href={'/profile?id=' + userId}>
        <img
          className="w-8 h-8 rounded-full"
          src={userImg ? userImg : "https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png"}
          alt="imagem do usuário que fez o post"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{username}</span>
          <span className="text-xs">{moment(created_at).fromNow().charAt(0).toUpperCase() + moment(created_at).fromNow().slice(1)}</span>
        </div>
      </Link>
    </header>

    {post_desc && (
      <div className="py-4 w-full">
        <span>{post_desc}</span>
      </div>
    )}

    {img && (
      <img
        className="rounded-lg w-full"
        src={`./upload/${img}`}
        alt="img do post"
      />
    )}

    <div className="flex justify-between py-4 border-b">
      <div
        className="relative"
        onMouseEnter={() => setShowLikes(true)}
        onMouseLeave={() => setShowLikes(false)}
      >
        {likesQuery.data && likesQuery.data.length > 0 && (
          <>
            <div className="flex gap-1 items-center">
              <span className={`bg-red-500 w-6 h-6 text-white flex items-center justify-center rounded-full text-xs ${liked ? "animate-like" : ""}`}>
                <FaHeart />
              </span>
              <span>{likesQuery.data.length}</span>
            </div>
            {showLikes && (
              <div className="absolute bg-white border flex flex-col p-2 rounded-md top-6">
                {likesQuery.data.map((like) => (
                  <span key={like.id}>{like.username}</span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <button onClick={() => setShowComments(!showComments)}>
        {commentQuery.data && commentQuery.data.length > 0 && `${commentQuery.data.length} comentários`}
      </button>
    </div>

    <div className="flex justify-around py-4 text-gray-600 border-b ">
      <button
        className={`flex items-center gap-1 ${liked ? "text-red-500" : ""} transition-all duration-300 hover:text-red-500`}
        onClick={() => shareLikes()}
      >
        <FaHeart className={` ${liked ? "animate-like" : ""}`} />
        Curtir
      </button>
    </div>

    {showComments && commentQuery.data?.map((comment, id) => (
      <Comment comment={comment} key={id} />
    ))}

<div className="flex gap-4 pt-6 items-center">
  <Link href={'/profile?id=' + user?.id} className="hidden sm:block">
    <div className="flex-shrink-0">
      <img 
        src={user?.userImg ? user.userImg : 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'} 
        alt="imagem do perfil" 
        className="w-8 h-8 rounded-full"  
      />
    </div>
  </Link>

  <div className="bg-white flex-grow flex flex-col items-center">
    <input
      id={"comment" + id}
      type="text"
      className="w-full focus:outline-none px-4 py-2 text-black-800 placeholder-black-500 border-b-2 border-gray"
      value={comment_desc}
      onChange={(e) => setComment_desc(e.target.value)}
      placeholder="Comente..."
    />
  </div>

  <button
    onClick={() => shareComment()}
    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none ml-auto "
  >
    <FaPaperPlane />
  </button>
</div>

  </div>
</div>





    )
}

export default Post;