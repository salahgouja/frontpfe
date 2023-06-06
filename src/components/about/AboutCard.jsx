import React from "react"
import Heading from "../common/heading/Heading"
import "./about.css"

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='./images/about.webp' alt='' />
          </div>
          <div className='right row'>
          <Heading subtitle='APPRENEZ TOUT' title="À propos de la plateforme HyperMusic"/>
             <div className='items'>
                  <div className='item flexSB'>
                   <p>Notre plateforme en ligne, HyperMusic, est spécialisée dans la formation musicale en ligne et offre une large gamme de cours pour tous les niveaux. Nous sommes également fiers de proposer un marché pour acheter ou vendre des instruments, qu'ils soient neufs ou d'occasion. Que vous soyez débutant ou musicien confirmé, notre plateforme est conçue pour vous aider à développer votre passion pour la musique et à améliorer vos compétences. Nous sommes passionnés par la musique et nous sommes ravis de partager cette passion avec vous</p>
                  </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutCard
