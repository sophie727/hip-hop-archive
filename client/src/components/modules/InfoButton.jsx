import React, { useState, useEffect } from "react";
import "./InfoButton.css";
import { useNavigate } from "react-router-dom";

const InfoButton = (props) => {
  const [text, setText] = useState(props.text);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/About");
  };

  return (
    <button className="info-icon" onClick={handleClick}>
      ?
    </button>
  );
};

export default InfoButton;
