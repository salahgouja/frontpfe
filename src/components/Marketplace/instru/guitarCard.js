import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../instrument.css"

const GuitarsCard = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const categoryId = '644c0611066ad4fe13963714';
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
      {products?.map((guitar) => (
        <div className="items shadow" key={guitar._id}>
          <Link to={`/644c0611066ad4fe13963714/${guitar._id}`} onClick={() => window.scrollTo(0, 0)}>
            <div className="img">
              <img src={guitar.image} alt="" />
              <div className="overlay">
                <i className="fab fa-facebook-f icon"></i>
                <i className="fab fa-twitter icon"></i>
              </div>
            </div>
            <div className="details">
              <h2>{guitar.title}</h2>
            </div>
          </Link>
          <div className="product-details">
            <div className="rate">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
            <div className="price">
              <h4>${guitar.price}.00 </h4>
              <button2 onClick={() => addToCart(guitar)}>
                <i className="fa fa-plus"></i>
              </button2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GuitarsCard;

