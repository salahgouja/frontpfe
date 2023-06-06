import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogout = () => {
    // Effectuer les actions de déconnexion, réinitialiser l'état
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("token");
  localStorage.removeItem("UserRole");

  };

  useEffect(() => {
    // Vérifier si un jeton d'authentification est présent dans le stockage local
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");

    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    }
  }, []);

  return (
    <>
      <header>
        <nav className="flexSB">
          <div className="logo">
          <img src="images/IMG-20230523-WA0000-removebg-preview.png" alt="Logo"></img>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"> </i> : <i className="fa fa-bars"></i>}
          </button>
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/about">À propos</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/courses">Tous les cours</Link>
            </li>
            <li>
              <Link to="/marketplace">Place de marché</Link>
            </li>
          </ul>
          {(isLoggedIn && (userRole === "user" || userRole === "teacher")) ? (
            <>
            <li><Link to="/profile" onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-header'></i></Link></li>
              <li>
                <button className="button-28" onClick={handleLogout}>
                  Déconnexion
                </button>
                
              </li>
              
            </>
          ) :(
            <li>
              <a href="SignIn" className="button-28">
              Se connecter
            </a>
            </li>
          )}
        </nav>
      </header>

      <section className="head">
        <div className="container flexSB">
          <div className="social">
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="far fa-envelope icon"></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
