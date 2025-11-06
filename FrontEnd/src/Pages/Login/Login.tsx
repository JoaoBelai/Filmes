import './Login.css';
import Logo from '../../Assets/Images/Logo.png'

const Login = () => {
    return (
        <>
            <main className="mainLogin">
                <form className="formLogin">
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
                        />
                    </article>
                    
                    <article className='inputLogin'>
                        <label htmlFor="senha">Senha *</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            id='senha'
                            required
                        />
                    </article>
                    
                    <button className='buttonLogin' type="submit">Entrar</button>
                </form>
            </main>
        </>
    );
};

export default Login;