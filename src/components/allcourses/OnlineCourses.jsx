import React , { useState, useEffect } from "react";
import "./courses.css";
import Heading from "../common/heading/Heading";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const OnlineCourses = () => {
  const [playlist, setPlaylist] = useState([]);

  const fetchAxios = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/reunions");
    setPlaylist(res.data);

  };

  useEffect(() => {
    fetchAxios();
  }, []);
  return (
    <>
      <section className='online'>
        <div className='container'>
          <Heading subtitle='Les Webinaire' title='Parcourez Nos Webinaires' />
          <div className='content grid3'>
            {playlist?.map((val) => (
               <Link to={`/reunion/${val._id}`} onClick={() => window.scrollTo(0, 0)}>
              <div className='box'>
                      <h2><b>{val.title}</b></h2>
                      <div className="para">
                           <h4> <b>Par : </b> {val.teachername} </h4>
                      </div>
                <span>le {moment(val.date).format("DD-MM-YYYY")}</span>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineCourses;