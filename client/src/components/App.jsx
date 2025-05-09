import React, { useState, useEffect, createContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../utilities.css";
import { socket } from "../client-socket";
import { get, post } from "../utilities";

export const UserContext = createContext(null);
export const ThemeContext = createContext(null); /* context that will contain theme name */

const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Effect that runs once when the component loads to check if the user is logged in
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // If logged in, set user data
        setUserId(user._id);
        setUserName(user.name);
        setUser(user);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log("Google login response:", credentialResponse.credential);
    console.log("decoded login response:", decodedCredential);

    return post("/api/login", { token: userToken }).then((user) => {
      // After login, update context with user data
      setUserId(user._id); // TODO: is this _id or googleid???
      setUserName(user.name); // Make sure to set userName after login
      setUser(user);

      post("/api/initsocket", { socketid: socket.id }).then(() => {});
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUserName("");
    setUser({});
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    userName,
    handleLogin,
    handleLogout,
    user,
  };

  const themeContextValue = {
    theme,
    setTheme,
  };

  return (
    <UserContext.Provider value={authContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <Outlet />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
