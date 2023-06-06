import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ConsProfile = () => {
    const [image, setImage] = useState(null);
    const [ Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [Adresse, setAdresse] = useState("");
    const [Phone, setPhone] = useState("");

    const [data, setData] = useState(null);
    const id = localStorage.getItem('UserId');  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/conservatoire/${id}`);
                const userData = response.data;
                setData(userData);
                setName(userData.name);
                setEmail(userData.email);
                setRole(userData.role);
                setAdresse(userData.adressconservatoire)
                setPhone(userData.phoneNumber)
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        };

        fetchData();
    }, [id]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAdresseChange = (e) => {
        setAdresse(e.target.value);
    };
 
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", Name);
            formData.append("email", email);
            formData.append("role", role);
            formData.append("adressconservatoire", Adresse);
            formData.append("phoneNumber",Phone)
            const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local


            const res = await axios.put(`http://localhost:8000/api/v1/conservatoire/${id}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
                },
            });
                console.log("User: ", res.data);
                alert("Informations modifié avec succès !");
                window.location.href = "/dashboard";
            
        } catch (error) {
            console.log(error);
            alert("Erreur lors de la modification de vos informations. Veuillez réessayer.");
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
               
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
                                    <label htmlFor="name">Nom :</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter name"
                                        value={Name}
                                        onChange={handleNameChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="role">Role:</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        placeholder="Enter role"
                                        value={role}
                                        onChange={handleRoleChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="Adresse">Adress du Conservatoire:</label>
                                    <input
                                        type="text"
                                        id="Adresse"
                                        name="Adresse"
                                        placeholder="Enter Adresse"
                                        value={Adresse}
                                        onChange={handleAdresseChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="Phone">Numéro du Conservatoire:</label>
                                    <input
                                        type="text"
                                        id="Phone"
                                        name="Phone"
                                        placeholder="Enter Phone"
                                        value={Phone}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                                <button onClick={updateUser}>Enregistrer</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsProfile;
