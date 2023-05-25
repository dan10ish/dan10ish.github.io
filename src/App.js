import { React, useState, useEffect } from "react";
import "./App.css";
import CustomCamera from "./customCamera";
import Room from "./Room.jsx";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export default function App() {
  //Custom Loader
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  // Fix Height Bug in IOS
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();

  // Custom camera
  const [cameraTarget, setCameraTarget] = useState({
    // position: { x: 0, y: 3.5, z: 3.5 },
    // rotation: { x: -10, y: 0, z: 0 },
    position: { x: -4.65, y: 3, z: 1.6 },
    rotation: { x: -30, y: -45, z: -20 },
  });

  const defaultView = () => {
    setCameraTarget({
      position: { x: -4.65, y: 3, z: 1.6 },
      rotation: { x: -30, y: -45, z: -20 },
    });
  };

  const laptopView = () => {
    setCameraTarget({
      position: { x: -0.45, y: 2, z: -1.35 },
      rotation: { x: -10, y: 0, z: 0 },
    });
  };

  const mobileView = () => {
    setCameraTarget({
      position: { x: -1.3, y: 1.9, z: -2.15 },
      rotation: { x: -90, y: 0, z: 0 },
    });
  };

  return (
    <>
      {loading ? (
        <div className="control">
          <span class="loadStart">
            <span class="loadingdot">.</span>
            <span class="loadingdot">.</span>
            <span class="loadingdot">.</span>
          </span>
        </div>
      ) : (
        <main>
          <motion.group
            dispose={null}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 3,
              duration: 1,
            }}
          >
            <div id="name" className="name">
              <div className="title">
                d<span className="at"></span>n
                <span className="exclamation"></span>
                <span className="dollar"></span>
                <span className="hash"></span>
              </div>
              <div className="subTitle">Creative Enthusiast</div>
            </div>
            <div className="buttons-container">
              <div className="buttons-con">
                <div className="buttons">
                  <button onClick={laptopView}>
                    <img src="./assets/laptop.svg" alt="" />
                  </button>
                </div>
                <div className="buttons">
                  <button onClick={mobileView}>
                    <img src="./assets/phone.svg" alt="" />
                  </button>
                </div>
                <div className="buttons">
                  <button onClick={defaultView}>
                    <img src="./assets/home.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </motion.group>
          <Canvas>
            <CustomCamera
              position={cameraTarget.position}
              rotation={cameraTarget.rotation}
            />
            <Environment preset="city" />
            <Room />
            <Chair
              position={[0, 0.06, 0]}
              scale={2}
              rotation={[-1.55, 0, 2.5]}
            />
            <Base />
            <gridHelper
              args={[50, 25, 0xff0000, 0x999999]}
              position={[10, -0.5, -2]}
              rotation={[0, 0, 0]}
            />
          </Canvas>
        </main>
      )}
    </>
  );
}

export function Chair(props) {
  const { nodes, materials } = useGLTF("./assets/Chair.gltf");
  return (
    <motion.group
      {...props}
      dispose={null}
      initial={{ x: 1, z: -0.5 }}
      animate={{ x: -0.8, z: -0.9 }}
      transition={{
        delay: 1,
        duration: 2,
      }}
    >
      <motion.group
        initial={{ rotateZ: 3 }}
        animate={{
          rotateZ: [0, 0.2, 0, 0.2, 0, 0.2, 0, 0.2, 0, 0.2, 0, 0.2, 0],
        }}
        transition={{
          delay: 3,
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.group
          initial={{ rotateZ: 3 }}
          animate={{
            rotateZ: 0,
          }}
          transition={{
            delay: 1,
            duration: 2,
          }}
        >
          <group position={[0, 0.25, 0.4]}>
            <mesh
              geometry={nodes.Cube004.geometry}
              material={materials.BlackPlasticBump}
            />
            <mesh
              geometry={nodes.Cube004_1.geometry}
              material={materials.SUS}
            />
            <mesh
              geometry={nodes.Cube004_2.geometry}
              material={materials.BluePlastic}
            />
          </group>
          <mesh
            geometry={nodes.Seat001.geometry}
            material={materials.Farbic}
            position={[0, 0, 0.39]}
          />
          <mesh
            geometry={nodes.Head.geometry}
            material={materials.Farbic}
            position={[0, 0, 0.39]}
          />
        </motion.group>
      </motion.group>

      <group position={[0, 0, 0.39]}>
        <mesh
          geometry={nodes.Cylinder002.geometry}
          material={materials.BlackMetal}
        />
        <mesh
          geometry={nodes.Cylinder002_1.geometry}
          material={materials.Iron}
        />
        <mesh
          geometry={nodes.Cylinder002_2.geometry}
          material={materials.SUS}
        />
        <mesh
          geometry={nodes.Cylinder002_3.geometry}
          material={materials.BlackPlasticBump}
        />
      </group>
    </motion.group>
  );
}

export function Base(props) {
  const { nodes, materials } = useGLTF("./assets/Base.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Base.geometry}
        material={materials["Material.013"]}
        position={[-0.12, -0.08, -2.18]}
        scale={[3, 0.05, 3]}
      />
    </group>
  );
}

useGLTF.preload("./assets/Base.gltf");
useGLTF.preload("./assets/Chair.gltf");
