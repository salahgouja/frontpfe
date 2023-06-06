import "../../Dashboard/src/pages/new/new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const InstrumentUpdate = ({ title }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [quantity, setquantity] = useState("");
    const [price, setprice] = useState("");
    const [phone, setphone] = useState("");
    const [etat, setetat] = useState("");
    const [category, setcategory] = useState("");

    const { _id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/products/${_id}`);
                const productsData = response.data.data;
                setData(productsData);
                setName(productsData.title);
                setdescription(productsData.description);
                setquantity(productsData.quantity);
                setphone(productsData.phone);
                setetat(productsData.etat);
                setprice(productsData.price);
                setcategory(productsData.category)
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };

        fetchData();
    }, [_id]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handledescriptionChange = (e) => {
        setdescription(e.target.value);
    };


    const handlequantityChange = (e) => {
        setquantity(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setphone(e.target.value);
    };
    const handlepriceChange = (e) => {
        setprice(e.target.value);
    };
    const handleetatChange = (e) => {
        setetat(e.target.value);
    };
    const handlecategoryChange = (e) => {
        setcategory(e.target.value);
    };
    
    const updateinstru = async (e) => {
        e.preventDefault();
        try {
          //axios.defaults.timeout = 90000; 
            const formData = new FormData();
            formData.append("title", name);
            formData.append("description", description);
            formData.append("phone", phone);
            formData.append("quantity", quantity);
            formData.append("image", image);
            formData.append("price",price);
            const token = localStorage.getItem("token");


            const res = await axios.put(`http://localhost:8000/api/v1/products/${_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,

                },
            });


            if (res.status === 200) {
                alert("Instrument modifié avec succès !");
                window.location.href = `/instrument/${_id}`;
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de la modification du produit. Veuillez réessayer.");
        }
    };

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>{title}</h1>
                </div>
                {data && (
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={data.image ? data.image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
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
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="description">description:</label>
                                    <input
                                        type="description"
                                        id="description"
                                        name="description"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={handledescriptionChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="phone">phone:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter phone"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="price">price:</label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        placeholder="Enter price"
                                        value={price}
                                        onChange={handlepriceChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="quantity">quantity:</label>
                                    <input
                                        type="text"
                                        id="quantity"
                                        name="quantity"
                                        placeholder="Enter quantity"
                                        value={quantity}
                                        onChange={handlequantityChange}
                                    />
                                </div>
                              

                                <button onClick={updateinstru} style={{backgroundColor: "#7C4A15"}}>Enregistrer</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstrumentUpdate;
