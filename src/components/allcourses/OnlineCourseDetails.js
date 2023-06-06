import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./courses.css";
import Detailsback from "../Marketplace/background/backdetails";
import moment from "moment";
import 'moment/locale/fr'; // Importez la localisation française de moment
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
moment.locale('fr'); // Définissez la localisation par défaut sur français

const ReunionDetails = () => {
  const { _id } = useParams(); 
  const [reunion, setReunion] = useState(null);

  useEffect(() => {
    const fetchReunionById = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/reunions/${_id}`);
        setReunion(res.data);
      } catch (error) {
        console.log(error);
      }
    };    

    fetchReunionById();
  }, [_id]);

  return (
    <>
        <Header/>
      <Detailsback/>
      {reunion && (
        <div className="reunion-details-container">
          <div className="reunion-details-content">
            <h1><b>{reunion.title}</b></h1>
            <p><b>Description : </b>{reunion.description}</p>
            <p><b>Par : </b>{reunion.teachername}</p>
            <b>Date : </b>le {moment(reunion.date).format("DD-MM-YYYY")}
            <b>     Temps : </b> {moment(reunion.time, 'HH:mm').format('hh:mm A')}
            <p><b>Lien du reunion :  <a href={reunion.lien} target="_blank" rel="noopener noreferrer">{reunion.lien}</a></b></p> 
            
          </div>
        </div>
      )}
       <Footer/>
    </>
  );
};

export default ReunionDetails;
