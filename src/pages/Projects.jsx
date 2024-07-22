import React, { useState, lazy, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import back from "../assets/back.svg";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Knuckle = lazy(() => import("../components/Gltfjsx/Knuckle"));
const Uc = lazy(() => import("../components/Gltfjsx/Uc"));
const Fc = lazy(() => import("../components/Gltfjsx/Fc"));

export default function Projects() {
  const [visibleModel, setVisibleModel] = useState(null);

  const renderModel = () => {
    switch (visibleModel) {
      case "knuckle":
        return (
          <Knuckle
            scale={0.015}
            rotation={[0.5, -0.4, -0.6]}
            position={[0, -0.2, 0]}
          />
        );
      case "uc":
        return (
          <Uc scale={0.009} rotation={[0.5, -0.4, 0]} position={[0, -0.1, 0]} />
        );
      case "fc":
        return (
          <Fc scale={0.01} rotation={[0.2, 2.4, 0]} position={[0, -0.3, 0]} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="projects">
        <div className="home-nav">
          <Link to="/">
            <div>
              <img src={back} alt="Back" />
            </div>
            <div>Home</div>
          </Link>
        </div>
        <div className="project-content">
          <div className="plist">
            <div className="pname">
              <a
                href="https://dan10ish.github.io/pathfinding-visualizer"
                target="_blank"
                rel="noopener noreferrer"
              >
                pathfinding visualizer
              </a>
            </div>
            <div className="pdescription">
              visualize dijkstra, BFS, DFS, A* with maze
            </div>
          </div>

          <div className="plist">
            <div className="pname">
              <a
                href="https://dan10ish.github.io/RoboticArm"
                target="_blank"
                rel="noopener noreferrer"
              >
                robotic arm
              </a>
            </div>
            <div className="pdescription">3-DOF robotic arm using r3f</div>
          </div>

          <div className="plist">
            <div className="pname" onClick={() => setVisibleModel("knuckle")}>
              knuckle joint
            </div>
            <div className="pdescription">hinged joint b/w 2 rods</div>
          </div>

          <div className="plist">
            <div className="pname" onClick={() => setVisibleModel("uc")}>
              universal coupling
            </div>
            <div className="pdescription">joint b/w 2 rigid shafts</div>
          </div>

          <div className="plist">
            <div className="pname" onClick={() => setVisibleModel("fc")}>
              flange coupling
            </div>
            <div className="pdescription">coupling b/w rotating shafts</div>
          </div>

          <div className="plist">
            <div className="pname">
              <a
                href="https://dan10ish.github.io/Galaxy"
                target="_blank"
                rel="noopener noreferrer"
              >
                galaxy
              </a>
            </div>
            <div className="pdescription">three.js particle animation</div>
          </div>

          <div className="plist">
            <div className="pname">
              <a
                href="https://dan10ish.github.io/3DOF-RoboticArm-C"
                target="_blank"
                rel="noopener noreferrer"
              >
                3-DOF arm
              </a>
            </div>
            <div className="pdescription">
              complete modelling of a 3DOF arm in C
            </div>
          </div>

          <div className="plist">
            <div className="pname">
              <a
                href="https://dan10ish.github.io/Office"
                target="_blank"
                rel="noopener noreferrer"
              >
                office
              </a>
            </div>
            <div className="pdescription">r3f with framer motion</div>
          </div>

          <div className="plist">
            <div className="pname">
              <a
                href="https://marketplace.visualstudio.com/items?itemName=danish.mariana-theme"
                target="_blank"
                rel="noopener noreferrer"
              >
                mariana
              </a>
            </div>
            <div className="pdescription">VSCode custom dark theme</div>
          </div>
        </div>
      </div>
      <Footer />
      {visibleModel && (
        <div className="three">
          <div className="buttonThree" onClick={() => setVisibleModel(null)}>
            X
          </div>
          <Canvas>
            <Suspense
              fallback={<div style={{ color: "white" }}>Loading...</div>}
            >
              {renderModel()}
            </Suspense>
            <Environment preset="warehouse" />
            <OrbitControls />
          </Canvas>
        </div>
      )}
    </>
  );
}
