import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const CourseDetails = () => {
    const [cour, setcour] = useState([]);
    const { _id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/cours/${_id}`);
                const userData = response.data.data;
                setcour(userData);
            } catch (error) {
                console.error("Erreur lors de la récupération du cour :", error);
            }
        };

        fetchData();
    }, [_id]);


    return (
        <div className="single3">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />

                {cour && (
                    <div className="top">
                        <div className="left">
                            <Link to={`/Dashcour/update/${cour._id}`}>
                                <div className="editButton">Modifier</div>
                            </Link>
                            <h1 className="title">Informations</h1>

                            <div className="item">
                                <div className="details">
                                    <h1 className="itemTitle">{cour.title}</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Description :</span>
                                        <span className="itemValue">{cour.description}</span>
                                    </div>

                                    <div className="detailItem">
                                        <span className="itemKey">Vidéo:</span>
                                        <video className="" controls style={{ width: '400px', height: 'auto'  }}>
                                            <source src={cour.video} type="video/mp4" />
                                        </video>                                      
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">PDF :</span>
                                        <iframe src={cour.pdf} tiframerget="_blank" rel="noopener noreferrer" />
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Image :</span>
                                        <img src={cour.image} alt="" className="itemImg" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default CourseDetails;
