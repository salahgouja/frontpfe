import React ,{useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import "../instrument.css";
import Detailsback from "../background/backdetails";
import axios from "axios";import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
;

const SaxoDetails = () => {
  const { _id } = useParams(); // Récupération de l'ID de l'instrument à partir de l'URL
  const [saxos, setguitars] = useState([]); // État pour stocker les détails de l'instrument

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
    {saxos && (
    <div className="instru-details-container">
      <img className="instru-details-img" src={saxos.image} alt={saxos.name} />
      <div className="instru-details-content">
        <h1 className="instru-details-name">{saxos.title}</h1>
        <p className="instru-details-price"><b>Prix: </b>${saxos.price}.00</p>
        <p className="instru-details-price"><b>Quantité: </b>{saxos.quantity}</p>
        <p><b>Etat d'instrument : </b>{saxos.etat}</p>
        <p className="instru-details-description"><b>Description: </b>{saxos.description}</p>
      </div>
    </div>
    )}
     <Footer/>
    </>
  );
};

export default SaxoDetails;
