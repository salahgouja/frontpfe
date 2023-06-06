import React, { useState } from "react";
import axios from "axios";
import Back from "../common/back/Back";
import "./contact.css";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

const Contact = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [description, setDescription] = useState("");

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSujetChange = (e) => {
    setSujet(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/v1/contactus", {
        nom,
        email,
        sujet,
        description,
      });
      alert("Votre message a été envoyé avec succès !");
      // Réinitialisez les états du formulaire
      setNom("");
      setEmail("");
      setSujet("");
      setDescription("");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Header />
      <Back title="Contactez-nous" />
      <section className="contacts padding">
        <div className="container shadow flexSB">
          <div className="left row">
            <iframe
              title="Carte"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=10.605224132537842%2C35.84626052951581%2C10.61495327949524%2C35.85299864286251&amp;layer=mapnik"
            ></iframe>
          </div>
          <div className="right row">
            <h1>Contactez-nous</h1>
            <p>Nous sommes ouverts à toute suggestion ou simplement pour discuter</p>

            <div className="items grid2">
              <div className="box">
                <h4>ADRESSE:</h4>
                <p>Av. la Perle du Sahel, Sousse</p>
              </div>
              <div className="box">
                <h4>EMAIL:</h4>
                <p>HyperDev@gmai.com</p>
              </div>
              <div className="box">
                <h4>TÉLÉPHONE:</h4>
                <p>+ 1235 2355 98</p>
              </div>
            </div>

            <form>
              <div className="flexSB">
                <input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={handleNomChange}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <input
                type="text"
                placeholder="Sujet"
                value={sujet}
                onChange={handleSujetChange}
              />
              <textarea
                cols="30"
                rows="10"
                placeholder="Écrivez un message ici..."
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
              <button className="primary-btn" onClick={handleSubmit}>
                ENVOYER LE MESSAGE
              </button>
            </form>

            <h3>Suivez-nous ici</h3>
            <div className="social">
              <i className="fab fa-facebook-f icon"></i>
              <i className="fab fa-instagram icon"></i>
              <i className="far fa-envelope icon"></i>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
