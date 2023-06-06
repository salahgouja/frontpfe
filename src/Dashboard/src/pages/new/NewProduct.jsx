import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState } from "react";
import axios from "axios";

const NewProduct = ({ title }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [etat, setEtat] = useState("");
  const [category, setCategory] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleEtatChange = (e) => {
    setEtat(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const ajouterProduit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      formData.append("phone", phone);
      formData.append("quantity", quantity);
      formData.append("image", image);
      formData.append("etat", etat);
      formData.append("price", price);
      formData.append("category", category);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/v1/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        alert("Produit ajouté avec succès !");
        window.location.href = "/Dashproducts";
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout du produit. Veuillez réessayer.");
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
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
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
                  value={name}
                  onChange={handleNameChange}
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
                <label htmlFor="phone">Téléphone :</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Entrez le téléphone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="price">Prix :</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Entrez le prix"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="quantity">Quantité :</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  placeholder="Entrez la quantité"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="etat">État :</label>
                <select id="etat" name="etat" value={etat} onChange={handleEtatChange}>
                  <option value="neuf">Neuf</option>
                  <option value="occasion">Occasion</option>
                </select>
              </div>

              <div className="formInput">
                <label htmlFor="category">Catégorie :</label>
                <select id="category" name="category" value={category} onChange={handleCategoryChange}>
                  <option value="">Choisissez une catégorie</option>
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
                </select>
              </div>

              <button onClick={ajouterProduit}>Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
