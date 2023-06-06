import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CourseColumns } from "../../datatablesource";

const PlaylistDetails = () => {
    const [playlist, setPlaylist] = useState([]);
    const { _id } = useParams();
    const [courses, setCourses] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/playlists/${_id}`);
               const userData = response.data;
               setPlaylist(userData);
            } catch (error) {
                console.error("Erreur lors de la récupération du playlist :", error);
            }
        };
        const fetchcours = async () => {
            try {
              const response = await axios.get(`http://localhost:8000/api/v1/cours/ByplaylistId/${_id}`);
              if (Array.isArray(response.data)) {
                setCourses(response.data);
              } else {
                setCourses([]);
              }
            } catch (error) {
              console.error("Erreur lors de la récupération des cours :", error);
            }
          };          

        fetchcours()
        fetchData();
    }, [_id]);
    const handleDeleteCourse = async (id) => {
        try {
          await axios.delete(`http://localhost:8000/api/v1/cours/${id}`);
          setCourses((prevCourses) => prevCourses.filter((cours) => cours.id !== id));
          setSelectedIds((prevIds) => prevIds.filter((selectedId) => selectedId !== id));
          alert("Cours supprimé avec succès !");
          window.location.href =`/Dashplaylists/${id}` ;
        } catch (error) {
          console.error("Erreur lors de la suppression du cours :", error);
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
                        <Link to={`/Dashcourses/${id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Voir</div>
                        </Link>
                        <div className="deleteButton">
                            <span onClick={() => handleDeleteCourse(id)}>Supprimer</span>
                        </div>
                    </div>
                );
            },
        },
    ];
      
    return (
        <div className="single2">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />

                {playlist && (
                    <div className="top">
                        <div className="left">
                            <Link to={`/Dashplaylistupdate/${playlist._id}`}>
                                <div className="editButton">Modifier</div>
                            </Link>
                            <h1 className="title">Informations</h1>

                            <div className="item">
                                <div className="details">
                                    <h1 className="itemTitle">{playlist.title}</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Déscription :</span>
                                        <span className="itemValue">{playlist.description}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Prix:</span>
                                        <span className="itemValue">{playlist.prix}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Nom d'enseignant:</span>
                                        <span className="itemValue">{playlist.teacherName}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Nom du conservatoire :</span>
                                        <span className="itemValue">{playlist.conservatoireName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                <div className="bottom">
                    <div className="datatable">
                        <div className="datatableTitle">
                            Cours
                            <Link to={`/newcourse/${_id}`} className="link">Ajouter Nouveau Cours</Link>
                        </div>
                        <DataGrid
                            className="datagrid"
                            rows={courses.map((val) => ({ id: val._id, ...val }))}                           
                            columns={CourseColumns.concat(actionColumn)}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            checkboxSelection
                            selectionModel={selectedIds}
                            onSelectionModelChange={setSelectedIds}
                        />
                    </div>        
                </div>
            </div>
        </div>
    );
};

export default PlaylistDetails;
