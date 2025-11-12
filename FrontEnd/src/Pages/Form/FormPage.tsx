import './FormPage.css'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Form from '../../Components/Form/Form';

function FormPage(){
    return(
        <>
            <header>
                <Navbar/>
            </header>
            <main className='mainForm'>
                <Form titulo='Adição de Filme'/>
            </main>
            <Footer/>
        </>
    );
}

export default FormPage;