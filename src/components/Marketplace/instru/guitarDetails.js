import React ,{useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import "../instrument.css";
import Detailsback from "../background/backdetails";
import axios from "axios";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";


const GuitarDetails = () => {
  const { _id } = useParams(); // Récupération de l'ID de l'instrument à partir de l'URL
  const [guitars, setguitars] = useState([]); // État pour stocker les détails de l'instrument

  useEffect(() => {
    // Fonction pour récupérer les détails de l'instrument depuis le backend
    const fetchInstrumentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${_id}`);
        setguitars(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInstrumentDetails(); // Appel de la fonction pour récupérer les détails de l'instrument
  }, [_id]);

  return (
    <>
        <Header/>
    <Detailsback/>
    {guitars && (
    <div className="instru-details-container">
      <img className="instru-details-img" src={guitars.image} alt={guitars.name} />
      <div className="instru-details-content">
        <h1 className="instru-details-name">{guitars.title}</h1>
        <p className="instru-details-price"><b>Prix: </b>${guitars.price}.00</p>
        <p className="instru-details-price"><b>Quantité: </b>{guitars.quantity}</p>
        <p><b>Etat d'instrument : </b>{guitars.etat}</p>
        <p className="instru-details-description"><b>Description: </b>{guitars.description}</p>
      </div>
    </div>
    )}
     <Footer/>
    </>
  );
};

export default GuitarDetails;
