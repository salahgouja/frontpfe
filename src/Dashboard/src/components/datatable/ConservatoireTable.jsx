import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { conservatoireColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ConservatoireTable = ({searchValue}) => {
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/conservatoire");
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des conservatoires :", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/conservatoire/${id}`);
      setData((prevData) => prevData.filter((conservatoire) => conservatoire.id !== id));
      setSelectedIds((prevIds) => prevIds.filter((selectedId) => selectedId !== id));
      alert("Conservatoire supprimé avec succès !");
      window.location.href = "/Dashconservatoires";
    } catch (error) {
      console.error("Erreur lors de la suppression du conservatoire :", error);
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
            <Link to={`/Dashconservatoires/${id}`}  style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={()=>window.scrollTo(0, 0)}>Voir</div>
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
    const username = user.name.toLowerCase();
    return username.includes(searchValue.toLowerCase());
  });

  
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Ajouter un nouveau conservatoire
        <Link to="/newConservatoire" className="link">
          Ajouter
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData.map((val) => ({ id: val._id, ...val }))}
        columns={conservatoireColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        selectionModel={selectedIds}
        onSelectionModelChange={setSelectedIds}
        
      />
    </div>
  );
};

export default ConservatoireTable;
