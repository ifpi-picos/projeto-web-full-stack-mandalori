import { comment } from "postcss";
import moment from "moment";
import 'moment/locale/pt-br';
import { IComments } from "@/interfaces";
import Link from "next/link";


function Comment(props: {comment: IComments}) {
    const{comment_desc, userImg, username, created_at, comment_user_id}= props.comment
    return (
        
        <div className="mt-6 flex gap-2">
            
            <Link href={'/profile?id=' + comment_user_id}>
            <img 
                className="w-8 h-8 rounded-full" 
                src={
                    userImg?
                    userImg:
                    "https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png"}

                    alt="imagem do usuario q fez o comentario"/> 
                </Link>

            <div className="text-zinc-600 w-full">
                <div className="flex flex-col bg-zinc-100 px-4 py-1 rounded-md">
                <Link href={'/profile?id=' + comment_user_id}>
                <span className="font-bold">{username}</span>
                </Link>
                    <span>{comment_desc}</span>
                </div>
                <span className="text-xs">{moment(created_at).fromNow()}</span>
            </div>
        </div>

    );
}




export default Comment;