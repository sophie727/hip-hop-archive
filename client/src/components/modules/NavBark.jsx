import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { get, post } from "../../utilities";
import "./NavBark.css";
import MenuButton from "./MenuButton";
import DarkMode from "./DarkMode";
import InfoButton from "./InfoButton";
import { UserContext } from "../App"; // Import UserContext

/**
 * The navigation bar at the top of most pages.
 *
 * Proptypes
 * @param {Boolean} dimmed is whether or not the navbark needs to be dimmed
 */
const NavBark = (props) => {
  const { userId, user } = useContext(UserContext);

  const location = useLocation();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const userContext = useContext(UserContext); // Correctly using useContext to access userName

  useEffect(() => {
    // Toggle body class to prevent scrolling when menu is open
    if (menuIsOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      // Clean up by removing the class when the component unmounts
      document.body.classList.remove("menu-open");
    };
  }, [menuIsOpen]);

  function menu_animation() {
    setMenuIsOpen((prev) => !prev);
  }

  const handleLogout = () => {
    userContext.handleLogout();
    menu_animation();
  };

  return (
    <>
      <nav
        className="NavBark-container"
        style={props.dimmed ? { filter: "brightness(60%)", pointerEvents: "none" } : {}}
      >
        <MenuButton isOpen={menuIsOpen} menu_animation={menu_animation} />
        <div className={`NavBark-title u-inlineBlock`}>
          <Link
            className={`NavBark-title {props.dimmed && "NavBark-Link-dimmed"}`}
            to="/"
            onClick={(event) => {
              if (props.dimmed) {
                event.preventDefault();
              }
            }}
          >
            The Hitchhiker's Guide to Hip-Hop
          </Link>
        </div>
        <div className="NavBark-right">
          <InfoButton />
          <DarkMode />
        </div>
      </nav>

      <div className={`menu-fade ${menuIsOpen && "change"}`}>
        {menuIsOpen && (
          <>
            <div className="menu-fade">
              <nav className="menu-container u-textCenter">
                <h1>Menu</h1>
                <hr className="menu-line" />
                <Link to="/Articles" className="menu-item" onClick={menu_animation}>
                  Articles
                </Link>
                <Link to="/Events" className="menu-item" onClick={menu_animation}>
                  Community Events
                </Link>
                <Link to="/Resources" className="menu-item" onClick={menu_animation}>
                  Resources
                </Link>
                <Link to="/" className="menu-item" onClick={handleLogout}>
                  {userId ? "Logout" : "Login"}
                </Link>
              </nav>
            </div>
          </>
        )}{" "}
      </div>
    </>
  );
};

export default NavBark;
