import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DarkMode from "./components/DarkMode";

const HomePage = lazy(() => import("./pages/HomePage"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Projects = lazy(() => import("./pages/Projects"));

export default function App() {
  return (
    <Router>
      <div className="app">
        <DarkMode />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog/:fileName" element={<BlogPost />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
