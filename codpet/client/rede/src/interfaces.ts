// interface para representar um post
export interface IPost {
    id: number; // identificador único do post
    post_desc: string; // descrição do post
    img: string; // URL da imagem associada ao post
    username: string; // nome de usuário do autor do post
    userImg: string; // URL da imagem do autor do post
    created_at: string; // data e hora de criação do post
    userId: number; // identificador único do usuário que fez o post
}

// interface para representar uma amizade
export interface IFriendship {
    id: number; // identificador único da amizade
    follower_id: number; // identificador único do seguidor
    followed_id: number; // identificador único do usuário seguido
    username: string; // nome de usuário do usuário seguido
    userImg: string; // URL da imagem do usuário seguido
}

// interface para representar um usuário
export interface IUser {
    id: number; // identificador único do usuário
    username: string; // nome de usuário
    userImg: string; // URL da imagem do usuário
}

// interface para representar um comentário
export interface IComments {
    id: number; // identificador único do comentário
    comment_desc: string; // descrição do comentário
    userImg: string; // URL da imagem do usuário que fez o comentário
    comment_user_id: number; // identificador único do usuário que fez o comentário
    username: string; // nome de usuário do autor do comentário
    post_id: number; // identificador único do post ao qual o comentário está associado
    created_at: string; // data e hora de criação do comentário
}

// interface para representar um like
export interface ILikes {
    id: number; // identificador único do like
    likes_user_id: number; // identificador único do usuário que deu o like
    username: string; // nome de usuário do autor do like
    likes_post_id: number; // identificador único do post que recebeu o like
}