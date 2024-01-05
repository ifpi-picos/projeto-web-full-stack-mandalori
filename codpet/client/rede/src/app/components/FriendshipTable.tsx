"use client"

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import Link from "next/link";
import { FaBars, FaTimes } from 'react-icons/fa'; // Added toggle icons
import { IFriendship } from '@/interfaces';


function FriendshipTable() {
    const { user } = useContext(UserContext);
    const queryClient = useQueryClient();
    const [isMenuOpen, setMenuOpen] = useState(false);
  
    const { data, error } = useQuery({
      queryKey: [`friendship`],
      queryFn: () => makeRequest.get('friendship/?follower_id=' + user?.id).then((res) => {
        return res.data.data;
      }),
      enabled: !!user
    });
  
    if (error) {
      console.log(error);
    }
  
    const mutation = useMutation({
      mutationFn: (unfollow: { followed_id: number; follower_id: number }) =>
        makeRequest
          .delete(
            `friendship/?follower_id=${unfollow.follower_id}&followed_id=${unfollow.followed_id}`
          )
          .then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['friendship'] });
      },
    });
  
return (
  <div className="fixed right-2">
    <div className={`text-gray-600 flex flex-col ${isMenuOpen ? 'bg-white shadow-md' : 'bg-zinc-100'}`}>
      <span
        className={`font-bold cursor-pointer flex items-center text-lg ${
          isMenuOpen ? 'bg-white py-4 px-4 rounded-md hover:text-blue-500' : 'text-gray-600 hover:text-blue-500'
        }`}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes className="w-6 h-6 mr-2" /> : <FaBars className="w-6 h-6 mr-2" />}
        {isMenuOpen && 'Seguindo'}
      </span>

      {isMenuOpen && (
        <div className="menu-overlay flex flex-col p-4 rounded-md">
          {data?.map((friendship: IFriendship) => (
            <div key={friendship.id} className="flex flex-col gap-4 items-start mb-4">
              <Link href={`profile?id=${friendship.followed_id}`} className="flex items-center gap-2">
                <img
                  src={friendship.userImg || 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'}
                  alt="imagem do perfil"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold whitespace-normal break-all">
                  {friendship.username}
                </span>
              </Link>
              <button
                onClick={() => user && mutation.mutate({ followed_id: friendship.followed_id, follower_id: user?.id })}
                className={`px-3 py-1 rounded-md hover:bg-blue-400 text-white font-semibold ${isMenuOpen ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'}`}
              >
                Unfollow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)
  }
  
  export default FriendshipTable;
  
