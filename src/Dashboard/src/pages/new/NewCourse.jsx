import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewCourse = ({ title }) => {
  const [image, setImage] = useState(null);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);
  const [video, setVideo] = useState(null);
  const { _id } = useParams();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const ajouterCours = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", nom);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("pdf", pdf);
      formData.append("video", video);
      formData.append("playlist", _id);

      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:8000/api/v1/cours", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (res.status === 201) {
        alert("Cours ajouté avec succès !");
        window.location.href = `/Dashplaylists/${_id}`;
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout du cours. Veuillez réessayer.");
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
                <label htmlFor="pdf">PDF :</label>
                <input
                  type="file"
                  id="pdf"
                  name="pdf"
                  onChange={handlePdfChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="video">Vidéo :</label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  onChange={handleVideoChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="image">Image :</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>

              <button onClick={ajouterCours}>Enregistrer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
