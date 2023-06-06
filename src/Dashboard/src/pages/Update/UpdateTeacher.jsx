import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateTeacher = ({ title }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [role, setRole] = useState("");
    const [conservatoire, setconservatoire] = useState("");

    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/teacher/${id}`);
                const userData = response.data.data;
                setData(userData);
                setName(userData.name);
                setEmail(userData.email);
                setTelephone(userData.phoneNumber);
                setRole(userData.role);
                setconservatoire(userData.conservatoire);

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


    const handlePhoneChange = (e) => {
        setTelephone(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };
    const handleConservatoireChange = (e) => {
        setconservatoire(e.target.value);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("role", role);
            formData.append("phoneNumber", telephone);
            formData.append("conservatoire", conservatoire);
            formData.append("image", image);

            const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local 

            const res = await axios.put(`http://localhost:8000/api/v1/teacher/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                 'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
                },
            });


            if (res.status === 200) {
                alert("Enseignant modifié avec succès !");
                window.location.href = `/Dashteachers/${id}`;
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de la modification de l'enseignant. Veuillez réessayer.");
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
                                        value={name}
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
                                    <label htmlFor="phone">Téléphone:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter phone"
                                        value={telephone}
                                        onChange={handlePhoneChange}
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
                                    <label htmlFor="conservatoire">Conservatoire :</label>
                                    <input
                                        type="text"
                                        id="conservatoire"
                                        name="conservatoire"
                                        placeholder="Enter conservatoire"
                                        value={conservatoire}
                                        onChange={handleConservatoireChange}
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

export default UpdateTeacher;
