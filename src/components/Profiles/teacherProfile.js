import React, { useState, useEffect } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import { useParams } from "react-router-dom";
import defaultProfileImage from "../../images/default-profile-image1.png";
import "./profile.css";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

const TeacherProfile = () => {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);

  const fetchTeacher = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/teacher/${teacherId}`);
      setTeacher(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, [teacherId]);

  const handleEmailClick = () => {
    if (teacher && teacher.email) {
      window.location.href = `mailto:${teacher.email}`;
    }
  };

  return (
    <>
        <Header/>
      <Detailsback />
      {teacher && (
        <div key={teacher._id}>
          <div className="profile-container">
            <div className="profile-image-container">
              <img
                src={teacher.image ? teacher.image : defaultProfileImage}
                alt="Profil"
                className="profile-image2"
              />
            </div>
            <div className="profile-details">
              <p>
                <b>Nom:</b> {teacher.name}
              </p>
              <p>
                <b>Email:</b>{" "}
                <span className="email-link" onClick={handleEmailClick}>
                  {teacher.email}
                </span>
              </p>
              <p>
                <b>Numéro Téléphone : </b> {teacher.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      )}
       <Footer/>
    </>
  );
};

export default TeacherProfile;
