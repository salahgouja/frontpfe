import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";

const NewPlaylist = ({ title }) => {
  const [image] = useState(null);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [nomEnseignant, setNomEnseignant] = useState("");
  const [nomConservatoire, setNomConservatoire] = useState("");

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePrixChange = (e) => {
    setPrix(e.target.value);
  };

  const handleNomEnseignantChange = (e) => {
    setNomEnseignant(e.target.value);
  };

  const handleNomConservatoireChange = (e) => {
    setNomConservatoire(e.target.value);
  };

  const ajouterPlaylist = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", nom);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("teacherName", nomEnseignant);
      formData.append("prix", prix);
      formData.append("conservatoireName", nomConservatoire);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/v1/playlists",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        alert("Playlist ajoutée avec succès !");
        window.location.href = "/Dashplaylists";
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de la Playlist. Veuillez réessayer.");
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
            <form encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="nom">Nom :</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  placeholder="Entrez le nom"
                  value={nom}
                  onChange={handleNomChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="description">Description :</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Entrez la description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="prix">Prix :</label>
                <input
                  type="text"
                  id="prix"
                  name="prix"
                  placeholder="Entrez le prix"
                  value={prix}
                  onChange={handlePrixChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="nomEnseignant">Nom de l'enseignant :</label>
                <input
                  type="text"
                  id="nomEnseignant"
                  name="nomEnseignant"
                  placeholder="Entrez le nom de l'enseignant"
                  value={nomEnseignant}
                  onChange={handleNomEnseignantChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="nomConservatoire">Nom du conservatoire :</label>
                <input
                  type="text"
                  id="nomConservatoire"
                  name="nomConservatoire"
                  placeholder="Entrez le nom du conservatoire"
                  value={nomConservatoire}
                  onChange={handleNomConservatoireChange}
                />
              </div>

              <button onClick={ajouterPlaylist}>Enregistrer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlaylist;
