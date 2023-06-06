import React, { useState , useEffect} from "react";
import Detailsback from "../background/backdetails";
import axios from "axios";
import "./Home.css"
import { Link } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";

function AddInstrument() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qte, setqte] = useState("");
    const [phone, setphone] = useState("");
    const [description, setDescription] = useState("");
    const [image,setImage] = useState(null);
    const [instrumentType, setInstrumentType] = useState("");
    const [instrumentEtat, setInstrumentEtat] = useState("");
  

    const handelchangName = (e) => {
        setName(e.target.value);
    }
    const handelchangPrice = (e) => {
        setPrice(e.target.value);
    }
    const handelchangQuantity = (e) => {
        setqte(e.target.value);
    }
    const handelchangeDescrip = (e) => {
        setDescription(e.target.value);
    }
    const handelchangetype = (e) => {
        setInstrumentType(e.target.value);
    }
    const handelchangeetat = (e) => {
        setInstrumentEtat(e.target.value);
    }
    const handelchangephone = (e) => {
        setphone(e.target.value);
    }
    const AjoutInstru = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("UserId");
            const formData = new FormData();
            formData.append('title', name);
            formData.append('price', price);
            formData.append('quantity', qte);
            formData.append('phone', phone);
            formData.append('description', description);
            formData.append('category', instrumentType);
            formData.append('etat', instrumentEtat);
            formData.append('userId', userId);
            formData.append('image', image); // image est la variable d'état contenant l'image sélectionnée

            const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local

        const res = await axios.post("http://localhost:8000/api/v1/products", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
            },
            })
            if (res.status === 201) {
                console.log("instrument : ", res.data);
                alert("Instrument ajouté avec succès !");
                localStorage.setItem('userid',userId)
            
                window.location.href = "/marketplace";
            }
        } catch (error) {
            console.log(error)
            alert("Erreur lors de l'ajout de l'instrument. Veuillez réessayer.");
        }
    }


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };



    return (
        <>
            <Header/>

            <Detailsback />
           
            <div className="add-instrument-form">
                <h2>Ajouter un nouvel instrument</h2>
                <form encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="name"><b>Nom <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b></label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Saisie Nom d'instrument"
                            value={name}
                            onChange={handelchangName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price"><b>Prix <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b></label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Saisie le prix d'instrument"
                            value={price}
                            onChange={handelchangPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity"><b>Quantité</b></label>
                        <input
                            type="number"
                            id="quantity"
                            placeholder="Saisie la quantité"
                            value={qte}
                            onChange={handelchangQuantity}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone"><b>Entrez votre Numéro pour que l'acheteur puisse vous contacter</b></label>
                        <input
                            type="number"
                            id="phone"
                            placeholder="Entrer un numéro de téléphone tunisien "
                            value={phone}
                            onChange={handelchangephone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type"><b>Type d'instrument <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b></label>
                        <select id="instrumentType" value={instrumentType} onChange={handelchangetype}>
                            <option value="">Sélectionnez le type d'instrument </option>
                            <option value="644c0611066ad4fe13963714">Guitare</option>
                            <option value="644c0ae86fd044576c704483">Piano</option>
                            <option value="644daad111bd2335dccc3927">Accordéon</option>
                            <option value="644dadf41e37dbe85c5b5360">Violon</option>
                            <option value="6450f15d5e85f86c0f7cd964">Violoncelle</option>
                            <option value="6454e2ae2b3142cdafa936be">Tambours</option>
                            <option value="6454e1f22b3142cdafa936ab">Oud</option>
                            <option value="6454e25f2b3142cdafa936b1">Saxophone</option>
                            <option value="6454e2702b3142cdafa936b4">Trompette</option>
                            <option value="6454e2852b3142cdafa936b7">Darbouka</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Etat"><b>Etat d'instrument <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b></label>
                        <select id="instrumentEtat" value={instrumentEtat} onChange={handelchangeetat}>
                            <option value="neuf">Nouveau</option>
                            <option value="occasion">Occasion</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"><b>Description <span style={{ color: "red", fontWeight: "bold" , marginLeft:"10px" }}>  *</span></b></label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handelchangeDescrip}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image"><b>Image</b></label>
                        <input type="file" id="image" name="image" onChange={handleImageChange} />
                    </div>
                    <button onClick={AjoutInstru}><b>Ajouter l'annonce</b></button>
                </form>
            </div>
            <Footer/> 
        </>
    );
}
export default AddInstrument;
