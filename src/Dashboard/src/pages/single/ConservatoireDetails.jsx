import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ConservatoireDetails = () => {
  const [conservatoire, setConservatoire] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/conservatoire/${_id}`);
        setConservatoire([response.data]);
      } catch (error) {
        console.error("Erreur lors de la récupération des conservatoires :", error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        <div className="top">
          <div className="left">
            {conservatoire.map((val) => (
              <>
                <Link to={`/Dashconservatoire/update/${val._id}`}>
                  <div className="editButton">Modifier</div>
                </Link>
                <h1 className="title">Informations</h1>

                <div className="item">
                  <img src={val.image} alt="" className="itemImg" />
                  <div className="details">
                    <h1 className="itemTitle">{val.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email :</span>
                      <span className="itemValue">{val.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Téléphone :</span>
                      <span className="itemValue">{val.phoneNumber}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Adresse du conservatoire :</span>
                      <span className="itemValue">{val.adressconservatoire}</span>
                    </div>

                  </div>
                </div>
              </>
            ))}
          </div>

        </div>

        <div className="bottom">
          <Chart aspect={3 / 1} title="Dépenses des conservatoires (6 derniers mois)" />
        </div>
      </div>
    </div>
  );
};

export default ConservatoireDetails;
