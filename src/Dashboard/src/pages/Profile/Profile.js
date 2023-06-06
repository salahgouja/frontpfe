import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
    const [image, setImage] = useState(null);
    const [ Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [data, setData] = useState(null);
    const id = localStorage.getItem('UserId');  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/superAdmin/${id}`);
                const userData = response.data;
                setData(userData);
                setName(userData.name);
                setEmail(userData.email);
                setRole(userData.role);
                console.log(userData)
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
            const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local


            const res = await axios.put(`http://localhost:8000/api/v1/superAdmin/${id}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
                },
            });
                console.log("User: ", res.data);
                alert("Informations modifié avec succès !");
                window.location.href = "/AdminProfile";
            
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
                                    <label htmlFor="name">Nom:</label>
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

                                <button onClick={updateUser}>Enregistrer</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
