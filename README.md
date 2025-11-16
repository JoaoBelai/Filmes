# Órion – Catálogo de Filmes

Plataforma web desenvolvida como projeto acadêmico para o Senai Roberto Mange, permitindo visualizar, cadastrar, editar e excluir filmes.
Conta com sistema de autenticação, papéis de usuário (admin e comum), interface moderna e integração completa entre **React (Front-End)**, **Python (Back-End)** e **MySQL**.

---

## Funcionalidades Principais

### 👤 Autenticação
* Login com dois perfis: Administrador e Usuário comum
* Permissões diferentes por tipo de usuário

### 🎬 Gerenciamento de Filmes (CRUD)
* Criar filmes
* Editar filmes
* Excluir filmes (somente admin)
* Visualizar detalhes completos: sinopse, banner, poster, categorias, duração etc.

### 🔎 Exploração e Busca
* Buscar filmes
* Filtrar resultados
* Ver filmes em destaque
* Ver filmes semelhantes (lógica do front)

### 📱 Interface e Usabilidade
* Layout moderno em tons de roxo
* Design inspirado em plataformas como HBO Max e Letterboxd
* Foco em acessibilidade e navegação simples

---

## 🛠️ Tecnologias Utilizadas

### Front-End
* React + Vite
* JavaScript
* Axios

### Back-End
* Python
* HTTPServer (módulo nativo)
* MySQL Connector

### Banco de Dados
* MySQL
* Script automático de criação (`setup_database.py`)

---

## ⚙️ Como Rodar o Projeto

Siga os passos na ordem correta para configurar o ambiente.

### 🗄️ 1. Banco de Dados (MySQL)
1.  Abra o **MySQL Workbench** (ou seu cliente MySQL preferido).
2.  Certifique-se de que o servidor MySQL está rodando na sua máquina (geralmente na porta `3306`).

---

### 🐍 2. Back-End

1.  **Acesse o diretório** do back-end:
    ```bash
    cd back
    ```

2.  **Crie e ative a Virtualenv** (ambiente virtual):
    ```bash
    python -m venv venv
    ```
    * **No Windows:**
        ```bash
        .\venv\Scripts\activate
        ```

3.  **Instale as dependências** do Python:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Rode o script de criação do banco de dados**:
    * Navegue até a pasta do script:
        ```bash
        cd database
        ```
    * Execute o script:
        ```bash
        python setup_database.py
        ```
    * O terminal pedirá suas credenciais do MySQL para criar o banco e as tabelas:
        ```bash
        Usuário do MySQL: (seu usuário, ex: root)
        Senha: (sua senha)
        ```
    * O script criará automaticamente o banco `Orion_Filmes`, suas tabelas e alguns dados iniciais.

5.  **Configure as credenciais** no arquivo de conexão:
    * Abra o arquivo `/back/database/db_connection.py`.
    * Edite o dicionário `DB_CONFIG` com as mesmas credenciais que você usou no passo anterior:
        ```python
        DB_CONFIG = {
            'user': 'SEU_USUARIO',
            'password': 'SUA_SENHA',
            'host': 'localhost',
            'database': 'Orion_Filmes'
        }
        ```

6.  **Inicie o servidor** do back-end:
    * Volte para a raiz da pasta `/back`.
    * Execute o `main.py`:
        ```bash
        python main.py
        ```
    * O servidor estará ativo na porta definida no código (geralmente `http://localhost:8000`).

---

### 💻 3. Front-End

1.  **Acesse o diretório** do front-end (em um novo terminal):
    ```bash
    cd front
    ```

2.  **Instale as dependências** do Node.js:
    ```bash
    npm install
    ```

3.  **Inicie o servidor** de desenvolvimento (Vite):
    ```bash
    npm run dev
    ```

4.  **Acesse a aplicação** no seu navegador:
    * [http://localhost:5173/](http://localhost:5173/)

---

## 🔐 Credenciais de Login Padrão

### 👑 Administrador
* **Email:** `admin@email.com`
* **Senha:** `admin123`

### 👤 Usuário Comum
* **Email:** `user@email.com`
* **Senha:** `user123`

---

## 🎨 Design & Prototipação

O protótipo de alta fidelidade do projeto foi desenvolvido no Figma e pode ser acessado no link abaixo:

[**Acessar o protótipo no Figma**](https://www.figma.com/design/lFC4fHrlFbGV9NW05fPErM/Untitled?node-id=263-398&t=3rVB9iyxLUeeyT59-1)
