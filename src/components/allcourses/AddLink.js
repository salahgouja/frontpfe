import React, { useState } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import "../Marketplace/MainPage/Home.css";
import { color, margin } from "@mui/system";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

function AddMeeting() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lien, setLink] = useState("");
  const [date, setDate] = useState("");
  const [prix, setprix] = useState("");
  const [teachername, setteachername] = useState("");
  const [time, setTime] = useState(""); // Ajout du state pour le temps

  const handleChangName = (e) => {
    setName(e.target.value);
  };
  const handelchangPrix = (e) => {
    setprix(e.target.value);
  };
  const handelchangteachername = (e) => {
    setteachername(e.target.value);
  };
  const handleChangDescrip = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };

  const AjoutPlaylist = async (e) => {
    e.preventDefault();
    try {
      const userName = localStorage.getItem("UserName");  
      console.log("name : ", userName)
      const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local 
      const res = await axios.post("http://localhost:8000/api/v1/reunions", {
        title: name,
        description: description,
        lien: lien,
        date: date,
        time: time, // Ajout du champ temps dans la requêteµ
        prix: prix,
        teachername: userName,
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
        },
      });

      alert("Webinaire ajouté avec succès !");
      window.location.href = "/courses";
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de le lien meet. Veuillez réessayer.");
    }
  };

  return (
    <>
        <Header/>
      <Detailsback />
      <div className="add-instrument-form">
        <h2>Ajouter un Webinaire</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">
              <b>Titre <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Saisie titre de reunion"
              value={name}
              onChange={handleChangName}
            />
          </div>
         
          <div className="form-group">
            <label htmlFor="description">
              <b>Description <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleChangDescrip}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="Link">
              <b>Lien <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b>
            </label>
            <input
              type="text"
              id="Link"
              placeholder="Saisie le lien du reunion"
              value={lien}
              onChange={handleChangeLink}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">
              <b>Date <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b>
            </label>
            <input
              type="date"
              id="date"
              placeholder="Saisie la date du reunion"
              value={date}
              onChange={handleChangeDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">
              <b>Heure <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b>
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={handleChangeTime}
            />
          </div>
          <button onClick={AjoutPlaylist}>
            <b>Ajouter la réunion</b>
          </button>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default AddMeeting;
