import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SchoolIcon from '@mui/icons-material/School';
import PianoIcon from '@mui/icons-material/Piano';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../../components/context/darkModeContext";
import { useContext, useEffect, useState } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogout = () => {
    // Effectuer les actions de déconnexion, réinitialiser l'état
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("UserRole");
    window.location.href = "/";
  };
  useEffect(() => {

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");
    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    }
  }, []);
  return (
    <div className="sidebar">
      <div className="top2">
      <img src="images/IMG-20230523-WA0000-removebg-preview.png" alt="Logo" style={{width:"150px"}}></img>
        
      </div>
      <hr /> 
      {(isLoggedIn && userRole === "superadmin") ? (
           <>
      <div className="center">
     
        <ul>
          <p className="title">PRINCIPAL</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon2" />
            <span>Tableau de bord</span>
          </li>
          </Link>
          <p className="title">LISTES</p>
          <Link to="/Dashusers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon2" />
              <span>Utilisateurs</span>
            </li>
          </Link>
          <Link to="/Dashproducts" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon2" />
              <span>Produits</span>
            </li>
          </Link>
          <Link to="/Dashteachers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon2" />
              <span>Enseignants</span>
            </li>
          </Link>
          <Link to="/Dashplaylists" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon2" />
              <span>Cours</span>
            </li>
          </Link>
          <Link to="/Dashmeetings" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon2" />
              <span>Webinaire</span>
            </li>
          </Link>
          <Link to="/Dashconservatoires" style={{ textDecoration: "none" }}>
            <li>
              <PianoIcon className="icon2" />
              <span>Conservatoires</span>
            </li>
          </Link>
          
        
          <p className="title">UTILE</p>
          <li>
          <a href="http://localhost:1080/#/" target="_blank" rel="noopener noreferrer">
            <NotificationsNoneIcon className="icon2" />
            <span>Notifications</span>
            </a>
          </li>
      
          <p className="title">UTILISATEUR</p>
          <li>
            <Link to="/AdminProfile">
            <AccountCircleOutlinedIcon className="icon2" />
            <span>Profil</span>
            </Link>
          </li>
          <li>
            <ExitToAppIcon className="icon2" />
            <span><div onClick={handleLogout}>Se déconnecter</div></span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
          </>
          ):(
<>
      <div className="center">
     
        <ul>
          <p className="title">PRINCIPAL</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon2" />
            <span>Tableau de bord</span>
          </li>
          </Link>
          <p className="title">LISTES</p>
          <Link to="/conservatoireteachers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon2" />
              <span>Enseignants</span>
            </li>
          </Link>
          <Link to="/conservatoireplaylists" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon2" />
              <span>Cours</span>
            </li>
          </Link>
          <Link to="/Dashmeetings" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon2" />
              <span>Webinaire</span>
            </li>
          </Link>
          <p className="title">UTILE</p>
          <li>
          <a href="http://localhost:1080/#/" target="_blank" rel="noopener noreferrer">
            <NotificationsNoneIcon className="icon2" />
            <span>Notifications</span>
            </a>
          </li>
      
          <p className="title">UTILISATEUR</p>
          <li>
            <Link to="/AdminProfileConservatoire">
            <AccountCircleOutlinedIcon className="icon2" />
            <span>Profil</span>
            </Link>
          </li>
          <li>
            <ExitToAppIcon className="icon2" />
            <span><div onClick={handleLogout}>Se déconnecter</div></span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
          </>
          )}
    </div>
  );
};

export default Sidebar;
