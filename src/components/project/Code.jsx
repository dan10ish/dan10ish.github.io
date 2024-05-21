import React from "react";
import { Link } from "react-router-dom";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Knuckle from "../Gltfjsx/Knuckle.jsx";
import Uc from "../Gltfjsx/Uc.jsx";
import Fc from "../Gltfjsx/Fc.jsx";

export default function Code() {
  const [visiblekj, setVisiblekj] = React.useState(false);
  const [visibleuc, setVisibleuc] = React.useState(false);
  const [visiblefc, setVisiblefc] = React.useState(false);

  // Height bug fix
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();
  return (
    <>
      <main>
        <div className="menu">
          <Link to="/">
            <div className="menu-items">About</div>
          </Link>
          <Link to="/project">
            <div className="menu-items box">Projects</div>
          </Link>
          <Link to="/picture">
            <div className="menu-items">Photos</div>
          </Link>
        </div>
        <div className="project">
          <div className="projectNav">
            <Link to="/project">
              <div className="nav">All</div>
            </Link>
            <Link to="/code">
              <div className="nav box">Code</div>
            </Link>
            <Link to="/design">
              <div className="nav">Design</div>
            </Link>
          </div>
          <div className="project-content">
            <div className="table-row">
              <div className="table-column title box">
                <a
                  href="https://dan10ish.github.io/RoboticArm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  robotic <br /> arm
                </a>
              </div>
              <div className="table-columns">
                3-DOF robotic arm made using r3f
              </div>
            </div>

            <div className="table-row">
              <div className="table-column title box">
                <a
                  href="https://dan10ish.github.io/Galaxy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  galaxy
                </a>
              </div>
              <div className="table-columns">three.js particle system</div>
            </div>

            <div className="table-row">
              <div className="table-column title box">
                <a
                  href="https://github.com/dan10ish/3DOF-RoboticArm-C"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  3-DOF <br /> arm
                </a>
              </div>
              <div className="table-columns">
                complete modelling of 3DOF arm in C
              </div>
            </div>

            <div className="table-row">
              <div className="table-column title box">
                <a
                  href="https://dan10ish.github.io/Office"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  office
                </a>
              </div>
              <div className="table-columns">r3f site and blender models</div>
            </div>
          </div>
        </div>
      </main>
      {visiblekj && (
        <div className="three">
          <div className="buttonThree" onClick={() => setVisiblekj(false)}>
            X
          </div>
          <Canvas>
            <Knuckle
              scale={0.015}
              rotation={[0.5, -0.4, -0.6]}
              position={[0, -0.2, 0]}
            />
            <Environment preset="warehouse" />
            <OrbitControls />
          </Canvas>
        </div>
      )}
      {visibleuc && (
        <div className="three">
          <div className="buttonThree" onClick={() => setVisibleuc(false)}>
            X
          </div>
          <Canvas>
            <Uc
              scale={0.009}
              rotation={[0.5, -0.4, 0]}
              position={[0, -0.1, 0]}
            />
            <Environment preset="warehouse" />
            <OrbitControls />
          </Canvas>
        </div>
      )}

      {visiblefc && (
        <div className="three">
          <div className="buttonThree" onClick={() => setVisiblefc(false)}>
            X
          </div>
          <Canvas>
            <Fc scale={0.01} rotation={[0.2, 2.4, 0]} position={[0, -0.3, 0]} />
            <Environment preset="warehouse" />
            <OrbitControls />
          </Canvas>
        </div>
      )}
    </>
  );
}
