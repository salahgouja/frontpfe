import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useState } from "react"

const ListUser = () => {
  const [searchValue, setSearchValue] = useState(""); // État pour stocker la valeur de recherche

  const handleSearch = (value) => {
    setSearchValue(value); // Met à jour la valeur de recherche
  };
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
      <Navbar handleSearch={handleSearch} />
      <Datatable searchValue={searchValue} />
      </div>
    </div>
  )
}

export default ListUser