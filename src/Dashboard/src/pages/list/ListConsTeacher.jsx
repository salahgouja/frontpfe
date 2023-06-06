import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TeacherConservatoireTable from "../../components/datatable/ConservatoireTeacher"
import { useState } from "react"

const ListConsTeacher = () => {
  const [searchValue, setSearchValue] = useState(""); // État pour stocker la valeur de recherche

  const handleSearch = (value) => {
    setSearchValue(value); // Met à jour la valeur de recherche
  };
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
      <Navbar handleSearch={handleSearch} />
        <TeacherConservatoireTable searchValue={searchValue} />
      </div>
    </div>
  )
}

export default ListConsTeacher