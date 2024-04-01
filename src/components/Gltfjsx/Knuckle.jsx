import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Knuckle(props) {
  const { nodes, materials } = useGLTF("./assets/knuckle.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.knuckle.geometry}
        material={materials["Steel_-_Satin"]}
      />
    </group>
  );
}

useGLTF.preload("./assets/knuckle.glb");
