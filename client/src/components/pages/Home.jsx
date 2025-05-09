import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import InfoButton from "../modules/InfoButton.jsx";
import "./Home.css";
import { UserContext } from "../App"; // Import UserContext
import NavBark from "../modules/NavBark.jsx";

const Home = (props) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext); // Correctly using useContext to access userName

  const handleLogin = (response) => {
    if (response?.credential) {
      userContext.handleLogin(response).then(() => {
        navigate("/Articles");
      });
    }
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      {userContext.userId && <NavBark />}
      <div className="home">
        <div className="Home-content">
          <h1 className="Home-title">
            {userContext.userId
              ? "welcome, " + userContext.userName
              : "The Hitchhiker's Guide to Hip-Hop"}
          </h1>
          {!userContext.userId ? (
            <>
              <div className="login-container">
                {/* Styled Google Login Button */}
                <GoogleLogin
                  onSuccess={handleLogin}
                  onError={(err) => console.log("Google login error:", err)}
                  useOneTap
                  theme="outline" // options: "outline", "filled_blue", "filled_black"
                  size="large" // options: "small", "medium", "large"
                  text="signin_with" // options: "signin_with", "signup_with", "continue_with"
                  shape="pill" // options: "rectangular", "pill", "circle"
                  logo_alignment="center" // options: "left", "center"
                />
              </div>
              <button className="home-articles-button" onClick={() => navigate("/articles")}>
                Or click me to go straight to Articles
              </button>
            </>
          ) : (
            <button className="logout-button" onClick={userContext.handleLogout}>
              logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
