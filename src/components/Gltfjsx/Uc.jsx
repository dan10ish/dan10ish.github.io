import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Uc(props) {
  const { nodes, materials } = useGLTF('./assets/uc.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.uc.geometry} material={materials['Steel_-_Satin.001']} />
    </group>
  )
}

useGLTF.preload('./assets/uc.glb')
