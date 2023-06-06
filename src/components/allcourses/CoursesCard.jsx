import React, { useState, useEffect } from "react";
import "./filter.css";
import "./courses.css";
import axios from "axios";
import { Link } from "react-router-dom";


const onSubmit = async (e, amount,playlistId) => {
  e.preventDefault();
  const userId = localStorage.getItem("UserId");

  await axios
    .post("/api/test", { amount,playlistId,userId }) // Pass the amount as a parameter in the request body
    .then((res) => {
      const { result } = res.data;
      window.location.href = result.link;
    })
    .catch((err) => console.error(err));
};
const CoursesCard = () => {
  const [playlist, setPlaylist] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({
    price: [],
    teacher: new Set(),
    cons: new Set(),
    title: [],
  });
  const [teachers, setTeachers] = useState([]);
  const [conservatoires, setConservatoires] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  const [afficherListe, setAfficherListe] = useState(false);

  const toggleListe = () => {
    setAfficherListe(!afficherListe);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const fetchAxios = async () => {
    const playlistsRes = await axios.get("http://localhost:8000/api/v1/playlists");
    setPlaylist(playlistsRes.data);

    const teachersRes = await axios.get("http://localhost:8000/api/v1/teacher");
    setTeachers(teachersRes.data);

    const ConsRes = await axios.get("http://localhost:8000/api/v1/conservatoire");
    setConservatoires(ConsRes.data);
  };


  useEffect(() => {
    fetchAxios();

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");
    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    }
  }, []);


  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;

    setFilters((prevState) => {
      const updatedFilters = { ...prevState };
      if (name === "price") {
        if (checked) {
          updatedFilters.price.push(value);
        } else {
          updatedFilters.price = updatedFilters.price.filter(
            (price) => price !== value
          );
        }
      } else if (name === "teacher") {
        if (checked) {
          updatedFilters.teacher.add(value);
        } else {
          updatedFilters.teacher.delete(value);
        }
        
      } else if (name === "cons") {
        if (checked) {
          updatedFilters.cons.add(value);
        } else {
          updatedFilters.cons.delete(value);
        }
      }else if (name === "title") {
        if (checked) {
          updatedFilters.title.push(value);
        } else {
          updatedFilters.title = updatedFilters.title.filter(
            (title) => title !== value
          );
        }
      }
      return updatedFilters;
    });
  };
  const filterPlaylists = () => {
    let filteredPlaylists = playlist;
  
    if (filters.price.length > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) => {
        const price = Number(playlist.prix);
        return filters.price.some((filterPrice) => {
          if (filterPrice === "50_100") {
            return price >= 50 && price < 100;
          } else if (filterPrice === "100_200") {
            return price >= 100 && price < 200;
          } else if (filterPrice === "200+") {
            return price >= 200;
          }
          return false;
        });
      });
    }
  
    if (filters.teacher && filters.teacher.size > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.teacher.has(playlist.teacherName)
      );
    }
  
    if (filters.cons && filters.cons.size > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.cons.has(playlist.conservatoireName)
      );
    }
  
    if (filters.title.length > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.title.includes(playlist.title)
      );
    }
    if (searchValue.trim() !== "") {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        playlist.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return filteredPlaylists;
  };
  

  const filteredPlaylists = filterPlaylists();

  const uniqueTeachers = [...new Set(playlist.map((playlist) => playlist.teacherName))];
  const uniqueConservatoires = [...new Set(playlist.map((playlist) => playlist.conservatoireName))];

  return (
    <>
        <section className='search'>
        <div className='container c_flex' style={{ marginTop: "-15px" }}>
          <div>
            <img src="images/IMG-20230523-WA0000-removebg-preview.png" alt="Logo" style={{ width: "110px" }}></img>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input
              type='text'
              placeholder='Cherchez et appuyez sur Entrée...'
              value={searchValue}
              onChange={handleSearchChange}
            />
            <span>Toutes les catégories</span>
          </div>

          <div className='icon2 f_flex width '>
            {(isLoggedIn && userRole === "teacher") ? (
              <>
                <div style={{ position: 'relative' }}>
                  <i onClick={toggleListe} className='fa fa-plus icon-circle'></i>
                  {afficherListe && (
                    <div className='dropdown'>
                      <ul>
                        <li>
                          <a href="/ajouterPlaylist">Ajouter une playlist</a>
                        </li>
                        <li>
                          <a href="/ajouterLien">Ajouter un Webinaire</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Link to="/profile" onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-circle'></i></Link>
                <Link to="/UserPlaylist" onClick={() => window.scrollTo(0, 0)}><i className="fa fa-file icon-circle"></i></Link>

              </>
            ) : (userRole == "user") ? (
              <>
                <Link to="/profile" onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-circle'></i></Link>
                <Link to="/UserPlaylist" onClick={() => window.scrollTo(0, 0)}><i className="fa fa-file icon-circle"></i></Link>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-circle'></i></Link>
                <Link to="/signin" onClick={() => window.scrollTo(0, 0)}><i className="fa fa-file icon-circle"></i></Link>
              </>
            )}
          </div>
        </div>
      </section>
    <section className="container d_flex">
      <section className="course-filter">
        <div className="container">
          <div className="filter-group">
            <h4>Titre:</h4>
            {playlist.map((playlist) => (
              <label key={playlist.title}>
                <input
                  type="checkbox"
                  name="title"
                  value={playlist.title}
                  onChange={handleFilterChange}
                />
                {playlist.title}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h4>Prix:</h4>
            <label>
              <input
                type="checkbox"
                name="price"
                value="50_100"
                onChange={handleFilterChange}
              />
              50 DT - 100 DT
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="100_200"
                onChange={handleFilterChange}
              />
              100 DT - 200DT
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="200+"
                onChange={handleFilterChange}
              />
              + 200 DT
            </label>
          </div>
          <div className="filter-group">
            <h4>Professeur:</h4>
            {uniqueTeachers.map((teacher) => (
              <label key={teacher}>
                <input
                  type="checkbox"
                  name="teacher"
                  value={teacher}
                  onChange={handleFilterChange}
                />
                {teacher}
              </label>
            ))}
          </div>
          <div className="filter-group">
          <h3>Conservatoire</h3>
          {uniqueConservatoires.map((cons) => {
            const conservatoireName = conservatoires.find((conservatoire) => conservatoire._id === cons)?.
              name;
            return (
              <label key={cons}>
                <input
                  type="checkbox"
                  name="cons"
                  value={cons}
                  onChange={handleFilterChange}
                />
                {conservatoireName}
              </label>
            );
          })}
        </div>
        </div>
      </section>
      <section className="coursesCard">
        <div className="container grid2">
          {filteredPlaylists.map((val) => {
            const teacherId = teachers.find((teacher) => teacher.name === val.teacherName)?._id;
            const ConsId = conservatoires.find((cons) => cons._id === val.conservatoireName)?.name;
            return (
              <div className="items shadow" key={val._id}>
                <div className="content flex">
                  <div className="left"></div>
                  <div className="text">
                  {(isLoggedIn && userRole === "teacher") ? (
                    <>
                    <Link to={`/playlists/${val._id}`} onClick={() => window.scrollTo(0, 0)}>
                      <h1>{val.title}</h1>
                    </Link>
                    <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <label htmlFor="">(5.0)</label>
                  </div>
                  <div className="details">
                    <div className="box">
                    <div className='dimg'>
                      </div>
                        <div className="para">
                          <Link to={`/teacherprofile/${teacherId}`} onClick={() => window.scrollTo(0, 0)} className="prof">
                           <h4> <b>Par : </b> {val.teacherName} </h4>
                          </Link>
                      </div>
                    </div>
                    <Link to={`/conservatoire/${val.conservatoireName}`} onClick={() => window.scrollTo(0, 0)}>
                    <span><b>Sous le conservatoire : </b><span2>{ConsId}</span2></span>
                    </Link>
                  </div>
                  </>
                 ): (
                  <>
                  <h1>{val.title}</h1>
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <label htmlFor="">(5.0)</label>
                    </div>
                    <div className="details">
                      <div className="box">
                      <div className='dimg'>
                      </div>
                        <div className="para">
                          <Link to={`/teacherprofile/${teacherId}`} onClick={() => window.scrollTo(0, 0)} className="prof">
                          <h4> <b>Par : </b> {val.teacherName} </h4>                          
                          </Link>
                        </div>
                      </div>
                      <Link to={`/conservatoire/${val.conservatoireName}`} onClick={() => window.scrollTo(0, 0)}>
                    <span><b>Sous le conservatoire : </b><span2>{ConsId}</span2></span>
                    </Link>
                    </div>
                    </>
                 )}
                  </div>
                </div>
                <div className="price">
                  <h3>${val.prix} tous les cours</h3>
                </div>
                {(isLoggedIn && (userRole === "user" || userRole === "teacher" )) ? (
                <button className='outline-btn' onClick={(e) => onSubmit(e, val.prix * 1000, val._id)}>
                    INSCRIVEZ-VOUS MAINTENANT!
                </button>
                ):(
                  <Link to="signin">
                  <button className='outline-btn' >
                  INSCRIVEZ-VOUS MAINTENANT!
              </button>
              </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </section>
    </>
  );
};

export default CoursesCard;

