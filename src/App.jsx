import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import HomePage from "./pages/HomePage";

import DarkMode from "./components/DarkMode";

export default function App() {
  return (
    <Router>
      <div className="app">
        <DarkMode />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog/:fileName" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}
