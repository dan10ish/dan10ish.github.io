import React, { useState, useRef, useEffect } from "react";
import {
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";
import "./App.css";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function App() {
  const laptop = useGLTF("./MacbookDraco.gltf");

  const [clicked, setClicked] = useState(false);
  const markerRef = useRef();
  const vec = new THREE.Vector3();

  useFrame((state) => {
    if (clicked) {
      state.camera.lookAt(vec.set(0.1, 0.5, 1), 0.2);
      state.camera.position.lerp(vec.set(0, 1, 4), 0.2);
      state.camera.updateProjectionMatrix();
    }
    if (!clicked) {
      state.camera.lookAt(vec.set(0, 0, 0), 0.2);
      state.camera.position.lerp(vec.set(-3, 1.5, 5), 0.2);
      state.camera.updateProjectionMatrix();
    }
    return null;
  });

  return (
    <>
      <Environment preset="city" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <primitive
            object={laptop.scene}
            ref={markerRef}
            onClick={() => setClicked(!clicked)}
            onPointerMissed={() => setClicked(clicked)}
            position={[0.3, -0.5, 0]}
          />

          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={1.25}
            position={[-1.29, 1.81, -1.9]}
            rotation-x={-0.35}
          >
            <iframe src="https://danish.dev/iframeWebsite"></iframe>
          </Html>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
