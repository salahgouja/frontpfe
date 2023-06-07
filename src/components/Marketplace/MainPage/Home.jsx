import React, { useState , useEffect } from "react";
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"
import { Link } from "react-router-dom"
import InstruCard from "../instrumentsCard";
import { useLocation } from "react-router-dom";
import axios from "axios";


    



const Home2 = ({ CartItem , addToCart }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const params = searchParams.get('phoneNumbers');
    
  


   


  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [searchValue, setSearchValue] = useState("");
const [Sent, setSent] = useState(false)
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (params ) {
      setSent(true)
      const [phoneNumbers, paymentId] = params.split("?payment_id=")
    const phoneNumbersList = JSON.parse(phoneNumbers);

      if(paymentId){const requests = phoneNumbersList.map(phoneNumber => 
        axios.post(`/api/test1/${paymentId}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.result.status === "SUCCESS") {
              const number = phoneNumber;
              const message = "Votre produit est vendu !";
              return axios.post("api/sms", { number, message })
                .then((res) => {
                  const { result } = res.data;
                  console.log("result", result);
                  if (!Sent)
                  alert("success");
                })
                .catch((err) => console.log("error", err));
            } else if (res.data.result.status === "FAILURE") {
              alert("fail");
            }
          })
          .catch((error) => {
            console.error(error);
          })
      );
      Promise.all(requests)
        .then(() => console.log("All requests completed"))
        .catch(error => console.error("Some requests failed", error));
    }}
  }, [params]);

  


  useEffect(() => {
    
    // Vérifier si un jeton d'authentification est présent dans le stockage local
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");

    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    }
  }, []);

  return (
    <>
         <section className='search'>
         <div className='container c_flex' style={{marginTop:"-15px"}}>
          <div>
          <img src="images/IMG-20230523-WA0000-removebg-preview.png" alt="Logo" style={{width:"110px" }}></img>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Cherchez et appuyez sur Entrée...' onChange={handleSearchChange}/>
            <span>Toutes les catégories</span> 
          </div>

          <div className='icon2 f_flex width '>
          {(isLoggedIn && (userRole === "user" || userRole === "teacher")) ? (
            <>
            <Link to="/form" onClick={() => window.scrollTo(0, 0)} >
            <i className='fa fa-plus icon-circle'></i>
            </Link>
            <Link to="/profile" onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-circle'></i></Link>
              <div className='cart'>
              <Link to='/cart' onClick={() => window.scrollTo(0, 0)}>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
            </>
             ) :(
              <>
              <Link to="/SignIn" onClick={() => window.scrollTo(0, 0)} >
            <i className='fa fa-plus icon-circle'></i>
            </Link>
            <Link to="/SignIn" onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-circle'></i></Link>
              <div className='cart'>
              <Link to='/cart' onClick={() => window.scrollTo(0, 0)}>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
            </>
            )}
          </div>
        </div>
      </section>
      <section className='home'>
        <div className='container d_flex'>
          <Categories />
          <SliderHome />
        </div>
      </section>
      <section className='instru padding'>
        <div className='container grid'>
          <InstruCard addToCart={addToCart} searchValue={searchValue}/>
        </div>
      </section>
    </>
  )
}

export default Home2
