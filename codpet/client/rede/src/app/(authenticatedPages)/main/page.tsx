"use client"

import Feed from "@/app/components/Feed";
import Share from "@/app/components/Share";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import FriendshipTable from "@/app/components/FriendshipTable";
import {IPost} from "@/interfaces";

// define a interface para os objetos de postagem

// componente principal
function Main() {
    // utiliza o hook useQuery para obter os dados das postagens
    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ['posts'],
        queryFn: () => makeRequest.get('post/?id=')
            .then((res) => {
                return res.data.data;
            })
    });

    // verifica se ocorreu algum erro durante a consulta
    if (postQuery.error) {
        console.log(postQuery.error);
    }

    return (
    <>
    <title>Página Inicial</title>
    <div className="w-3/4 sm:w-full md:w-4/5 flex flex-col gap-5 p-4 items-center">
        <Share />
        <Feed post={postQuery.data} />
        <FriendshipTable/>
    </div>
    </>
    )
}

export default Main;