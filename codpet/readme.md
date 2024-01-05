
# CodPet

### Baixar o projeto:
```bash
git clone https://github.com/ifpi-picos/projeto-web-full-stack-mandalori.git
```

### Lado do Backend

### Acesse a pasta principal:
```bash
cd codpet/api
```
### Instalar dependencias:
```bash
npm install 
```

# Crie um arquivo .env com os dados do MySQL da sua máquina
Existe um arquivo de exemplo do .env chamado .envexample que deve ser criado dentro da pasta api, basta apenas adicionar os dados do seu MySQL nos campos.

### Iniciar o projeto:
```bash
npm run start
```

### Lado do Frontend

### Acesse a pasta principal:
```bash
cd codpet/client/rede
```
### Instalar dependencias:
```bash
npm install 
```
### Iniciar o projeto:
```bash
npm run dev
```

# Comandos para criar o banco de dados MYSQL utilizado na aplicação

```bash

CREATE SCHEMA codpet;

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
```

