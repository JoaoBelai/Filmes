import './Footer.css'
import Logo from '../../Assets/Images/Logo.png';

type FooterProp ={
    className?: string
}

function Footer({className=''}: FooterProp){
    return(
        <footer className={`footer ${className}`}>
            <figure className='imagemFooter'>
                <img src={Logo} alt="Logo do Site" />
            </figure>

            <article className='infoFooter'>
                <div className='escritaFooter'>
                    <h4>Sobre</h4>
                    <div className='linksFooter'>
                        <p>Sobre Nós</p>
                        <p>informações Corporativas</p>
                        <p>Trabalhe Conosco</p>
                        <p>Central de Ajuda</p>
                    </div>
                </div>

                <div className='escritaFooter'>
                    <h4>Redes Sociais</h4>
                    <div className='linksFooter'>
                        <p>WhatsApp</p>
                        <p>YouTube</p>
                        <p>Instagram</p>
                        <p>TikTok</p>
                    </div>
                </div>

                <h4 className='direitosReservados'>Todos os direitos reservados João Belai | 2025</h4>
            </article>
        </footer>
    );
}

export default Footer;