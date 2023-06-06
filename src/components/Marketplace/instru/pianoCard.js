import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../instrument.css"

const PianoCard = ({addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const categoryId = '644c0ae86fd044576c704483';
        const response = await axios.get(`http://localhost:8000/api/v1/products?category=${categoryId}`);
        const filteredProducts = response.data.filter(product => product.category === categoryId);
        setProducts(filteredProducts);
        console.log(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };    

    fetchProductsByCategory();
  }, []);
  return (
    <>
      {products?.map((val) => (
        <div className='items shadow'>
        <Link to={`/644c0ae86fd044576c704483/${val._id}`} onClick={() => window.scrollTo(0, 0)}>
          <div className='img'>
            <img src={val.image} alt='' />
            <div className='overlay'>
              <i className='fab fa-facebook-f icon'></i>
              <i className='fab fa-twitter icon'></i>
            </div>
          </div>
          <div className='details'>
            <h2>{val.title}</h2>
            <p>{val.work}</p>
          </div>
         </Link>
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
                     {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                    <button2 onClick={() => addToCart(val)}>
                      <i className='fa fa-plus'></i>
                    </button2>
          </div>
         </div>
         
        </div>
      ))}
    </>
  )
}

export default PianoCard
