import React from "react"
import AboutCard from "../about/AboutCard"
import Footer from "../common/footer/Footer"
import Header from "../common/header/Header"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"

const Home = () => {
  return (
    <>
    <Header/>
      <Hero />
      <AboutCard />
      <HAbout />
      <Hprice />
      <Footer/>
    </>
  )
}

export default Home
