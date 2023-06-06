import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MeetingDetails = () => {
  const [reunion, setreunion] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/reunions/${_id}`);
        setreunion(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du reunion :", error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <div className="single2">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        {reunion && (
          <div className="top">
            <div className="left">
              <Link to={`/Dashmeetings/update/${reunion._id}`}>
                <div className="editButton">Modifier</div>
              </Link>
              <h1 className="title">Informations</h1>

              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{reunion.title}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Déscription :</span>
                    <span className="itemValue">{reunion.description}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Date:</span>
                    <span className="itemValue">{reunion.date}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Heure:</span>
                    <span className="itemValue">{reunion.time}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Lien:</span>
                    <span className="itemValue">{reunion.lien}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Nom du prof</span>
                    <span className="itemValue">{reunion.teachername}</span>
                  </div>

                </div>
              </div>
            </div>
           
          </div>
        )}

        <div className="bottom">
          <Chart aspect={3 / 1} title="reunion Spending (Last 6 Months)" />
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
