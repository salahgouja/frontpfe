import React from "react"
import { Link } from "react-router-dom"
import { instruments } from "../../dummydata"
import Heading from "../common/heading/Heading"
import "./../Marketplace/instrument.css"
const Hprice = ({ addToCart })=> {
  return (
    <>
      <section className='hprice padding'>
        <Link to='/marketplace' onClick={() => window.scrollTo(0, 0)}><Heading subtitle='NOTRE marché' title='Parcourez nos instruments a vendre ' /></Link>
        <div className='instru shadow grid2 '>
        {instruments.slice(0, 3).map((val) => (
        <div className='items shadow'>
          <div className='img'>
            <img src={val.cover} alt='' />
          </div>
          <div className='details'>
            <h2>{val.name}</h2>
            <p>{val.work}</p>
          </div>
          <div className='product-details'>
            <div className='rate'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
            </div>
            <div className='price'>
              <h4>${val.price}.00 </h4>
              {/* Étape : 3
                si nous avons cliqué sur le bouton, alors
               */}
              <button2 onClick={() => addToCart(val)}>
                <i className='fa fa-plus'></i>
              </button2>
            </div>
          </div>

        </div>
      ))}
        </div>
      </section>
    </>
  )
}

export default Hprice





