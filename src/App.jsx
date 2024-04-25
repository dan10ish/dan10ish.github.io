import React from "react";
import "./index.css";

import CPP from "./assets/CPP.svg";
import Fusion from "./assets/Fusion.svg";
import Github from "./assets/Github.svg";
import Instagram from "./assets/Instagram.svg";
import Matlab from "./assets/Matlab.svg";
import ReactIcon from "./assets/ReactIcon.svg";
import TF from "./assets/TF.svg";
import Three from "./assets/Three.svg";
import Unity from "./assets/Unity.svg";
import X from "./assets/X.svg";

import arrow from "./assets/arrow.svg";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Knuckle from "./Gltfjsx/Knuckle.jsx";
import Uc from "./Gltfjsx/Uc.jsx";
import Fc from "./Gltfjsx/Fc.jsx";

export default function App() {
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
        <div className="header">
          <div className="name">
            <a href="https://dan10ish.github.io/">danish</a>
          </div>
          <div className="socials">
            <div className="social">
              <a
                href="https://github.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Github} alt="" />
              </a>
            </div>
            <div className="social">
              <a
                href="https://www.instagram.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Instagram} alt="" />
              </a>
            </div>
            <div className="social">
              <a
                href="https://x.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={X} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="subtitle">
            I explore the intersection of{" "}
            <span className="special">Robotics</span> and{" "}
            <span className="special">AI</span>
          </div>
          <div className="education">
            {" "}
            <span className="special">Mechatronics</span>, NMIMS '24
          </div>
          <div className="skills">
            <div className="skillsTitle">Tech territory:-</div>
            <div className="skillsIcons">
              <div className="skillIcon">
                <img src={TF} alt="" />
              </div>
              <div className="skillIcon">
                <img src={CPP} alt="" />
              </div>
              <div className="skillIcon">
                <img src={Three} alt="" />
              </div>
              <div className="skillIcon">
                <img src={ReactIcon} alt="" />
              </div>
              <div className="skillIcon">
                <img src={Unity} alt="" />
              </div>
              <div className="skillIcon">
                <img src={Matlab} alt="" />
              </div>
              <div className="skillIcon">
                <img src={Fusion} alt="" />
              </div>
            </div>
          </div>
          <div className="projects">
            <div className="projectTitle">Projects:-</div>
            <div className="projectlist">
              <div className="project">
                -{" "}
                <a
                  href="https://dan10ish.github.io/RoboticArm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  3DOF robotic arm <img className="arrow" src={arrow} alt="" />
                </a>
              </div>
              <div className="project">
                -{" "}
                <a
                  href="https://dan10ish.github.io/Galaxy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  galaxy <img className="arrow" src={arrow} alt="" />
                </a>
              </div>
              <div className="project">
                -{" "}
                <a
                  href="https://dan10ish.github.io/Office"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  office <img className="arrow" src={arrow} alt="" />
                </a>
              </div>
              <div className="project subprojects">
                - mechanical joints:-
                <div className="subproject">
                  -{" "}
                  <a onClick={() => setVisiblefc(true)}>
                    flange coupling <img className="arrow" src={arrow} alt="" />
                  </a>
                </div>
                <div className="subproject">
                  -{" "}
                  <a onClick={() => setVisiblekj(true)}>
                    knuckle joint <img className="arrow" src={arrow} alt="" />
                  </a>
                </div>
                <div className="subproject">
                  -{" "}
                  <a onClick={() => setVisibleuc(true)}>
                    universal coupling{" "}
                    <img className="arrow" src={arrow} alt="" />
                  </a>
                </div>
              </div>
              <div className="project">
                -{" "}
                <a
                  href="https://github.com/dan10ish/3DOF-RoboticArm-C"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  mathematical modelling of 3DOF arm in C{" "}
                  <img className="arrow" src={arrow} alt="" />
                </a>
              </div>
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
            <Uc scale={0.015} rotation={[0.5, -0.4, 0]} position={[0, 0, 0]} />
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
            <Fc scale={0.015} rotation={[0.2, 2.4, 0]} position={[0, 0, 0]} />
            <Environment preset="warehouse" />
            <OrbitControls />
          </Canvas>
        </div>
      )}
    </>
  );
}
