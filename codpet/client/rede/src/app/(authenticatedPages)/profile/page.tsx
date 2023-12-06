"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import Feed from "@/app/components/Feed";
import { useContext, useState } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { IFriendship, IPost } from "@/interfaces";
import { FaTimesCircle } from "react-icons/fa";
import AuthInput from "@/app/components/AuthInput";
import FriendshipTable from "@/app/components/FriendshipTable";

function Profile({ searchParams }: { searchParams: { id: string } }) {
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();

  const [followed, setFollowed] = useState(false);
  const [username, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [bgImg, setBgImg] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [editProfileError, setEditProfileError] = useState("");
  const [editProfileSuccess, setEditProfileSuccess] = useState("");

  const profileQuery = useQuery({
    queryKey: ["profile", searchParams.id],
    queryFn: () =>
      makeRequest.get(`users/get-user?id=${searchParams.id}`).then((res) => {
        const userData = res.data[0] || {};
        setUserName(userData.username);
        setUserImg(userData.userImg);
        setBgImg(userData.bgImg);
        return userData;
      }),
  });

  if (profileQuery.error) {
    console.error("Profile query error:", profileQuery.error);
  }

  const postQuery = useQuery<IPost[] | undefined>({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("post/?id=" + searchParams.id).then((res) => {
        return res.data.data;
      }),
  });

  if (postQuery.error) {
    console.log(postQuery.error);
  }

  const friendshipQuery = useQuery({
    queryKey: [`friendship`],
    queryFn: () =>
      makeRequest
        .get("friendship/?follower_id=" + user?.id)
        .then((res) => {
          res.data.data.find((e: IFriendship) => {
            if (e.followed_id === +searchParams.id) {
              setFollowed(true);
            }
          });
          return res.data.data;
        }),
  });

  if (friendshipQuery.error) {
    console.log(friendshipQuery.error);
  }

  const mutation = useMutation({
    mutationFn: async (unfollow: {
      followed_id: number;
      follower_id: number;
      followed: boolean;
    }) => {
      if (followed) {
        return await makeRequest
          .delete(
            `friendship/?follower_id=${unfollow.follower_id}&followed_id=${unfollow.followed_id}`
          )
          .then((res) => {
            setFollowed(false);
            res.data;
          });
      } else {
        return await makeRequest
          .post(`friendship/`, {
            follower_id: unfollow.follower_id,
            followed_id: unfollow.followed_id,
          })
          .then((res) => {
            setFollowed(true);
            res.data;
          });
      }
    },
    onSuccess: () => {
      setFollowed(false);
      queryClient.invalidateQueries({ queryKey: ["friendship"] });
    },
  });

  const editProfileMutation = useMutation({
    mutationFn: async (data: {
      username: string;
      userImg: string;
      bgImg: string;
      id: number;
    }) => {
      try {
        const response = await makeRequest.put(`users/update-user`, data);
        if (user) {
          const newUser = {
            username: data.username,
            userImg: data.userImg,
            bgImg: data.bgImg,
            id: data.id,
            email: user.email,
          };
          setUser(newUser);
        }
        setEditProfileSuccess(response.data.msg || "Atualizado com sucesso");
        setEditProfileError("");
        return response.data;
      } catch (error: any) {
        // 'error' agora é do tipo 'any' para permitir acesso a 'response'
        setEditProfileError(error.response?.data.msg || "Erro desconhecido");
        setEditProfileSuccess("");
        throw error.response?.data.msg || "Erro desconhecido";
      }
    },
    onSuccess: () => {
      setEditProfile(false);
      queryClient.invalidateQueries({ queryKey: ["profile", searchParams.id] });
    },
  });
  

  return (
    <>
      <title>{`Perfil de ` + profileQuery.data?.username}</title>
      <div className="w-3/4 md:w-3/5 sm:w-4/4 flex flex-col items-center">
        <div className="relative">
          <img
            className="rounded-xl w-40 h-30 sm:w-60 sm:h-30 md:w-80 md:h-40 lg:w-80 lg:h-50 xl:w-80 xl:h-40 object-cover"
            src={
              profileQuery.data?.bgImg
                ? profileQuery.data.bgImg
                : "https://img.freepik.com/fotos-gratis/fundo-azul-do-gradiente-de-luxo-abstrato-liso-azul-escuro-com-vinheta-preta-studio-banner_1258-52393.jpg?w=740&t=st=1696028331~exp=1696028931~hmac=ff6d78a9446b39ef04877dee2de00952857aa4f088936de0c5b8778ce72ad8c6"
            }
            alt="capa"
          />

          <div className="absolute left-1/2 mt-6 transform -translate-x-1/2 -translate-y-1/2 flex items-center flex-col">
            <img
              className="w-22 h-22 md:w-32 md:h-32 lg:w-38 lg:h-38 xl:w-45 xl:h-45 rounded-full border-zinc-100 border-2"
              src={
                profileQuery.data?.userImg ||
                "https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png"
              }
              alt="imagem do perfil"
            />

            <span className="text-2m font-bold mt-2">
              {profileQuery.data?.username}
            </span>
          </div>
        </div>
        <div className="pt-36 w-3/5 flex flex-col items-center gap-3">
          {user?.id !== +searchParams.id ? (
            <button
              onClick={() =>
                user &&
                mutation.mutate({
                  followed,
                  followed_id: +searchParams.id,
                  follower_id: user.id,
                })
              }
              className={`w-1/2 rounded-md py-2 font-semibold ${
                followed
                  ? `bg-zinc-300  hover:text-black`
                  : `bg-blue-600 text-white hover:bg-blue-700`
              }`}
            >
              {followed ? "Deixar de seguir" : "Seguir"}
            </button>
          ) : (
            <button
              className={`w-1/2 rounded-md py-2 font-semibold bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline-blue active:bg-blue-800`}
              onClick={() => setEditProfile(true)}
            >
              Editar perfil
            </button>
          )}
          {editProfile && (
            <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000094] z-10 flex items-center justify-center">
              <div className="bg-white w-2/3 rounded-xl flex flex-col items-center">
                <header className="w-full border-b font-semibold text-lg text-zinc-600 flex justify-between items-center p-2">
                  Editar Perfil
                  <button onClick={() => setEditProfile(false)}>
                    <FaTimesCircle className="text-red-600 text-3xl" />
                  </button>
                </header>
                <form className="w-2/3 py-8 flex flex-col gap-8">
                  <AuthInput label="Nome: " newState={setUserName} />
                  <AuthInput label="Imagem do perfil: " newState={setUserImg} />
                  <AuthInput label="Imagem de capa: " newState={setBgImg} />
                  {editProfileError && (
                    <span className="text-red-600">* {editProfileError}</span>
                  )}
                  <button
                    className={`w-1/2 rounded-md py-2 font-semibold bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline-blue active:bg-blue-800 self-center`}
                    onClick={(e) => {
                      e.preventDefault();
                      editProfileMutation.mutate({
                        username,
                        userImg,
                        bgImg,
                        id: +searchParams.id,
                      });
                    }}
                  >
                    Salvar
                  </button>
                </form>
              </div>
            </div>
          )}
          <Feed post={postQuery.data} />
        </div>
      </div>
    </>
  );
}

export default Profile;
