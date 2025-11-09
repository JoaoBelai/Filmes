CREATE DATABASE Orion_Filmes;

USE Orion_Filmes;

CREATE TABLE categoria(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE diretor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE ator(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE filme(
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    duracao INT NOT NULL,
    sinopse TEXT NOT NULL,
    produtora VARCHAR(255) NOT NULL,
    poster VARCHAR(255) NOT NULL,
    banner VARCHAR(255) NOT NULL
);

CREATE TABLE categoria_filme(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    id_filme INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id) ON DELETE CASCADE,
    FOREIGN KEY (id_filme) REFERENCES filme(id) ON DELETE CASCADE
);

CREATE TABLE diretor_filme(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_diretor INT NOT NULL,
    id_filme INT NOT NULL,
    FOREIGN KEY (id_diretor) REFERENCES diretor(id) ON DELETE CASCADE,
    FOREIGN KEY (id_filme) REFERENCES filme(id) ON DELETE CASCADE
);

CREATE TABLE ator_filme(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_ator INT NOT NULL,
    id_filme INT NOT NULL,
    FOREIGN KEY (id_ator) REFERENCES ator(id) ON DELETE CASCADE,
    FOREIGN KEY (id_filme) REFERENCES filme(id) ON DELETE CASCADE
);

CREATE TABLE solicitacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario_solicitante INT NOT NULL,
    role_solicitante ENUM('admin', 'user') NOT NULL,
    tipo ENUM('add', 'edit') NOT NULL,
    id_filme_alvo INT NULL,
    dados_propostos JSON NOT NULL,
    status ENUM('pendente', 'aprovado', 'rejeitado') NOT NULL DEFAULT 'pendente',
    FOREIGN KEY (id_filme_alvo) REFERENCES filme(id) ON DELETE CASCADE
);