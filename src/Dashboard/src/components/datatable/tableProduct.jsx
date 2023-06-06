import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ProductColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TableProduct = ({searchValue}) => {
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/products");
        console.log("Dashproduit", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${id}`);
      setData((prevData) => prevData.filter((product) => product.id !== id));
      setSelectedIds((prevIds) => prevIds.filter((selectedId) => selectedId !== id));
      alert("Produit supprimé avec succès !");
      window.location.href = "/Dashproducts";
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <div className="cellAction">
            <Link to={`/Dashproducts/${id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={() => window.scrollTo(0, 0)}>Voir</div>
            </Link>
            <div className="deleteButton">
              <span onClick={() => handleDelete(id)}>Supprimer</span>
            </div>
          </div>
        );
      },
    },
  ];
  const filteredData = data.filter((user) => {
    const username = user.title.toLowerCase();
    return username.includes(searchValue.toLowerCase());
  });
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Ajouter un nouveau produit
        <Link to="newProduct" className="link">
          Ajouter
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData.map((val) => ({ id: val._id, ...val }))}
        columns={ProductColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        selectionModel={selectedIds}
        onSelectionModelChange={setSelectedIds}
      />
    </div>
  );
};

export default TableProduct;
