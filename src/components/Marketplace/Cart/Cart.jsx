import React, { useState, useEffect } from "react";
import axios from "axios";

import Back from "../../common/back/Back"
import Footer from "../../common/footer/Footer"
import Header from "../../common/header/Header"
import "./style.css"
import { Link } from "react-router-dom";






//////////////////////////////////////////

const Cart = ({ CartItem, addToCart, decreaseQty, removeCartItem }) => {
  const onSubmit = async (e, amount) => {
    e.preventDefault();
    const phoneNumbers = CartItem.map((item) => item.phone);
    console.log(phoneNumbers);
  
    axios
      .post("api/test1", { amount ,phoneNumbers}) // Pass the amount as a parameter in the request body
      .then((res) => {
        const { result } = res.data;
        window.location.href = result.link;
      })
      .catch((err) => console.error(err));
  };
  


  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Étape 7 : Calcul du total des articles
  const totalPrice = CartItem.reduce((prix, item) => prix + item.qty * item.price, 0)

  useEffect(() => {
    

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");
    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    }
  }, []);

  return (
    <>
        <Header/>
      <Back title="Panier" />
      <section className='cart-items'>
        <div className='container d_flex'>
          {/* Si aucun élément n'est ajouté au panier, afficher "No Items are add in Cart" */}

          <div className='cart-details'>
        {CartItem.length === 0 && <h1 className='no-items product'>Aucun article n'est ajouté au panier</h1>}

        {/* Affichage des éléments du panier */}
        {CartItem.map((item) => {
          const productQty = item.price * item.qty

          return (
            <div className='cart-list product d_flex' key={item.id}>
              <div className='img'>
                <img src={item.image} alt='' />
              </div>
              <div className='cart-details'>
                <h3>{item.name}</h3>
                <h4>
                  ${item.price}.00 * {item.qty}
                  <span>${productQty}.00</span>
                </h4>
              </div>
              <div className='cart-items-function'>
                <div className='remove-cart-btn'>
                  <button3 onClick={() => removeCartItem(item)}>
                  <i class="fa fa-times" aria-hidden="true"></i>
                  </button3>
                </div>
                
                <div className='cartControl d_flex'>
                  <button3 className='inc-cart-btn' onClick={() => addToCart(item)}>
                  <i className='fa fa-plus'></i>
                  </button3>
                  <button3 className='des-cart-btn' onClick={() => decreaseQty(item)}>
                  <i className='fa fa-minus'></i>
                  </button3>
                </div>
              </div>
              <div className='cart-item-price'></div>
            </div>
          )
        })}
      </div>

      <div className='cart-total product'>
        <h2>Résumé du panier</h2>
        <div className=' d_flex'>
          <h4>Prix total :</h4>
          <h3>${totalPrice}.00</h3>
        </div>
        {(isLoggedIn && (userRole === "user" || userRole === "teacher" )) ? (
                <button className='btn btn-primary btn-lg' onClick={(e) => onSubmit(e, totalPrice*1000)}>
                   Payer
                </button>
                ):(
                  <Link to="signin">
                  <button className='btn btn-primary btn-lg' >
                 Payer
              </button>
              </Link>
                )}
      
      </div>
    </div>
  </section>
  <Footer/>
</>

  )
}

export default Cart
