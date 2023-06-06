import React, { useState, useEffect } from "react";
import axios from "axios";
import "./courses.css"
import Detailsback2 from "../Marketplace/background/backdetails2";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import { Link } from "react-router-dom";

const UserPlaylist = () => {
  const [playlist, setPlaylist] = useState([]); // État pour stocker les détails de l'instrument
  const userId = localStorage.getItem('UserId');

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/user/${userId}/playlists`);
        setPlaylist(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des playlists de l'utilisateur :", error);
      }
    };

    fetchPlaylist();
  }, [userId]);

  return (
    <>
      <Header/>
      <Detailsback2 />
      {playlist.length > 0 ? (
        <>
           <div style={{ color:"#7C4A15" , fontWeight:'bold' , fontSize:'27px' , marginLeft:"65px"}}>
           Votre Liste de Cours Acheté :
         </div>
       { playlist.map((val) => (
          <div className="instru-details-container" key={val._id}>
            <div className="instru-details-content">
              <Link to={`/playlists/${val._id}`} onClick={() => window.scrollTo(0, 0)}>
                <h1 className="">{val.title}</h1>    
              </Link>            
            </div>
          </div>
        ))}
        </>
      ) : (
        <div style={{ textAlign:"center" , fontWeight:'bold' , fontSize:'27px'}}>
          Vous n'avez aucun Cours payé.
        </div>
      )}
      <Footer/>
    </>
  );
};

export default UserPlaylist;
