import './Home.css'
import Navbar from '../../Components/Navbar/Navbar';
import Card from '../../Components/Card/Card';
import Vingadores from '../../Assets/Images/vingadores.png'


function Home(){
    return(
        <>
            <header>
                <Navbar/>
                
            </header>
            <main>
                <Card 
                    titulo='Vingadores Ultimato' 
                    categoria={[ "Sci-Fi", "Ação", "Aventura"]} 
                    tempo='181'
                    imagem={Vingadores}
                />
            </main>
        </>
    );
}

export default Home;