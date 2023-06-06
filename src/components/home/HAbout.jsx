import React, { useEffect, useState } from "react"
import OnlineCourses from "../allcourses/OnlineCourses"
import Heading from "../common/heading/Heading"
import "../allcourses/courses.css"
import { Link } from "react-router-dom"
import axios from "axios"
const HAbout = () => {
  const [playlist, setPlaylist] = useState([]);

  const fetchAxios = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/playlists");
    setPlaylist(res.data);

  };

  useEffect(() => {
    fetchAxios();
  }, []);
  return (
    <>
      <section className='homeAbout'>
        <div className='container'>
        <Link to='/courses' onClick={() => window.scrollTo(0, 0)}><Heading subtitle='nos cours' title='découvrez nos cours en ligne populaires' /></Link>
        <div className="coursesCard">
        <div className="container grid2">
              {playlist.slice(0, 3).map((val) => (
                <div className='items shadow '>
                  <div className='content flex' >
                    <div className='left'>
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
                          <h4> <b>Par : </b> {val.teacherName} </h4>                          
                        </div>
                      </div>
                    </div>
             
                  </div>
                </div>
                <div className="price">
                  <h3>${val.prix} tous les cours</h3>
                </div>
                <button className="outline-btn">INSCRIVEZ-VOUS MAINTENANT!</button>
              </div>
              ))}
            </div>
          </div>
        </div>
        <OnlineCourses />
      </section>
    </>
  )
}

export default HAbout
