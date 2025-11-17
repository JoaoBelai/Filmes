/*
  Componente de página inteira que renderiza o formulário de login
  Gerencia os estados de email, senha e mensagens de erro
  Ao submeter, envia uma requisição POST para a API /login.
  Se o login for bem-sucedido, armazena o token recebido usando o
  AuthContext e redireciona o usuário para a /home.
 */

import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Logo from '../../Assets/Images/Logo.png'
import { useAuth } from '../../Contexts/AuthContext';
import { useLoading } from '../../Contexts/LoadingContext';

const Login = () => {
    // Estados para os campos controlados do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estado para exibir mensagens de erro da API ou de conexão
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Pega a função 'login' do contexto de autenticação
    const { login } = useAuth();
    const { setIsLoading } = useLoading();

    // Função executada ao submeter o formulário
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Impede o recarregamento padrão da página
        setError(''); // Limpa erros anteriores
        setIsLoading(true);

        try {
            // Faz a requisição POST para o endpoint de login
            const response = await axios.post('http://localhost:8000/login', {
                username: email, // O backend espera 'username', então passamos o 'email'
                password: password
            });

            // Pega o token retornado pela API
            const token = response.data.token;

            // Chama a função 'login' do AuthContext para armazenar o token
            login(token);

            // Navega o usuário para a página Home após o sucesso
            navigate('/home');

        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.erro);
            } else {
                setError('Erro de conexão. Tente novamente mais tarde.');
            }
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <>
            <main className="mainLogin">
                <form className="formLogin" onSubmit={handleLoginSubmit}>
                    <figure className='imageLogin'>
                        <img src={Logo} alt="Logo do Site Orion" />
                    </figure>

                    <h1 className='loginTitle'>Login</h1>

                    <article className='inputLogin'>
                        <label htmlFor="email">E-mail *</label>
                        <input
                            type="email"
                            placeholder="E-mail"
                            id='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </article>

                    <article className='inputLogin'>
                        <label htmlFor="senha">Senha *</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            id='senha'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </article>

                    {/* Renderização condicional da mensagem de erro */}
                    {error && <p className="loginError">{error}</p>}

                    <button className='buttonLogin' type="submit">Entrar</button>
                </form>
            </main>
        </>
    );
};

export default Login;