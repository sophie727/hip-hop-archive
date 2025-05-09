import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import AddArticle from "./components/pages/AddArticle";
import Article from "./components/pages/Article";
import Articles from "./components/pages/Articles";
import Events from "./components/pages/Events";
import Resources from "./components/pages/Resources";
import About from "./components/pages/About";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Navigate, Outlet } from "react-router-dom";
import { get } from "./utilities";

import { GoogleOAuthProvider } from "@react-oauth/google";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "704047553758-pnak0sqvr6sroq0d2aec41iecrj2qokf.apps.googleusercontent.com";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    get("/api/whoami")
      .then((user) => {
        setIsAuthenticated(!!user.googleid); // Set true if user is authenticated, false otherwise
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setIsAuthenticated(false);
      });
  }, []); // Empty dependency array ensures this effect runs once on component mount

  if (isAuthenticated === null) {
    // Loading state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    // todo: make the makePost and profile thing go to something
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Articles" element={<Articles />} />
      <Route path="/Article/:article_id" element={<Article />} />
      <Route path="/AddArticle" element={<AddArticle />} />
      <Route path="/Events" element={<Events />} />
      <Route path="/Resources" element={<Resources />} />
      <Route path="/Profile/:gmailUsername" element={<App />} />
      <Route element={<PrivateRoute />}>
        <Route path="/Profile" element={<App />} />
        <Route path="/MakePost" element={<App />} />
      </Route>
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
