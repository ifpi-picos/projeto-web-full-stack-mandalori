# para rodar o projeto 

## lado back-end

#### bibliotecas: 
`npm install`

### para rodar a api 

crie um arquivo `.env` com os dados do mysql da sua maquina
existe um documento chamado ".env.example nos moldes do que vc deve adicionar nos campos" (os tokens se mantem)


e rode o comando: `npm run start`


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

CREATE DATABASE codpet;

USE codpet;

CREATE TABLE codpet.user (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(200) NULL,
  userImg VARCHAR(300) NULL,
  bgImg VARCHAR(300) NULL,
  PRIMARY KEY (id)
) AUTO_INCREMENT=1;

CREATE TABLE codpet.posts (
  id INT NOT NULL AUTO_INCREMENT,
  post_desc VARCHAR(200) NULL,
  img VARCHAR(300) NULL,
  userId INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT userId FOREIGN KEY (userId) REFERENCES codpet.user(id) ON DELETE CASCADE ON UPDATE CASCADE
) AUTO_INCREMENT=1;

CREATE TABLE codpet.comments (
  id INT NOT NULL AUTO_INCREMENT,
  comment_desc VARCHAR(200) NOT NULL,
  comment_user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT comment_user_id FOREIGN KEY (comment_user_id) REFERENCES codpet.user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES codpet.posts(id) ON DELETE CASCADE ON UPDATE CASCADE
) AUTO_INCREMENT=1;

CREATE TABLE codpet.likes (
  id INT NOT NULL AUTO_INCREMENT,
  likes_user_id INT NOT NULL,
  likes_post_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT likes_user_id FOREIGN KEY (likes_user_id) REFERENCES codpet.user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT likes_post_id FOREIGN KEY (likes_post_id) REFERENCES codpet.posts(id) ON DELETE CASCADE ON UPDATE CASCADE
) AUTO_INCREMENT=1;

CREATE TABLE codpet.friendship (
  id INT NOT NULL AUTO_INCREMENT,
  follower_id INT NOT NULL,
  followed_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT follower_id FOREIGN KEY (follower_id) REFERENCES codpet.user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT followed_id FOREIGN KEY (followed_id) REFERENCES codpet.user(id) ON DELETE CASCADE ON UPDATE CASCADE
) AUTO_INCREMENT=1;



