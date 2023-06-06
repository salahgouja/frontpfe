import React, { useState, useEffect } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import "../Marketplace/MainPage/Home.css";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

function AddPlaylist() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handelchangName = (e) => {
        setName(e.target.value);
    };

    const handelchangPrice = (e) => {
        setPrice(e.target.value);
    };

    const handelchangeDescrip = (e) => {
        setDescription(e.target.value);
    };

    

    const AjoutPlaylist = async (e) => {
        e.preventDefault();
        try {
            const userName = localStorage.getItem("UserName");  
            const userId = localStorage.getItem("UserId");  
            const conservatoire = localStorage.getItem("conservatoire"); 
            const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local 
            const res = await axios.post("http://localhost:8000/api/v1/playlists", {
                title: name,
                prix: price,
                description: description,
                teacherName: userName,
                conservatoireName : conservatoire ,
                user : userId,
            },{
                headers: {
                    'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
                },
            });
            if (res.status === 201) {
                alert("Playliste ajoutée avec succès !");
                window.location.href = "/courses";
                const prix = res.data.prix;
                localStorage.setItem("prix", prix);
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de l'ajout de la Playliste. Veuillez réessayer.");
        }
    };

    return (
        <>
            <Header/>
            <Detailsback />
            <div className="add-instrument-form">
                <h2>Ajouter une nouvelle Playliste</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">
                            <b>Titre <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b>
                        </label>
                        <input
                            type="text"
                            id="tiltle"
                            value={name}
                            onChange={handelchangName}
                        />
                    </div>
                        <div className="form-group">
                        <label htmlFor="price"><b>Prix de tous les cours <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b></label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={handelchangPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"><b>Description</b></label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handelchangeDescrip}
                        ></textarea>
                    </div>


                    <button onClick={AjoutPlaylist}><b>Ajouter la playliste</b></button>
                </form>
            </div>
            <Footer/>
        </>
    );
}
export default AddPlaylist;
