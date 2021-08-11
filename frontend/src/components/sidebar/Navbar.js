import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import useUser from "../../hooks/useUser";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from 'react-router-dom';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { isLoggedIn, logout } = useUser();
  const history = useHistory();
  const location = useLocation();
  const avatarPath = "http://localhost:4000/" + sessionStorage.userFoto;

  useEffect(() => {
    if (isLoggedIn === false)
      <Redirect
        to={{
          pathname: "/",
          state: { from: location },
        }}
      />;
  }, [isLoggedIn, location]);

  const handleClick = (e) => {
    e.preventDefault();
    logout();
    history.push('/')
    
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar" justify-content>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h2>Sistema de inventarios</h2>

          
          
          
        </div>


        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li  className="nav-text">
                  <Link to={`/user-info/${sessionStorage.userId}`}>
                  <Avatar alt="ProfileImage" src={avatarPath} />
                    <span>{sessionStorage.userName} {sessionStorage.userApellido}</span>
                  </Link>
                </li>
            
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );

            }

            )}


            <li  className="nav-text">
                  <Link to="/" onClick={handleClick}>
                    <span>Cerrar Sesión</span>
                  </Link>
                </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
