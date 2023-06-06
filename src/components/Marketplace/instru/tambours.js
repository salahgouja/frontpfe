import React from "react"
import { Link } from "react-router-dom"
import Back from "../../common/back/Back"
import Footer from "../../common/footer/Footer"
import Header from "../../common/header/Header"
import "../../Marketplace/instrument.css"
import Categories from "../MainPage/Categories"
import TamboursCard from "./tamboursCard"
const Tambours = ({addToCart,CartItem}) => {
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })
  return (
    <>
        <Header/>
      <Back title='Tambours' />
      <section className='search'>
        <div className='container c_flex'>
          <div>
            <h1>logo</h1>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Cherchez et appuyez sur Entrée...' />
            <span>Toutes les catégories</span>
          </div>

          <div className='icon2 f_flex width'>
          <Link to="/form" onClick={() => window.scrollTo(0, 0)} >
            <i className='fa fa-plus icon-circle'></i>
            </Link>
            <i className='fa fa-user icon-circle'></i>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className='home'>
        <div className='container d_flex'>
          <Categories/>
          <section className='instru padding'>
          <div className='container grid'>
          <TamboursCard addToCart={addToCart}/>
          </div>
          </section>
        </div>
      </section>
     
      <Footer/>
    </>
  )
}

export default Tambours
