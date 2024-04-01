import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Fc(props) {
  const { nodes, materials } = useGLTF("./assets/fc.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.fc.geometry}
        material={materials["Steel_-_Satin.002"]}
        position={[-4, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("./assets/fc.glb");
