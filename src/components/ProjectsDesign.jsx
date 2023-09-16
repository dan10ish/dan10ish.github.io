import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Knuckle from "./3dassets/Knuckle.jsx";
import Uc from "./3dassets/Uc.jsx";
import Fc from "./3dassets/Fc.jsx";

export default function Projects() {
  const [visiblekj, setVisiblekj] = React.useState(false);
  const [visibleuc, setVisibleuc] = React.useState(false);
  const [visiblefc, setVisiblefc] = React.useState(false);
  return (
    <>
      {/* Header */}
      <div className="header-content">
        <Link to="/">
          <div className="name">
            <h1>Danish Ansari</h1>
          </div>
        </Link>
        {/* Nav */}
        <div className="nav">
          <div className="nav-content">
            <Link to="/about">
              <div className="button one">About</div>
            </Link>
            <Link to="/projects">
              <div className="button two">
                <span className="highlight">Projects</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="project-title">
        <Link to="/projects">
          <div className="title-content">all</div>
        </Link>
        <Link to="/projectsCode">
          <div className="title-content">code</div>
        </Link>
        <Link to="/projectsDesign">
          <div className="title-content">
            <span className="highlight">design</span>
          </div>
        </Link>
      </div>
      <div className="projects">
        <div className="title">
          <a
            href="https://marketplace.visualstudio.com/items?itemName=danish.mariana-theme"
            target="_blank"
            rel="noopener noreferrer"
          >
            mariana
          </a>
        </div>
        <div className="subtitle">VSCode custom theme</div>

        <div className="title" onClick={() => setVisiblekj(true)}>
          knuckle <br /> joint
        </div>
        <div className="subtitle">hinged joint b/w 2 rods</div>

        <div className="title" onClick={() => setVisibleuc(true)}>
          universal <br /> coupling
        </div>
        <div className="subtitle">joint b/w 2 shafts</div>

        <div className="title" onClick={() => setVisiblefc(true)}>
          flange <br /> coupling
        </div>
        <div className="subtitle">coupling b/w rotating shafts</div>
      </div>

      {visiblekj && (
        <div className="three">
          <div className="buttonThree" onClick={() => setVisiblekj(false)}>
            X
          </div>
          <Canvas>
            <Knuckle
              scale={0.03}
              rotation={[0.5, -0.4, -0.6]}
              position={[0, -0.5, 0]}
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
              scale={0.017}
              rotation={[0.5, -0.4, 0]}
              position={[0.6, -1, 0]}
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
            <Fc scale={0.02} rotation={[0, 2.2, 0]} position={[0, 0, -0.7]} />
            <Environment preset="warehouse" />
            <OrbitControls />
          </Canvas>
        </div>
      )}
    </>
  );
}
