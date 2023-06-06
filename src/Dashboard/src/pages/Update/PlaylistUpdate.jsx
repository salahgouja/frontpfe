import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePlaylist = ({ title }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [prix, setprix] = useState("");
    const [teacherName, setteacherName] = useState("");
    const [conservatoireName, setconservatoireName] = useState("");

    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/playlists/${id}`);
                const PlaylistData = response.data;
                setData(PlaylistData);
                setName(PlaylistData.title);
                setdescription(PlaylistData.description);
                setteacherName(PlaylistData.teacherName);
                setprix(PlaylistData.prix);
                setconservatoireName(PlaylistData.conservatoireName)
            } catch (error) {
                console.error("Erreur lors de la récupération des playlists :", error);
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

    const handledescriptionChange = (e) => {
        setdescription(e.target.value);
    };




    const handleprixChange = (e) => {
        setprix(e.target.value);
    };
    const handleteacherNameChange = (e) => {
        setteacherName(e.target.value);
    };
    const handleconservatoireNameChange = (e) => {
        setconservatoireName(e.target.value);
    };
    
    const updateplaylist = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", name);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("teacherName",teacherName);
            formData.append("prix",prix);
            formData.append("conservatoireName",conservatoireName);

            const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local


            const res = await axios.put(`http://localhost:8000/api/v1/playlists/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête

                },
            });


            if (res.status === 200) {
                console.log("playlists: ", res.data);
                alert("playlist modifié avec succès !");
                window.location.href = `/Dashplaylists/${id}`;
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de la modification du playlist. Veuillez réessayer.");
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
                            
                        </div>

                        <div className="right">
                            <form encType="multipart/form-data">
                               

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
                                    <label htmlFor="description">Déscription:</label>
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
                                    <label htmlFor="prix">Prix:</label>
                                    <input
                                        type="text"
                                        id="prix"
                                        name="prix"
                                        placeholder="Enter prix"
                                        value={prix}
                                        onChange={handleprixChange}
                                    />
                                </div>
                          
                                <div className="formInput">
                                    <label htmlFor="teacherName">Nom du Prof:</label>
                                    <input 
                                    type="text"
                                    id="teacherName" 
                                    name="teacherName" 
                                    placeholder="Enter teacherName" 
                                    value={teacherName} 
                                    onChange={handleteacherNameChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="conservatoireName">Nom du Conservatoire:</label>
                                    <input
                                    type="text"
                                        id="conservatoireName"
                                        name="conservatoireName"
                                        placeholder="Enter conservatoireName"
                                        value={conservatoireName}
                                        onChange={handleconservatoireNameChange}
                                    />
                                </div>

                                <button onClick={updateplaylist}>Enregistrer</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdatePlaylist;
