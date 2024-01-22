import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";

import Footer from "./components/Footer";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./components/Auth/AuthContext";
import LoginRedirect from "./components/Auth/LoginRedirect";
import Dashboard from "./components/Dashboard/Dashboard";
import ConfigurationGenerator from "./components/RepositoryConfigurations/ConfigurationGenerator";
import BlogPost from "./components/BlogPost/BlogPost";
import Configurations from "./components/RepositoryConfigurations/Configurations";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col justify-between w-full min-h-screen bg-slate-800 text-white ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/connect/:providerName/redirect"
              element={<LoginRedirect></LoginRedirect>}
            />
            <Route
              path="/repository-configurations/:id"
              element={<ConfigurationGenerator />}
            />
            <Route
              path="/repository-configurations"
              element={<ConfigurationGenerator />}
            />
            <Route
              path="/list-repository-configurations"
              element={<Configurations />}
            />
            <Route path="/git-blog-posts/:id" element={<BlogPost />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
