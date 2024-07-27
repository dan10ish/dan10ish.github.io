import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import Knuckle from "../components/Gltfjsx/Knuckle";
import Uc from "../components/Gltfjsx/Uc";
import Fc from "../components/Gltfjsx/Fc";

import back from "../assets/back.svg";

import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function Projects() {
  const [visiblekj, setVisiblekj] = React.useState(false);
  const [visibleuc, setVisibleuc] = React.useState(false);
  const [visiblefc, setVisiblefc] = React.useState(false);
  return (
    <>
      <div className="projects">
        <div className="home-nav">
          <Link to="/">
            <div>↵</div>
            <div className="home-text">Home</div>
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
            <div className="pname" onClick={() => setVisiblekj(true)}>
              knuckle joint
            </div>
            <div className="pdescription">hinged joint b/w 2 rods</div>
          </div>

          <div className="plist">
            <div className="pname" onClick={() => setVisibleuc(true)}>
              universal coupling
            </div>
            <div className="pdescription">joint b/w 2 rigid shafts</div>
          </div>

          <div className="plist">
            <div className="pname" onClick={() => setVisiblefc(true)}>
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
