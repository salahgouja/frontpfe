import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./courses.css"
import Detailsback2 from "../Marketplace/background/backdetails2";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
const AllCorses = () => {
  const [cours, setcours] = useState([]); // État pour stocker les détails de l'instrument
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const { _id } = useParams();
  localStorage.setItem('PlaylistId', _id)

  useEffect(() => {
    const fetchCoursByPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/cours/ByplaylistId/${_id}`);
        if (Array.isArray(response.data)) {
          setcours(response.data);
        } else {
          setcours([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
      }

      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("UserRole");

      if (token && userRole) {
        setIsLoggedIn(true);
        setUserRole(userRole);
      }
    };

    fetchCoursByPlaylist();
  }, [_id]);

  return (
    <>
        <Header/>
      <Detailsback2 />
      {(isLoggedIn && userRole === "teacher") ? (
        <>
          <Link to="/Addcorses"><i className="fa fa-plus Ajoutcours">  Ajouter Cours</i></Link>
          {cours?.map((val) => (
            <div className="instru-details-container">
              <div className="instru-details-content">
                <h1 className="">{val.title}</h1>
                <p>{val.description}</p>
                <video className="" controls style={{ width: '400px', height: 'auto' }}>
                  <source src={val.video} type="video/mp4" />
                </video>
                <p><b>Ressource : </b></p>
                <a href={val.pdf} target="_blank" rel="noopener noreferrer" ><u>Télécharger le PDF</u></a>
                
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {cours.map((val) => (
           <div className="instru-details-container">
           <div className="instru-details-content">
             <h1 className="">{val.title}</h1>
             <p>{val.description}</p>
             <video className="" controls style={{ width: '400px', height: 'auto' }}>
               <source src={val.video} type="video/mp4" />
             </video>
             <p><b>Ressource : </b></p>
             <a href={val.pdf} target="_blank" rel="noopener noreferrer" ><u>Télécharger le PDF</u></a>
             
           </div>
         </div>
          ))}
        </>
      )}
       <Footer/>
    </>
  );
};

export default AllCorses;
