import React, { useState } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

function AddCourse() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setpdf] = useState(null);
  const [video, setvd] = useState(null);
  const [image, setImage] = useState(null);
  const playlistId = localStorage.getItem("PlaylistId");
  console.log(playlistId)
  const handelchangName = (e) => {
    setName(e.target.value);
  };
  const handelchangeDescrip = (e) => {
    setDescription(e.target.value);
  };

  const AjouterCours = async (e) => {
    e.preventDefault();
    try {

      let formData = new FormData(); // Déplacer la déclaration de formData ici
      formData.append("pdf", pdf[0]);
      formData.append("video", video[0]);
      formData.append("image", image);
      formData.append("title", name);
      formData.append("description", description);
      formData.append("playlist", playlistId);

      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8000/api/v1/cours", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        alert("Cours ajouté avec succès !");
        window.location.href = `/playlists/${playlistId}`;
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout du cours. Veuillez réessayer.");
    }
  };

  const handlePDFChange = (e) => {
    setpdf(e.target.files);
  };
  const handleVDChange = (e) => {
    setvd(e.target.files);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <Header/>
      <Detailsback />
      <div className="add-instrument-form">
        <h2>Ajouter un nouveau cours</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">
              <b>Titre</b>
              <span style={{ color: "red", fontWeight: "bold", marginLeft: "10px" }}> *</span>
            </label>
            <input type="text" id="name" placeholder="Titre de cours" value={name} onChange={handelchangName} />
          </div>
          <div className="form-group">
            <label htmlFor="description">
              <b>Description</b>
            </label>
            <textarea id="description" value={description} onChange={handelchangeDescrip}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="PDF">
              <b>Saisie un PDF file</b>
            </label>
            <input type="file" id="pdf" name="pdf" onChange={handlePDFChange} />
          </div>
          <div className="form-group">
            <label htmlFor="VD">
              <b>Saisie le vidéo tutoriel</b>
              <span style={{ color: "red", fontWeight: "bold", marginLeft: "10px" }}> *</span>
            </label>
            <input type="file" id="video" name="video" onChange={handleVDChange} />
          </div>
          <div className="form-group">
            <label htmlFor="image">
              <b>Image</b>
            </label>
            <input type="file" id="image" name="image" onChange={handleImageChange} />
          </div>
          <button onClick={AjouterCours}>
            <b>Ajouter le cours</b>
          </button>
        </form>
      </div>
      <Footer/>

    </>
  );
}

export default AddCourse;
