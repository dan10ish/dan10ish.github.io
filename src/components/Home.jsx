import React from "react";
import "../index.css";
import apple from "../assets/apple.svg";
import folder from "../assets/folder.svg";
import location from "../assets/location.svg";
import college from "../assets/college.svg";
import autocad from "../assets/skills/autocad.svg";
import blender from "../assets/skills/blender.svg";
import cpp from "../assets/skills/cpp.svg";
import csharp from "../assets/skills/csharp.svg";
import fusion from "../assets/skills/fusion.svg";
import python from "../assets/skills/python.svg";
import react from "../assets/skills/react.svg";
import tf from "../assets/skills/tf.svg";
import three from "../assets/skills/three.svg";
import unity from "../assets/skills/unity.svg";

import instagram from "../assets/contact/instagram.svg";
import linkedin from "../assets/contact/linkedin.svg";
import twitter from "../assets/contact/twitter.svg";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  AsciiRenderer,
} from "@react-three/drei";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
      <div className="home">
        <div className="path">
          <Link to="/">
            <div className="path-name">
              <h2>Home</h2>
            </div>
          </Link>
          <Link to="/projects">
            <div className="path-name select">
              <h2>Projects</h2>
            </div>
          </Link>
        </div>

        {/* Body */}
        <div className="terminal-body">
          {/* Path Icon */}
          <div className="path-icon">
            <div className="apple">
              <img src={apple} alt="" />
            </div>
            <div className="folder">
              <div className="fIcon">
                <img src={folder} alt="" />
              </div>
              <div className="fText">
                <h3>~/Home</h3>
              </div>
            </div>
          </div>
          <br />
          <div className="body-heading">
            <span className="code">&#62;</span>
            <h4>About Me</h4>
          </div>

          <div className="name">
            /d<span className="at"></span>n<span className="exclamation"></span>
            <span className="dollar"></span>
            <span className="hash"></span>/
          </div>
          <div className="subName">Creative Enthusiast</div>

          {/* Three-D Laptop */}
          <div className="skull">
            <Canvas>
              <ambientLight intensity={0.5} />
              <Mac scale={0.02} rotation={[0.6, 0, 0]} position={[0, -1, 1]} />
              <AsciiRenderer
                fgColor="white"
                bgColor="transparent"
                invert={false}
                resolution={0.3}
              />
              <Environment preset="city" />
              <OrbitControls
                autoRotate={true}
                autoRotateSpeed={4}
                enableZoom={false}
                enablePan={false}
              />
            </Canvas>
          </div>

          {/* About Me */}
          <div className="terminal-content">
            <div className="edu">
              <img src={college} alt="" />
              <p>Mechatronics '24</p>
            </div>

            <div className="edu two loc">
              <img src={location} alt="" />
              <p>Mumbai, India</p>
            </div>

            {/* Path Icon */}
            <div className="path-icon two">
              <div className="apple">
                <img src={apple} alt="" />
              </div>
              <div className="folder">
                <div className="fIcon">
                  <img src={folder} alt="" />
                </div>
                <div className="fText">
                  <h3>~/Home</h3>
                </div>
              </div>
            </div>

            <div className="body-heading two">
              <span className="code">&#62;</span>
              <h4>Skills</h4>
            </div>
            <div className="skills-icons">
              <img src={python} alt="" />
              <img src={tf} alt="" />
              <img src={react} alt="" />
              <img src={three} alt="" />
              <img src={cpp} alt="" />
              <img src={unity} alt="" />
              <img src={csharp} alt="" />
              <img src={fusion} alt="" />
              <img src={autocad} alt="" />
              <img src={blender} alt="" />
            </div>

            {/* Path Icon */}
            <div className="path-icon two">
              <div className="apple">
                <img src={apple} alt="" />
              </div>
              <div className="folder">
                <div className="fIcon">
                  <img src={folder} alt="" />
                </div>
                <div className="fText">
                  <h3>~/Home</h3>
                </div>
              </div>
            </div>

            <div className="body-heading two">
              <span className="code">&#62;</span>
              <h4>Contact</h4>
            </div>

            <div className="contact-icons">
              <div className="contact">
                <a
                  href="https://twitter.com/dan10ish"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitter} alt="" />
                </a>
              </div>
              <div className="contact">
                <a
                  href="https://www.instagram.com/dan10ish/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instagram} alt="" />
                </a>
              </div>
              <div className="contact">
                <a
                  href="https://www.linkedin.com/in/dan10ish/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Mac(props) {
  const { scene } = useGLTF("./assets/Macbook.gltf");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("./assets/Macbook.gltf");
