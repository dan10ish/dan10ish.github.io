import React, { useState, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  ContactShadows,
  Environment,
  useGLTF,
  PerspectiveCamera,
  PresentationControls,
  Float,
  PerformanceMonitor,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";

// Model
export function Laptop(props) {
  const { nodes, materials } = useGLTF("/MacbookProDraco.gltf");
  return (
    <motion.group
      dispose={null}
      scale={1}
      initial={{ z: 0 }}
      animate={{ z: 0.1 }}
      transition={{
        delay: 5,
        duration: 1,
      }}
    >
      <motion.group
        {...props}
        dispose={null}
        scale={1}
        initial={{ rotateX: -1, rotateZ: 1.55, z: 0, y: 0 }}
        animate={{ rotateX: -1, rotateZ: 0, z: 0.2, y: -0.03 }}
        transition={{
          delay: 2,
          duration: 1,
        }}
      >
        <motion.group
          position={[0, 0.1, 0.01]}
          rotation={[-1.84, 0, 0]}
          scale={0.27}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -2.1 }}
          transition={{
            delay: 2,
            duration: 1,
          }}
        >
          <mesh
            geometry={nodes.Cube002.geometry}
            material={materials["Black Glass"]}
          />
          <mesh
            geometry={nodes.Cube002_1.geometry}
            material={materials["Black Plastic"]}
          />
          <mesh
            geometry={nodes.Cube002_2.geometry}
            material={materials.Glass}
          />
          <mesh
            geometry={nodes.Cube002_4.geometry}
            material={materials["Space Grey"]}
          />
          <mesh
            geometry={nodes.Cube002_5.geometry}
            material={materials["Space Grey.001"]}
          />
        </motion.group>
        <mesh
          geometry={nodes.Camera_Light.geometry}
          material={materials["Camera Light"]}
          position={[0, 0.1, 0.01]}
          rotation={[1.95, 0, 0]}
          scale={0.27}
        />
        <mesh
          geometry={nodes.Caps_Lock_Light.geometry}
          material={materials["Caps Lock Light"]}
          position={[0, 0, -0.01]}
          scale={0.27}
        />
        <mesh
          geometry={nodes.Macbook_Pro.geometry}
          material={materials["Material.001"]}
          position={[0, 0.1, 0.01]}
          rotation={[1.95, 0, 0]}
          scale={0.27}
        />
        <group position={[0, 0, -0.01]} scale={0.27}>
          <mesh
            geometry={nodes.Cube005.geometry}
            material={materials["Space Grey"]}
          />
          <mesh
            geometry={nodes.Cube005_1.geometry}
            material={materials["Black Plastic"]}
          />
          <mesh
            geometry={nodes.Cube005_2.geometry}
            material={materials["Keys.001"]}
          />
        </group>
        <group position={[0, 0, -0.01]} scale={0.27}>
          <mesh
            geometry={nodes.Cube008.geometry}
            material={materials["Black Plastic"]}
          />
          <mesh
            geometry={nodes.Cube008_1.geometry}
            material={materials["Black Glass"]}
          />
          <mesh geometry={nodes.Cube008_2.geometry} material={materials.Keys} />
        </group>
        <mesh
          geometry={nodes.Touch_Bar_Shot.geometry}
          material={materials["Touch Bar Shot 2021-04-02 at 18.13.28"]}
          position={[0, 0, -0.01]}
          scale={0.27}
        />
        <group position={[0, 0, -0.01]} scale={0.27}>
          <mesh
            geometry={nodes.Cube006.geometry}
            material={materials["Black Plastic"]}
          />
          <mesh geometry={nodes.Cube006_1.geometry} material={materials.Keys} />
        </group>
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials["Black Plastic"]}
          position={[0, 0, -0.01]}
        />
      </motion.group>
    </motion.group>
  );
}

// Main App
export default function App() {
  const [loading, setLoading] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

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
        <div className="container">
          <div className="preview">
            <Canvas dpr={dpr}>
              <PerformanceMonitor
                onIncline={() => setDpr(2)}
                onDecline={() => setDpr(1.5)}
              >
                <Environment preset="city" />
                <directionalLight position={[0, 5, 0]} />
                <spotLight position={[0, 5, 0]} />

                <PresentationControls
                  global
                  config={{ mass: 2, tension: 400 }}
                  snap={{ mass: 4, tension: 400 }}
                  polar={[-0.01, 0.01]}
                  azimuth={[-0.01, 0.01]}
                >
                  <Float
                    speed={2}
                    floatingRange={[-0.01, 0.01]}
                    rotationIntensity={0.1}
                  >
                    <Html
                      distanceFactor={0.26}
                      position={[-0.18, 0.295, 0]}
                      rotation-x={0}
                    >
                      <motion.iframe
                        scale={1}
                        src="https://danish.dev/iframeWebsite"
                        frameborder="0"
                        dispose={null}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: 6,
                          duration: 0.1,
                        }}
                      />
                    </Html>
                    <Laptop />
                  </Float>
                </PresentationControls>
                <ContactShadows
                  position-y={-0.15}
                  opacity={0.7}
                  scale={5}
                  blur={2.4}
                />
                <PerspectiveCamera
                  makeDefault
                  fov={50}
                  position={[0, 0, 1]}
                  rotation={[0, 0, 0]}
                />
              </PerformanceMonitor>
            </Canvas>
          </div>
          <motion.group
            dispose={null}
            scale={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 4,
              duration: 0.1,
            }}
          >
            <div id="menuToggle">
              <input type="checkbox" />

              <span></span>
              <span></span>
              <span></span>

              <ul id="menu">
                <li>Scroll the screen of the Laptop</li>
              </ul>
            </div>
          </motion.group>
        </div>
      )}
    </>
  );
}

useGLTF.preload("/MacbookProDraco.gltf");
