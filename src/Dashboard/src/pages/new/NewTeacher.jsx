import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "axios";

const NewTeacher = ({ title }) => {
  const [image, setImage] = useState(null);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("");
  const [conservatoire, setConservatoire] = useState(null);
  const [conservatoires, setConservatoires] = useState([]);

  const handleChangeNom = (e) => {
    setNom(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeMotDePasse = (e) => {
    setpassword(e.target.value);
  };

  const handleChangeTelephone = (e) => {
    setphoneNumber(e.target.value);
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };


  const handleChangeConservatoire = (e) => {
    setConservatoire(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const fetchConservatoires = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/conservatoire");
      setConservatoires(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConservatoires();
  }, []);

  const ajouterEnseignant = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", nom);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("phoneNumber", phoneNumber);
      formData.append("password", password);
      formData.append("passwordConfirm", password);
      formData.append("image", image);
      formData.append("conservatoire", conservatoire);
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8000/api/v1/teacher", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        console.log("teacher: ", res.data.data);
        alert("Enseignant ajouté avec succès !");
        window.location.href = "/Dashteachers";
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de l'enseignant. Veuillez réessayer.");
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
                <label htmlFor="name">Nom :</label>
                <input
                  type="text"
                  id="name"
                  name="name"
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
                  placeholder="Entrez l'email"
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
                  onChange={handleChangeMotDePasse}
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
                <label htmlFor="conservatoire">Conservatoire :</label>
                <select
                  id="conservatoire"
                  name="conservatoire"
                  value={conservatoire}
                  onChange={handleChangeConservatoire}
                >
                  <option value="">Sélectionnez un conservatoire</option>
                  {conservatoires &&
                    conservatoires.map((conservatoire) => (
                      <option key={conservatoire._id} value={conservatoire._id}>
                        {conservatoire.name},
                        
                      </option>
                    ))}
                    
                </select>
              </div>

              <button onClick={ajouterEnseignant}>Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTeacher;
