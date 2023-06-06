import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import CoursesCard from "./CoursesCard";
import OnlineCourses from "./OnlineCourses";
import { Link } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";


const CourseHome = () => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [afficherListe, setAfficherListe] = useState(false);

  const toggleListe = () => {
    setAfficherListe(!afficherListe);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const url = searchParams.get("playlistId");
    const userId = searchParams.get("userId");
    if (url) {

      const [playlistId, paymentId] = url.split("?payment_id=")
      if (paymentId) {
        axios
          .post(`/api/test/${paymentId}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.result.status === "SUCCESS") {
              axios
                .post(`/api/v1/user/${userId}/playlists/${playlistId}`)
                .then((response) => {
                  console.log("Playlist Assigned to user:", response.data);
                  alert("Success");
                  window.location.href = "/UserPlaylist";
                  // Add any additional code or logic here after the user is assigned to the playlist
                })
                .catch((error) => {
                  console.error("Error assigning user to playlist:", error);
                  // Handle the error if the user assignment fails
                });
            } else if (res.data.result.status === "FAILURE") {
              // alert("Fail");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }

    }

    // Vérifier si un jeton d'authentification est présent dans le stockage local
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");

    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    }
  }, []);

  return (
    <>
      <Header />
      <Back title="Explorer les cours" />
  
      <CoursesCard />
      <OnlineCourses />
      <Footer />
    </>
  );
};

export default CourseHome;
