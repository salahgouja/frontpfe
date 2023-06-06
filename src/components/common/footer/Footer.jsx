import React from "react"
import { Link } from "react-router-dom"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1> Restez à l'écoute et obtenez les dernières mises à jour</h1>
          </div>
          <div className='right row'>
            <input type='text' placeholder="Entrez l'adresse e-mail" />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
          <img src="images/IMG-20230523-WA0000-removebg-preview.png" alt="Logo"></img>
            <span>ENSEIGNEMENT ET APPRENTISSAGE EN LIGNE</span>
            <p>HyperMusic - Plateforme en ligne de formation musicale et de vente d'instruments, pour tous les niveaux.</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explorer</h3>
            <ul>
              <li><Link to='/' onClick={() => window.scrollTo(0, 0)}>Acceuil</Link></li>
              <li><Link to='/courses' onClick={() => window.scrollTo(0, 0)}>Cours</Link></li>
              <li><Link to ='/marketplace' onClick={() => window.scrollTo(0, 0)}>Marché</Link></li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Liens rapides</h3>
            <ul>
              <li><Link to ='/contact' onClick={() => window.scrollTo(0, 0)}>Contactez-nous</Link></li>
              <li><Link to='/about' onClick={() => window.scrollTo(0, 0)}>A propos de nous</Link></li>
              <li><Link to ='/marketplace' onClick={() => window.scrollTo(0, 0)}>Instruments</Link></li>
              <li><Link to='/SignIn' onClick={() => window.scrollTo(0, 0)}>se connecter</Link></li>
            </ul>
          </div>
          <div className='box last'>
            <h3>Des questions?</h3>
            <ul>
              <li>
                <i className='fa fa-phone-alt'></i>
                +21652902693
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                HyperDev@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>

  )
}

export default Footer
