import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${id}`);
        console.log("product", response.data.data);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="single2">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        {product && (
          <div className="top">
            <div className="left">
              <Link to={`/Dashproduct/update/${product._id}`}>
                <div className="editButton">Modifier</div>
              </Link>
              <h1 className="title">Informations</h1>

              <div className="item">
                <img src={product.image} alt="" className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">{product.title}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Déscription :</span>
                    <span className="itemValue">{product.description}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Quantité:</span>
                    <span className="itemValue">{product.quantity}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">État du produit :</span>
                    <span className="itemValue">{product.etat}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Prix:</span>
                    <span className="itemValue">{product.price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Numéro du vendeur:</span>
                    <span className="itemValue">{product.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Catégorie:</span>
                    <span className="itemValue">{product.category}</span>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        )}

        <div className="bottom">
          <Chart aspect={3 / 1} title="Product Spending (Last 6 Months)" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
