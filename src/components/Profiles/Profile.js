import React, { useState, useEffect } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import "./profile.css";
import defaultProfileImage from "../../images/default-profile-image1.png";
import axios from "axios";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userImage, setUserImage] = useState("");
  const [id, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");
    const userName = localStorage.getItem("UserName");
    const userEmail = localStorage.getItem("UserEmail");
    const userPhone = localStorage.getItem("UserPhone");
    const userImage = localStorage.getItem("UserImage");
    const id = localStorage.getItem("UserId");
    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
      setUserName(userName);
      setUserEmail(userEmail);
      setUserPhone(userPhone);
      setUserImage(userImage);
      setUserId(id);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setUserImage(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("phoneNumber", userPhone);
    formData.append("image", userImage);

    try {
      const token = localStorage.getItem("token");

      if (token && userRole === "user") {
        const res = await axios.put(
          `http://localhost:8000/api/v1/user/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          console.log("Modifications enregistrées avec succès !");
        }
      } else if (token && userRole === "teacher") {
        const res = await axios.put(
          `http://localhost:8000/api/v1/teacher/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          console.log("Modifications enregistrées avec succès !");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des modifications :", error);
    }
  };

  return (
    <>
      <Header />
      <Detailsback />
      <div className="profile-container">
        <div className="profile-image-container">
          <img
            src={userImage ? userImage : defaultProfileImage}
            alt="Profil"
            className="profile-image"
          />
          <div className="edit-profile-button">
            <label htmlFor="image-upload">Modifier l'image</label>
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="profile-details">
          <p>
            <b>Nom :</b>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </p>
          <p>
            <b>Email :</b>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </p>
          <p>
            <b>Téléphone :</b>
            <input
              type="number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </p>
          <button onClick={saveChanges}>Enregistrer</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
