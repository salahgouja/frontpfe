import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateMeetings = ({ title }) => {
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [date, setdate] = useState(null);
    const [time, settime] = useState(null);
    const [link, setlink] = useState(null);

    const { _id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/reunions/${_id}`);
                const ReunionData = response.data;
                setData(ReunionData);
                setName(ReunionData.title);
                setdescription(ReunionData.description);
                setdate(ReunionData.date);
                settime(ReunionData.time);
                setlink(ReunionData.lien);

            } catch (error) {
                console.error("Erreur lors de la récupération de réunions :", error);
            }
        };

        fetchData();
    }, [_id]);

  

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handledescriptionChange = (e) => {
        setdescription(e.target.value);
    };


    const handledateChange = (e) => {
        setdate(e.target.value);
    };
    const handletimeChange = (e) => {
        settime(e.target.value);
    };
    const handelLinkChange = (e) => {
        setlink(e.target.value);
    };
    const UpdateMeetings = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", name);
            formData.append("description", description);
            formData.append("date", date);
            formData.append("time", time);
            formData.append("lien",link);
            const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local


            const res = await axios.put(`http://localhost:8000/api/v1/reunions/${_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête

                },
            });


            if (res.status === 200) {
                console.log("reunions: ", res.data);
                alert("Reunion modifié avec succès !");
                window.location.href = `/Dashmeetings/${_id}`;
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de la modification du Reunion. Veuillez réessayer.");
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
                                    <label htmlFor="date">Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        onChange={handledateChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="time">Heure:</label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        onChange={handletimeChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="Link">Lien :</label>
                                    <input
                                        type="link"
                                        id="link"
                                        name="link"
                                        onChange={handelLinkChange}
                                    />
                                </div>

                                <button onClick={UpdateMeetings}>Enregistrer</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateMeetings;
