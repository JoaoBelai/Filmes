USE Orion_Filmes;

INSERT INTO categoria (nome) VALUES
('Ação'),
('Aventura'),
('Comédia'),
('Comédia Romântica'),
('Drama'),
('Ficção Científica'),
('Fantasia'),
('Terror'),
('Suspense'),
('Mistério'),
('Crime'),
('Policial'),
('Faroeste'),
('Guerra'),
('Musical'),
('Animação'),
('Documentário'),
('Biografia'),
('Histórico'),
('Família'),
('Esporte'),
('Romance'),
('Super-herói');

INSERT INTO filme (titulo, ano, duracao, sinopse, produtora, poster, banner) VALUES
(
    'Um Sonho de Liberdade', 1994, 142, 
    'Dois homens presos se unem para sobreviver, encontrando consolo e eventual redenção através de atos de decência comum. Um deles, Andy Dufresne, planeja uma fuga elaborada.', 
    'Castle Rock Entertainment', 'https://br.web.img2.acsta.net/medias/nmedia/18/90/16/48/20083748.jpg', 'https://i.ytimg.com/vi/V5klp_P4sS4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBdCZj1-9Z_NyriWnJYlGIfOB7C2Q'
),
(
    'O Poderoso Chefão', 1972, 175, 
    'O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante, que se transforma em um líder impiedoso.', 
    'Paramount Pictures', 'https://i.pinimg.com/736x/6d/18/62/6d1862a3dd0d9190ce13e3fab9b8b942.jpg', 'https://midias.jb.com.br/_midias/jpg/2022/05/06/787x524/1_godfather-675976.jpg'
),
(
    'Batman: O Cavaleiro das Trevas', 2008, 152, 
    'Quando o Coringa emerge como uma ameaça anárquica, Batman deve aceitar um dos maiores testes psicológicos e físicos de sua capacidade de lutar contra a injustiça.', 
    'Warner Bros. Pictures', 'https://br.web.img3.acsta.net/medias/nmedia/18/86/98/32/19870786.jpg', 'https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/52217243-a137-45d6-9c6a-0dfab4633034/6564d1d0c596a88736f4caa25350d6c7c1e501bf.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom'
),
(
    'Pulp Fiction: Tempo de Violência', 1994, 154, 
    'As vidas de dois assassinos de aluguel, um boxeador, a esposa de um gângster e um casal de assaltantes se entrelaçam em quatro histórias de violência e redenção.', 
    'Miramax Films', 'https://m.media-amazon.com/images/I/71e+s01VVJL._AC_UF1000,1000_QL80_.jpg', 'https://img.englishcinemabarcelona.com/b2E3AzA-XCnvwoLBLnB_G2J-LPMrua7tZcajtCTlPpI/resize:fill:800:450:1:0/gravity:sm/aHR0cHM6Ly9leHBhdGNpbmVtYXByb2QuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy84ZjEzODlhNi03MTVlLTQ2NDMtYTExNS03M2VlOTA1NzA5MTAuanBn.jpg'
),
(
    'O Senhor dos Anéis: O Retorno do Rei', 2003, 201, 
    'Gandalf e Aragorn lideram o Mundo dos Homens contra o exército de Sauron, enquanto Frodo e Sam se aproximam da Montanha da Perdição para destruir o Um Anel.', 
    'New Line Cinema', 'https://ingresso-a.akamaihd.net/img/cinema/cartaz/15351-cartaz.jpg', 'https://uploads.maisgoias.com.br/2022/09/b5605b7d-o-senhor-dos-aneis-o-retorno-do-rei.jpg'
),
(
    'Clube da Luta', 1999, 139, 
    'Um trabalhador de escritório insone e um vendedor de sabão formam um ''clube da luta'' clandestino que evolui para algo muito mais sombrio e complexo.', 
    '20th Century Fox', 'https://br.web.img3.acsta.net/medias/nmedia/18/90/95/96/20122166.jpg', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi19vjPbHR8V7gPw_hYQE6W6MkjxUm0IO7Mxg6HKc4SgI-nkHAtLTy_q38MjCGGnn3Oc-FEsDvwm9EDBnOCLcmPHnFqjgDQaMHhMdhNYYXTS6y-HmrAPn4EzyJG1ebQ8tPM4LHQ2eoR56U/s1000/clube+da+luta.png'
),
(
    'Forrest Gump: O Contador de Histórias', 1994, 142, 
    'Um homem com baixo QI, mas de bom coração, testemunha e influencia inadvertidamente vários eventos históricos importantes nos Estados Unidos do século XX.', 
    'Paramount Pictures', 'https://uauposters.com.br/media/catalog/product/3/5/352820210407-uau-posters-forrest-gump-filmes-3.jpg', 'https://m.media-amazon.com/images/I/61z62YqWV5L._AC_UF894,1000_QL80_.jpg'
),
(
    'Matrix', 1999, 136, 
    'Um hacker descobre que a realidade que conhece é uma simulação de computador e se junta a uma rebelião para libertar a humanidade das máquinas.', 
    'Warner Bros. Pictures', 'https://i.ebayimg.com/thumbs/images/g/5ZcAAOSwxeNgUPQV/s-l1200.webp', 'https://img.englishcinemabarcelona.com/BVZBaq6fsTow7KZmdNWUFoEOT1GThWYfAprhqMDZEi4/resize:fill:800:450:1:0/gravity:sm/aHR0cHM6Ly9leHBhdGNpbmVtYXByb2QuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy9lMTA1YjhlNi1hOTcyLTQxMmMtYmRiMy0yZmJkYWE1NDA2OWYuanBn.jpg'
),
(
    'Star Wars: Episódio V - O Império Contra-Ataca', 1980, 124, 
    'Após a destruição da Estrela da Morte, as forças do Império perseguem a Aliança Rebelde. Luke Skywalker treina com Yoda enquanto seus amigos enfrentam Darth Vader.', 
    'Lucasfilm Ltd.', 'https://m.media-amazon.com/images/M/MV5BY2ViMjFhMDMtNTA4Yi00NGJjLTk0ZTktNGVkZjJjMGY4ZTFkXkEyXkFqcGc@._V1_.jpg', 'https://cinepop.com.br/wp-content/uploads/2020/05/star-wars-capa.jpg'
),
(
    'Interestelar', 2014, 169, 
    'Com a Terra se tornando inabitável, uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir o futuro da humanidade.', 
    'Paramount Pictures', 'https://m.media-amazon.com/images/I/81v1NMJBrlL._AC_UF894,1000_QL80_.jpg', 'https://br.web.img3.acsta.net/r_1280_720/pictures/14/09/23/09/05/048462.jpg'
),
(
    'Se7en: Os Sete Crimes Capitais', 1995, 127, 
    'Dois detetives, um novato e um prestes a se aposentar, caçam um assassino em série que usa os sete pecados capitais como tema para seus crimes brutais.', 
    'New Line Cinema', 'https://m.media-amazon.com/images/M/MV5BN2U5ZDE4OTgtYzY4ZC00MWFhLTg2ZjUtNDQ2ZGE0MDUyNmVkXkEyXkFqcGc@._V1_.jpg', 'https://img.englishcinemaparis.com/mrhT931jttZ8mdmekHMT8tGZx9M6fvg8RiMephHAzOM/resize:fill:800:450:1:0/gravity:sm/aHR0cHM6Ly9leHBhdGNpbmVtYXByb2QuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy8xMDRhODQ2OC1iMTUyLTRkZWItYmRjMS1iNDg0M2IxMTJjYmQuanBn.jpg'
),
(
    'O Rei Leão', 1994, 88, 
    'O jovem príncipe leão Simba foge de seu reino após a morte de seu pai, Mufasa, enganado por seu tio traiçoeiro, Scar. Anos depois, ele retorna para reivindicar seu lugar.', 
    'Walt Disney Pictures', 'https://xl.movieposterdb.com/20_08/1994/110357/xl_110357_166d568e.jpg', 'https://maisquecinema.com.br/wp-content/uploads/2019/07/o-rei-leao-94-destaque.jpg'
),
(
    'O Resgate do Soldado Ryan', 1998, 169, 
    'Durante a invasão da Normandia na Segunda Guerra Mundial, um grupo de soldados americanos é enviado em uma missão perigosa para encontrar e resgatar o último irmão sobrevivente de uma família.', 
    'DreamWorks Pictures', 'https://m.media-amazon.com/images/M/MV5BZWVkYTBlODQtMjFiMi00ODExLWJhMzUtNGY5MDg0MDQwZTM4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'https://m.media-amazon.com/images/S/pv-target-images/a916b10697f03651b50abd83940110e0cb899e21170009a331e2520a6beba482.jpg'
),
(
    'Toy Story', 1995, 81, 
    'O boneco caubói Woody se sente ameaçado quando um novo e moderno brinquedo espacial, Buzz Lightyear, se torna o favorito de seu dono, Andy.', 
    'Pixar Animation Studios', 'https://m.media-amazon.com/images/M/MV5BZTA3OWVjOWItNjE1NS00NzZiLWE1MjgtZDZhMWI1ZTlkNzYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'https://i.pinimg.com/736x/ee/dd/a2/eedda282cce0908addaea7c7cdb85c5b.jpg'
),
(
    'Kung Fu Panda 2', 2011, 90, 
    'Po e os Cinco Furiosos se unem para proteger o Vale da Paz de um novo e formidável vilão, Lord Shen, que planeja usar uma arma secreta para conquistar a China.', 
    'DreamWorks Animation', 'https://m.media-amazon.com/images/M/MV5BNzNhYTkwMGMtNTc0Yi00YzQzLWEzYWMtMjQzNDc4YmJmM2FmXkEyXkFqcGc@._V1_.jpg', 'https://wallpaper.forfun.com/fetch/7f/7f4ffe92bf7442ecd6866c25f1c61d3d.jpeg'
),
(
    'Django Livre', 2012, 165, 
    'Com a ajuda de um caçador de recompensas alemão, um escravo liberto chamado Django parte para resgatar sua esposa de um brutal fazendeiro do Mississippi.', 
    'Columbia Pictures', 'https://m.media-amazon.com/images/M/MV5BYzZkZTEwODktNTFiNC00NWIxLWJlZjUtYTc4MGFmOWQ3NWY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZgh2rMSjF6oaiCDzxS6_iayBYQpUAXj2c-cjj_HzXriDaCv5EV7x5Jn-xnDgDWIAFrSDD1heu_edyVbMQE7_0XzmrGpPgy7usz5dOUsmdUAOo4cDD2wKPeLWroaGSRfUoY-ovTDvB49s/s640/121412-shows-django-unchained-movie-poster.jpg'
),
(
    'Ilha do Medo', 2010, 138, 
    'Em 1954, dois agentes federais investigam o desaparecimento de uma paciente em um hospital psiquiátrico em uma ilha remota, mas descobrem segredos sombrios sobre o local.', 
    'Paramount Pictures', 'https://m.media-amazon.com/images/M/MV5BNDE4NDk1ODItMWVkNi00YTA0LWIzNDEtYzdjYjA2MGE3MzllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjc7GHOAZjjueVo10A0CMQOx8YzudWrQwhw0mLM7q0kK9vySARvghQQnlG_IlnYpk4z5htvBWFAAA-PecqZfSjzA1cxQO0Z6vzM77emUfocPeK8dIr8f-m3VaGCmfiapa1ipXX7WmN4Zak/s1600/shutter+island.png'
),
(
    'Avatar: O Caminho da Água', 2022, 192, 
    'Jake Sully vive com sua nova família no planeta Pandora. Quando uma ameaça familiar retorna, ele deve trabalhar com os Na''vi para proteger seu lar.', 
    '20th Century Studios', 'https://m.media-amazon.com/images/M/MV5BY2ExYzkyNGUtODQwNS00MGZiLWE2NmItYTg3YjVjZGIxN2NhXkEyXkFqcGc@._V1_.jpg', 'https://geeksofcolor.co/wp-content/uploads/2022/12/T5-Avatar2.jpg'
),
(
    'Vingadores: Ultimato', 2019, 181, 
    'Após os eventos devastadores de ''Guerra Infinita'', os Vingadores restantes se reúnem para uma última tentativa de reverter as ações de Thanos e restaurar a ordem no universo.', 
    'Marvel Studios', 'https://m.media-amazon.com/images/M/MV5BMWYzMzk2MTktYjMzYS00MjVmLWE1ZDgtMzczMDc1NjZhODUwXkEyXkFqcGc@._V1_.jpg', 'https://lbatistaautor.com/wp-content/uploads/2023/06/scale-1200x600.jpg'
),
(
    'F1', 2025, 156, 
    'Um ex-piloto de Fórmula 1 (Sonny Hayes) retorna ao esporte para competir ao lado de um piloto novato (Joshua Pearce) pela equipe fictícia APXGP.', 
    'Apple Original Films', 'https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-04249-3784db6fa43156532217507643791318-1024-1024.webp', 'https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/F1%20movie/f1_movie_poster16x9%20(1).webp'
),
(
    'Bastardos Inglórios', 2009, 153, 
    'Durante a Segunda Guerra Mundial, na França ocupada pelos nazistas, um grupo de soldados judeus-americanos tem a missão de espalhar o terror entre o Terceiro Reich.', 
    'Universal Pictures', 'https://m.media-amazon.com/images/M/MV5BN2Y1ZmE1ZWItZjQ1OS00YWQxLWE4NWMtNzJkODA4MmE3NTRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'https://wallpapers.com/images/hd/inglourious-basterds-vintage-artwork-imp147awqnx6qc0l.jpg'
),
(
    'Homem-Aranha: Através do Aranhaverso', 2023, 140, 
    'Miles Morales é catapultado através do Multiverso, onde encontra uma equipe de Pessoas-Aranha encarregada de proteger sua própria existência.', 
    'Sony Pictures Animation', 'https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_.jpg', 'https://www.popzara.com/wp-content/uploads/2023/06/spiderman_atsv_featured.jpg'
),
(
    'Gente Grande', 2010, 102, 
    'Cinco amigos de infância se reúnem após trinta anos para o funeral de seu antigo treinador de basquete e passam o fim de semana em uma casa no lago com suas famílias.', 
    'Columbia Pictures', 'https://m.media-amazon.com/images/M/MV5BMjA0ODYwNzU5Nl5BMl5BanBnXkFtZTcwNTI1MTgxMw@@._V1_FMjpg_UX1000_.jpg', 'https://m.media-amazon.com/images/S/pv-target-images/b71b06873fb90830776f41793940dddf06e5f38de22aa19e456d1aa3e1da483f.jpg'
);

INSERT INTO diretor (nome) VALUES
('Anthony Russo'),
('Christopher Nolan'),
('David Fincher'),
('Dennis Dugan'),
('Francis Ford Coppola'),
('Frank Darabont'),
('Irvin Kershner'),
('James Cameron'),
('Jennifer Yuh Nelson'),
('Joaquim Dos Santos'),
('Joe Russo'),
('John Lasseter'),
('Joseph Kosinski'),
('Justin K. Thompson'),
('Kemp Powers'),
('Lana Wachowski'),
('Lilly Wachowski'),
('Martin Scorsese'),
('Peter Jackson'),
('Quentin Tarantino'),
('Rob Minkoff'),
('Robert Zemeckis'),
('Roger Allers'),
('Steven Spielberg');

INSERT INTO ator (nome) VALUES
('Adam Sandler'),
('Al Pacino'),
('Brad Pitt'),
('Christian Bale'),
('Edward Norton'),
('Elijah Wood'),
('Jack Black'),
('Jamie Foxx'),
('John Travolta'),
('Keanu Reeves'),
('Leonardo DiCaprio'),
('Mark Hamill'),
('Matthew Broderick'),
('Matthew McConaughey'),
('Robert Downey Jr.'),
('Sam Worthington'),
('Shameik Moore'),
('Tom Hanks'),
('Tim Robbins');


INSERT INTO categoria_filme (id_filme, id_categoria) VALUES
(1, 5), (1, 11),
(2, 11), (2, 5),
(3, 1), (3, 23), (3, 5),
(4, 11), (4, 5),
(5, 7), (5, 2), (5, 1),
(6, 5), (6, 9),
(7, 5), (7, 4), (7, 22),
(8, 6), (8, 1),
(9, 6), (9, 2), (9, 7),
(10, 6), (10, 5), (10, 2),
(11, 9), (11, 11), (11, 10),
(12, 16), (12, 20), (12, 5), (12, 15),
(13, 14), (13, 5), (13, 1),
(14, 16), (14, 3), (14, 20),
(15, 16), (15, 1), (15, 3),
(16, 13), (16, 5),
(17, 9), (17, 10), (17, 5),
(18, 6), (18, 1), (18, 2),
(19, 23), (19, 1), (19, 6),
(20, 21), (20, 5), (20, 1),
(21, 14), (21, 5),
(22, 16), (22, 23), (22, 1), (22, 2),
(23, 3), (23, 20);

INSERT INTO diretor_filme (id_filme, id_diretor) VALUES
(1, 6),
(2, 5),
(3, 2),
(4, 20),
(5, 19),
(6, 3),
(7, 22),
(8, 16), (8, 17),
(9, 7),
(10, 2),
(11, 3),
(12, 23),
(13, 24),
(14, 12),
(15, 9),
(16, 20),
(17, 18),
(18, 8),
(19, 1), (19, 11),
(20, 13),
(21, 20),
(22, 15),
(23, 4);

INSERT INTO ator_filme (id_filme, id_ator) VALUES
(2, 2),
(3, 4),
(4, 9),
(5, 6),
(6, 5),
(7, 18),
(8, 10),
(9, 12),
(10, 14),
(11, 3),
(12, 13),
(13, 18),
(14, 18),
(15, 7),
(16, 8),
(17, 11),
(18, 16),
(19, 15),
(20, 3),
(21, 3),
(22, 17),
(23, 1),
(1, 19);
