import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPost";

const App = () => {
  return (
    <Router>
      <div className="top-effect" />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:fileName" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
