
import UserContext from "@/context/UserContext";
import Link from "next/link";
import {useContext} from "react";
import { FaAlignLeft, FaCalendar, FaFlag, FaHeart, FaStore, FaUserFriends } from "react-icons/fa";




function Sidebar() {
    
    const {user} = useContext(UserContext);

    return(

        //tag mto utilizada pra side bar
        <aside className="fixed w-1/6 pl-4">
            <nav className=" flex flex-col gap-6 text-gray-600 font-semibold">
                <Link href={'/profile?id='+ user?.id }  className="flex-gap-2 pb-6 items-center">
                    <img 
                        src={user?.userImg? user.userImg: 'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'} 
                        alt="imagem do perfil" 
                        className="u-8 h-8 rounded-full" />
                        <span>{user?.username}</span>
                        </Link>
                
                <Link href='' className="flex gap-3"> <FaUserFriends className='w-6 h-6'/>amigos</Link>
                <Link href='' className="flex gap-3"> <FaAlignLeft className='w-6 h-6' />feed</Link>
                <Link href='' className="flex gap-3"> <FaStore className='w-6 h-6' />store</Link>
                <Link href='' className="flex gap-3" > <FaHeart className='w-6 h-6' />favoritos</Link> 
                <Link href='' className="flex gap-3" > <FaFlag className='w-6 h-6' />paginas</Link>
                <Link href='' className="flex gap-3" > <FaCalendar className='w-6 h-6' />eventos</Link>
            </nav>
        </aside>
    )
}

export default Sidebar;