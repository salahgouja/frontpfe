import React from "react"
import { Link } from "react-router-dom"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='BIENVENUE À ACADEMIA' title='Expertise de la meilleure éducation en ligne' />
            <p>Bienvenue sur notre plateforme de formation de musique en ligne. Nos cours sont dispensés par des professeurs de musique expérimentés et couvrent une grande variété d'instruments et de styles musicaux.Rejoignez Academia dès aujourd'hui pour commencer votre voyage musical en ligne !</p>
            <div className='button'>
                <button className='primary-btn'>
                <Link to='/courses' onClick={() => window.scrollTo(0, 0)}>
                COMMENCER MAINTENANT <i className='fa fa-long-arrow-alt-right'></i>
                </Link>
              </button>
              <Link to='/courses'>
                <button>
                  VOIR LE COURS <i className='fa fa-long-arrow-alt-right'></i>
                </button>
              </Link>

            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
