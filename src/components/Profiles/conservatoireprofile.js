import React, { useState, useEffect, useRef } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import { useParams } from "react-router-dom";
import defaultProfileImage from "../../images/default-profile-image1.png";
import "./profile.css";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

const ConservatoireProfile = () => {
  const { ConsId } = useParams();
  const [conservatoire, setconservatoire] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);


  const fetchAxios = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/conservatoire/${ConsId}`);
      setconservatoire(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAxios();
  }, [ConsId]);



  return (
    <>
        <Header/>
      <Detailsback />
      {conservatoire && (
        <div key={conservatoire._id}>
          <div className="profile-container">
            <div className="profile-image-container">
              <img
                src={conservatoire.image ? conservatoire.image : defaultProfileImage}
                alt="Profil"
                className="profile-image2"
              />
            </div>
            <div className="profile-details">
              <p>
                <b>Nom:</b> {conservatoire.name}
              </p>
              <p>
                <b>Email:</b> {conservatoire.email}
              </p>
              <p>
                <b>Numéro Téléphone : </b> {conservatoire.phoneNumber}
              </p>
              <p>
                <b>Adresse du Conservatoire :</b> {conservatoire.adressconservatoire}
              </p>
            </div>
          </div>
        </div>
      )}
       <Footer/>
    </>
  );
};
export default ConservatoireProfile;
