import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";

const NewReunion = ({ title }) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [lien, setLien] = useState("");
  const [date, setDate] = useState("");
  const [prix, setPrix] = useState("");
  const [nomEnseignant, setNomEnseignant] = useState("");
  const [heure, setHeure] = useState("");

  const handleChangNom = (e) => {
    setNom(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeLien = (e) => {
    setLien(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleChangePrix = (e) => {
    setPrix(e.target.value);
  };

  const handleChangeNomEnseignant = (e) => {
    setNomEnseignant(e.target.value);
  };

  const handleChangeHeure = (e) => {
    setHeure(e.target.value);
  };

  const ajouterLien = async (e) => {
    e.preventDefault();
    try {
      const userName = localStorage.getItem("UserName");
      console.log("nom : ", userName);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/v1/reunions",
        {
          title: nom,
          description: description,
          lien: lien,
          date: date,
          time: heure,
          prix: prix,
          teachername: userName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("réunion : ", res.data);
      alert("Lien Meet ajouté avec succès !");
      window.location.href = "/Dashmeetings";
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout du lien Meet. Veuillez réessayer.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="nom">Titre :</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Entrez le nom"
                  value={nom}
                  onChange={handleChangNom}
                />
              </div>

              <div className="formInput">
                <label htmlFor="description">Description :</label>
                <input
                  type="text"
                  id="description"
                  placeholder="Entrez la description"
                  value={description}
                  onChange={handleChangeDescription}
                />
              </div>

              <div className="formInput">
                <label htmlFor="date">Date :</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={handleChangeDate}
                />
              </div>

              <div className="formInput">
                <label htmlFor="lien">Lien :</label>
                <input
                  type="text"
                  id="lien"
                  placeholder="Entrez le lien"
                  value={lien}
                  onChange={handleChangeLien}
                />
              </div>

              <div className="formInput">
                <label htmlFor="heure">Heure :</label>
                <input
                  type="time"
                  id="heure"
                  placeholder="Entrez l'heure"
                  value={heure}
                  onChange={handleChangeHeure}
                />
              </div>

              <div className="formInput">
                <label htmlFor="prix">Prix :</label>
                <input
                  type="text"
                  id="prix"
                  placeholder="Entrez le prix"
                  value={prix}
                  onChange={handleChangePrix}
                />
              </div>

              <div className="formInput">
                <label htmlFor="nomEnseignant">Nom de l'enseignant :</label>
                <input
                  type="text"
                  id="nomEnseignant"
                  placeholder="Entrez le nom de l'enseignant"
                  value={nomEnseignant}
                  onChange={handleChangeNomEnseignant}
                />
              </div>

              <button onClick={ajouterLien}>Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReunion;
