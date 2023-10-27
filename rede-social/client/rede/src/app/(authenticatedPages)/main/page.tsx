"use client"

import Feed from "@/app/components/Feed";
import Share from "@/app/components/Share";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";

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
    <div className="w-2/6 flex flex-col gap-5">
        <Share />
        <Feed post={postQuery.data}/>
    </div>)
}

export default Main;