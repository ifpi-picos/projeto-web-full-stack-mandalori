"use client"

import Post from "./Post";
import { IPost } from "@/interfaces";

function Feed(props:{post:IPost[]|undefined}) {


    return (
<div className="flex flex-col items-center gap-5 w-full">
  <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2 flex flex-col gap-3 items-center">
    {props.post?.map((post, id) => {
      return <Post post={post} key={id} />;
    })}
  </div>
</div>

    );
}

export default Feed;