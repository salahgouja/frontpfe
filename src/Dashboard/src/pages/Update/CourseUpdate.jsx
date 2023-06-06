import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateCourse = ({ title }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [pdf, setpdf] = useState(null);
    const [video, setvideo] = useState(null);

    const { id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/cours/${id}`);
                const courData = response.data.data;
                setData(courData);
                setName(courData.title);
                setdescription(courData.description);
                setpdf(courData.pdf);
                setvideo(courData.video)
            } catch (error) {
                console.error("Erreur lors de la récupération des cours :", error);
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


    const handlepdfChange = (e) => {
        setpdf(e.target.value);
    };
    const handlevideoChange = (e) => {
        setvideo(e.target.value);
    };

    const updatecourse = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", name);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("pdf", pdf);
            formData.append("video", video);

            const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local


            const res = await axios.put(`http://localhost:8000/api/v1/cours/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête

                },
            });


            if (res.status === 200) {
                console.log("cours: ", res.data);
                alert("cour modifié avec succès !");
                window.location.href = `/Dashcourses/${id}`;
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de la modification du cours. Veuillez réessayer.");
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
                        

                        <div className="right">
                            <form enctype="multipart/form-data">

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
                                    <label htmlFor="pdf">PDF:</label>
                                    <input
                                        type="file"
                                        id="pdf"
                                        name="pdf"
                                        onChange={handlepdfChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="file">Vidéo:</label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="video"
                                        onChange={handlevideoChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="file">
                                        Image: 
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <button onClick={updatecourse}>Enregistrer</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateCourse;
