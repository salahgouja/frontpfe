import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";

const NewConservatoire = ({ title }) => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setTelephone] = useState("");
  const [password, setMdp] = useState("");
  const [passwordConfirm, setCmdp] = useState("");
  const [role, setRole] = useState("");
  const [adressconservatoire, setAdresseConservatoire] = useState("");

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

  const handleChangeAdresseConservatoire = (e) => {
    setAdresseConservatoire(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setCmdp(e.target.value);
  };

  const ajouterConservatoire = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:8000/api/v1/conservatoire", {
        "name": nom,
        "email": email,
        "role": role,
        "phoneNumber": phoneNumber,
        "password": password,
        "passwordConfirm": passwordConfirm,
        "adressconservatoire": adressconservatoire
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (res.status === 201) {
        console.log("conservatoire: ", res.data.data);
        alert("Conservatoire ajouté avec succès !");
        window.location.href = "/Dashconservatoires";
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout du conservatoire. Veuillez réessayer.");
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
                  value={password}
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
                  value={phoneNumber}
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
                  value={passwordConfirm}
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

              <div className="formInput">
                <label htmlFor="conservatoire">Adresse du conservatoire :</label>
                <input
                  id="conservatoire"
                  name="conservatoire"
                  value={adressconservatoire}
                  onChange={handleChangeAdresseConservatoire}
                />
              </div>

              <button onClick={ajouterConservatoire}>Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewConservatoire;
