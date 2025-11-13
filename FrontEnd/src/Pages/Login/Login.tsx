import './Login.css';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'
import Logo from '../../Assets/Images/Logo.png'
import { useAuth } from '../../Contexts/AuthContext';
import { useLoading } from '../../Contexts/LoadingContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { login } = useAuth(); 
    const { setIsLoading } = useLoading();

    const handleLoginSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try{
            const response = await axios.post('http://localhost:8000/login', {
                username: email,
                password: password
            });

            const token = response.data.token;

            login(token);

            navigate('/home');

        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.erro); 
            } else {
                setError('Erro de conexão. Tente novamente mais tarde.');
            }
        } finally{
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

                    {error && <p className="loginError">{error}</p>}
                    
                    <button className='buttonLogin' type="submit">Entrar</button>
                </form>
            </main>
        </>
    );
};

export default Login;