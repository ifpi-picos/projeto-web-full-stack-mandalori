export interface IPost {
    id: number;
    post_desc: string;
    img: string;
    username: string;
    userImg: string;
    created_at: string;
    userId: number;
}

export interface IFriendship{
    id: number,
    follower_id: number
    followed_id: number
    username: string
    userImg: string
}

export interface IUser{
    id: number;
    username: string;
    userImg: string;
}

export interface IComments{
    id: number;
    comment_desc: string;
    userImg: string;
    comment_user_id: number;
    username: string;
    post_id: number;
    created_at: string;

}

export interface ILikes{
    id: number;
    likes_user_id: number;
    username: string;
    likes_post_id: number;
}
