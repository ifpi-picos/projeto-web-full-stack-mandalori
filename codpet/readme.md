# para rodar o projeto 

## lado back-end

#### bibliotecas: 
`npm install`

### para rodar a api 

crie um arquivo `.env` com os dados do mysql da sua maquina (os tokens se mantem)

DB_HOST = 
DB_USER = 
DB_PASS = 
DB = 
REFRESH = HeVg3IIIxPSKLr+viDrvFZ+wyYWLs7MmmiYfWcjkZq6iu7Fsygf4/8kgKY/UAInV95ossTd2aV8+RMx6lFILcSDId/pulf5/1lbwtMkFTxIacl/bdefyDZMezlNsQxiqF/dgLquG90B1rEekm/s2gbevucNVMAxk9TgFnLftbBdRuTclOIt/pJJZKyZJa/wExqkjyxDBWmtHM8QNdiSuONo+WYzqELKM30HZuCq1CwbvR6oB0vz2D0WJp2jtvC76b9QFDQWCYON7VlOpV30kyCG9aXc476nzo8yB66R3vZGxnE65D5neN+RkaILDjtdm4rQVVcCatFtK3aZbof6pzA== 
TOKEN = eOhy5z55cHsxmxGUeXTRQHlVoEwo/Z+bXqwI06yqDwZ092tWJsepvtMkrZQpHYg+iZazQHUsxinS3+YnLS7068XEjjgzgTds9A1+wkmfcl6kU+bADO2XD7rYKSrjZw/UX60Rb6F2b2mkG4qizdluJalr86a4RiT8eIwV4AmGflvZwnq9RFwmNjEtXiomFMSYTu41SK35axNwuK+rnSdMH4YfrYB3wAJohBWwy51jvJkiLUQII7vhAY/9/AAdQaL//awOC9StE6lPvEASJa9mdj7+uVLfUMdlP2ggUo0i2nCcwJpwwkdyEFSpQacfVGKMhZSsvxSsd+v0H0N8O2sdJg==

e de o comando: `npm run start`


## lado front-end

você precisa instalar as bibliotecas uutilizadas basta apenas usar esse comando dentro da pasta rede

### bibliotecas:

`npm install`

depois na mesma pasta rode o comando

`npm run dev`

# script linux

## back-api

`yarn add bcrypt body-parser cookie-parser cors dotenv express jsonwebtoken multer my sql --save`

`yarn start`

## front-client

`yarn add autoprefixer axios eslint eslint-config-next next postcss react react-dom react-icons tailwindcss typescript @tanstack/react-query moment nextjs reactjs --save`

`yarn dev`

:: comandos para criar o banco de dados utilizado na aplicação

### crie um schema com o nome "rede_social"

create database rede_social;

use rede_social;

create table `rede_social`. `user` (
    `id` int not null auto_increment,
    `username` varchar(45) not null, 
    `email` varchar(100) not null,
    `password` varchar(200) null,
    `userImg` varchar(300) null,
    `bgImg` varchar(300) null,
    primary key (`id`)
) auto_increment=1;


create table `rede_social`. `posts` (
	`id` int not null auto_increment,
    `post_desc` varchar(200) null,
    `img` varchar(300) null,
    `userId` int not null,
    `created_at` timestamp default current_timestamp,
    primary key (`id`),
    constraint `userId`
    foreign key (`userId`)
    references `rede_social`.`user`(`id`)
    on delete cascade
    on update cascade
) auto_increment=1;

create table `rede_social`. `comments` (
    `id` int not null auto_increment,
    `comment_desc` varchar(200) not null,
    `comment_user_id` int not null,
    `post_id` int not null,
    `created_at` timestamp default current_timestamp ,
    primary key (`id`),
    constraint `comment_user_id`
    foreign key (`comment_user_id`)
    references `rede_social`.`user`(`id`)
    on delete cascade
    on update cascade,
	constraint `post_id`
    foreign key (`post_id`)
    references `rede_social`.`posts`(`id`)
    on delete cascade
    on update cascade
    
) auto_increment=1;

create table rede_social. likes (
    id int not null auto_increment,  
    likes_user_id int not null, 
    likes_post_id int not null, 
    primary key (id), 
    constraint likes_user_id 
    foreign key (likes_user_id) 
    references rede_social.user(id) 
    on delete cascade 
    on update cascade, 
    constraint likes_post_id 
    foreign key (likes_post_id) 
    references rede_social.posts(id) 
    on delete cascade 
    on update cascade

) auto_increment=1;


create table `rede_social`. `friendship` (
    `id` int not null auto_increment,
    `follower_id` int not null,
    `followed_id` int not null,
    primary key (`id`),
    constraint `follower_id`
    foreign key (`follower_id`)
    references `rede_social`.`user`(`id`)
    on delete cascade
    on update cascade,
	constraint `followed_id`
    foreign key (`followed_id`)
    references `rede_social`.`user`(`id`)
    on delete cascade
    on update cascade
) auto_increment=1;


