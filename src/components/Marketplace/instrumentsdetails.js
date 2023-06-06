import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Detailsback from "./background/backdetails";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import { margin, sizeWidth } from "@mui/system";

const InstrumentDetails = () => {
  const { _id } = useParams(); // Récupération de l'ID de l'instrument à partir de l'URL
  const [instrument, setInstrument] = useState([]); // État pour stocker les détails de l'instrument
  const [loggedInUserId, setLoggedInUserId] = useState("");

  useEffect(() => {
    // Fonction pour récupérer les détails de l'instrument depuis le backend
    const fetchInstrumentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${_id}`);
        setInstrument(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const userId = localStorage.getItem("UserId");
    setLoggedInUserId(userId);
    fetchInstrumentDetails(); // Appel de la fonction pour récupérer les détails de l'instrument
  }, [_id]);

  const removeItem = async (instrument) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${_id}`);
      alert("Product Supprimé avec succès !");  
      window.location.href = "/marketplace";
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Header />
      <Detailsback />
      {instrument && (
        <div className="instru-details-container">
          
          <img className="instru-details-img" src={instrument.image} />
          <div className="instru-details-content">
          {instrument.userId === loggedInUserId ? (
            <>
            <div style={{ position: 'relative', top: '-80px' , marginLeft : '250px' , fontSize:'20px'}}>
            <div onClick={() => removeItem(instrument)}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </div>
          </div>
          <div style={{ position: 'relative', top: '-102px' , marginLeft : '200px' , fontSize:'20px' , cursor:"pointer"}} >
          <Link to={`/UpdateProduct/${instrument._id}`}>
          <i className="fa fa-edit" aria-hidden="true"></i>
          </Link>
          </div>
          </>
          ) : null}
            <h1 className="instru-details-name">{instrument.title}</h1>
            <p className="instru-details-price">
              <b>Prix: </b>${instrument.price}.00
            </p>
            <p><b>Etat d'instrument : </b>{instrument.etat}</p>
            {instrument.phone > 0 ? (
              <>
                <p><b>Numéro du vendeur : </b>{instrument.phone}</p>
                <p className="instru-details-description">
                  <b>Description: </b>
                  {instrument.description}
                </p>
              </>
            ) : (
              <p className="instru-details-description">
                <b>Description: </b>
                {instrument.description}
              </p>
            )}

          </div>
        </div>
    
      )}
      <Footer />
    </>
  );
};

export default InstrumentDetails;
