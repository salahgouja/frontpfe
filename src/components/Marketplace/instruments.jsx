import React from "react"
import Back from "../common/back/Back"
import "../Marketplace/instrument.css"
import "../about/about.css"
import Home2 from "./MainPage/Home"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"


const Instruments = ({ addToCart, CartItem ,searchValue}) => {
  return (
    <>
        <Header/>
      <Back title='Instruments' />
      <Home2 CartItem={CartItem} addToCart={addToCart} searchValue={searchValue} />
      <Footer/>
    </>
  )
}

export default Instruments