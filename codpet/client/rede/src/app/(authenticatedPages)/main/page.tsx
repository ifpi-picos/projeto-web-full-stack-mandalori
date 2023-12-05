"use client"

import Feed from "@/app/components/Feed";
import Share from "@/app/components/Share";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import FriendshipTable from "@/app/components/FriendshipTable";

interface IPost {
    id: number;
    post_desc: string;
    img: string;
    username: string;
    userImg: string;
    created_at: string;
    userId: number;
}



function Main() {

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ['posts'],
        queryFn: () => makeRequest.get('post/?id=')
            .then((res) => {
                return res.data.data;
            })
    });

    if (postQuery.error) {
        console.log(postQuery.error);
    }



    return (
    <>
    <title> Página Inicial</title>
    <div className="w-3/4 sm:w-full md:w-4/5 flex flex-col gap-5 p-4 items-center">
        <Share />
        <Feed post={postQuery.data} />
        <FriendshipTable/>
    </div>
    </>
    )
}

export default Main;