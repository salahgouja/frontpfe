import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState } from "react";
import axios from "axios";

const New = ({ title }) => {
  const [image, setImage] = useState(null);
  const [nom, setNom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [mdp, setMdp] = React.useState("");
  const [cmdp, setCmdp] = React.useState("");
  const [role, setRole] = React.useState("");

  const handleChangeNom = (e) => {
    setNom(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setMdp(e.target.value);
  };

  const handleChangeTelephone = (e) => {
    setTelephone(e.target.value);
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setCmdp(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const ajouterUtilisateur = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('email', email);
      formData.append('role', role);
      formData.append('numTelephone', telephone);
      formData.append('motDePasse', mdp);
      formData.append('confirmerMotDePasse', cmdp);
      formData.append('image', image);
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:8000/api/v1/user", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (res.status === 201) {
        alert("Utilisateur ajouté avec succès !");
        window.location.href = "/Dashusers";
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer.");
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
          <div className="left">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="file">
                  Image : <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label htmlFor="nom">Nom :</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  placeholder="Entrez le nom"
                  value={nom}
                  onChange={handleChangeNom}
                />
              </div>

              <div className="formInput">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Entrez l'e-mail"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>

              <div className="formInput">
                <label htmlFor="password">Mot de passe :</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Entrez le mot de passe"
                  value={mdp}
                  onChange={handleChangePassword}
                />
              </div>

              <div className="formInput">
                <label htmlFor="phone">Téléphone :</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Entrez le téléphone"
                  value={telephone}
                  onChange={handleChangeTelephone}
                />
              </div>

              <div className="formInput">
                <label htmlFor="password">Confirmer le mot de passe :</label>
                <input
                  type="password"
                  id="Cpassword"
                  name="Cpassword"
                  placeholder="Confirmez le mot de passe"
                  value={cmdp}
                  onChange={handleChangeConfirmPassword}
                />
              </div>

              <div className="formInput">
                <label htmlFor="role">Rôle :</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Entrez le rôle"
                  value={role}
                  onChange={handleChangeRole}
                />
              </div>

              <button onClick={ajouterUtilisateur}>Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
