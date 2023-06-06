import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="category">
        {categories?.map((category,index) => (
          <Link to={category._id} key={index}>
            <div className="box f_flex">
              <img src={category.image} alt="" />
              <span>{category.categoryname}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
