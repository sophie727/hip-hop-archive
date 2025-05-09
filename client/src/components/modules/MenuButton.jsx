import React, { useState } from "react";
import "./MenuButton.css";

/**
 * Menu Button in NavBar (does an animation!!).
 */
const MenuButton = (props) => {
  return (
    <div
      className={`MenuButton-container ${props.isOpen && "change"}`}
      onClick={props.menu_animation}
    >
      <div className="MenuButton-bar1 MenuButton-bar"></div>
      <div className="MenuButton-bar2 MenuButton-bar"></div>
      <div className="MenuButton-bar3 MenuButton-bar"></div>
    </div>
  );
};

export default MenuButton;
