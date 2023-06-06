import React, { useState, useEffect } from "react";
import "./instrument.css";
import { Link } from "react-router-dom";
import axios from "axios";

const InstruCard = ({ addToCart, searchValue }) => {
  const [product, setProduct] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState("");

  useEffect(() => {
    const fetchAxios = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/products");
      setProduct(res.data);
    };
    fetchAxios();
    const userId = localStorage.getItem("UserId");
    setLoggedInUserId(userId);
  }, []);

  const filteredProducts = product.filter((val) =>
    val.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      {filteredProducts.map((val) => (
        <div className="items shadow" key={val._id}>
          {val.userId === loggedInUserId ? (
            <i className="fa fa-times"></i>
          ) : null}
          <Link
            to={`/instrument/${val._id}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="img">
              <img src={val.image} alt="" />
            </div>
            <div className="details">
              <h2>{val.title}</h2>
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
              <h4>${val.price}.00 </h4>
              <button2 onClick={() => addToCart(val)}>
                <i className="fa fa-plus"></i>
              </button2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default InstruCard;
