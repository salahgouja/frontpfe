import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./Dashboard.scss"
import { List } from "@mui/material";

const DashboardHome = () => {
  return (
    <div className="DashboardHome">
      <Sidebar />
      <div className="DashboardContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Derniers 6 mois (Revenus)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Derniers Produits</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
