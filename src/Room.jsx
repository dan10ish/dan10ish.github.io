import React, { useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export default function Room(props) {
  const { nodes, materials } = useGLTF("./assets/Room.gltf");
  return (
    <group {...props} dispose={null}>
      <group position={[-0.44, 1.41, -2.23]} scale={0.03}>
        <mesh
          geometry={nodes.Circle001.geometry}
          material={materials["Frame.001"]}
        />
        <mesh
          geometry={nodes.Circle001_1.geometry}
          material={materials.HeadPhoneHole}
        />
        <mesh
          geometry={nodes.Circle001_2.geometry}
          material={materials.USB_C_INSIDE}
        />
        <mesh
          geometry={nodes.Circle001_3.geometry}
          material={materials.TouchbarBorder}
        />
        <mesh
          geometry={nodes.Circle001_4.geometry}
          material={materials.Keyboard}
        />
        <group position={[0, -0.51, 0]} scale={5.8}>
          <mesh
            geometry={nodes.Circle006.geometry}
            material={materials["Frame.001"]}
          />
          <mesh
            geometry={nodes.Circle006_1.geometry}
            material={materials.USB_C_INSIDE}
          />
        </group>
        <group position={[-11.79, -0.15, -8.3]} scale={5.8}>
          <mesh
            geometry={nodes.Circle.geometry}
            material={materials["Keyboard.001"]}
          />
          <mesh geometry={nodes.Circle_1.geometry} material={materials.Key} />
          <mesh
            geometry={nodes.Circle_2.geometry}
            material={materials.Touchbar}
          />
        </group>
        <mesh
          geometry={nodes.KeyboardKeyHole.geometry}
          material={materials["Keyboard.001"]}
          position={[-11.79, -0.15, -8.3]}
          scale={5.8}
        />
        <mesh
          geometry={nodes.RubberFoot.geometry}
          material={materials.DarkRubber}
          position={[-11.95, -0.75, 7.86]}
          scale={5.8}
        />
        <group position={[0.01, -0.21, -10.56]} scale={5.8}>
          <mesh
            geometry={nodes.Circle012.geometry}
            material={materials.HingeBlack}
          />
          <mesh
            geometry={nodes.Circle012_1.geometry}
            material={materials.HingeMetal}
          />
        </group>
        <motion.group
          position={[0.01, -0.47, -10.41]}
          dispose={null}
          scale={5.8}
          initial={{ rotateX: 3.15 }}
          animate={{
            rotateX: 1.45,
          }}
          transition={{
            delay: 2,
            duration: 1,
            ease: "linear",
          }}
        >
          <mesh
            geometry={nodes.Circle002.geometry}
            material={materials["Frame.002"]}
          />
          <mesh
            geometry={nodes.Circle002_1.geometry}
            material={materials.Screen}
          />
          <mesh
            geometry={nodes.Circle002_2.geometry}
            material={materials.ScreenGlass}
          />
          <mesh
            geometry={nodes.Circle002_3.geometry}
            material={materials.Rubber}
          />
          <mesh
            geometry={nodes.Circle002_4.geometry}
            material={materials.DisplayGlass}
          >
            <Html
              wrapperClass="laptop"
              position={[-2.5, 0, -3.57]}
              transform
              rotation-x={-1.6}
              distanceFactor={1.95}
            >
              <motion.iframe
                dispose={null}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 3,
                  duration: 0.1,
                }}
                src="https://danish.dev/laptop"
              />
            </Html>
          </mesh>
        </motion.group>
      </group>
      <mesh
        geometry={nodes.Cup.geometry}
        material={materials["Material.006"]}
        position={[0.34, 1.51, -2.22]}
        rotation={[0, 0.85, 0]}
        scale={[0.09, 0.12, 0.09]}
      />
      <group
        position={[-1.33, 1.4, -2.22]}
        rotation={[-Math.PI / 2, 0, 0.44]}
        scale={0.12}
      >
        <mesh
          geometry={nodes.Circle038.geometry}
          material={materials["FrameGrey.001"]}
        />
        <mesh
          geometry={nodes.Circle038_1.geometry}
          material={materials["Front.001"]}
        />
        <mesh
          geometry={nodes.Circle038_2.geometry}
          material={materials["Antennaline.001"]}
        />
        <mesh
          geometry={nodes.Circle038_3.geometry}
          material={materials["BackGrey.001"]}
        />
        <mesh
          geometry={nodes.Circle038_4.geometry}
          material={materials["Rubber.001"]}
        />
        <mesh
          geometry={nodes.AppleLogo001.geometry}
          material={materials["AppleLogo.001"]}
          position={[0.17, 0.52, -0.08]}
        />
        <mesh
          geometry={nodes.BackCameraBottomGreyRing001.geometry}
          material={materials["BackCaneraGrayRIng.002"]}
          position={[0.7, 0.88, -0.09]}
        />
        <mesh
          geometry={nodes.BackCameraBottomLens001.geometry}
          material={materials["Lens.001"]}
          position={[0.7, 0.88, -0.08]}
        />
        <mesh
          geometry={nodes.BackCameraP1001.geometry}
          material={materials["Black.015"]}
          position={[0.7, 1.03, -0.09]}
        />
        <mesh
          geometry={nodes.BackCameraTopGreyRing001.geometry}
          material={materials["BackCaneraGrayRIng.002"]}
          position={[0.7, 1.18, -0.09]}
        />
        <mesh
          geometry={nodes.CameraBump001.geometry}
          material={materials["Frame.003"]}
          position={[0.7, 1.04, -0.08]}
        />
        <mesh
          geometry={nodes.FlashBG001.geometry}
          material={materials["PinkFlash.002"]}
          position={[0.71, 1.03, -0.09]}
        />
        <mesh
          geometry={nodes.FrontSpeakerBG001.geometry}
          material={materials["FrontSpeaker.001"]}
          position={[0.16, 1.32, 0.08]}
        />
        <mesh
          geometry={nodes.iPhoneLogo001.geometry}
          material={materials["iPhoneLogo.001"]}
          position={[0.2, -1.18, -0.08]}
        />
        <group position={[0.97, 0.56, 0]}>
          <mesh
            geometry={nodes.Circle023.geometry}
            material={materials["FrameGrey.001"]}
          />
          <mesh
            geometry={nodes.Circle023_1.geometry}
            material={materials["Frame.003"]}
          />
        </group>
        <group position={[0.98, -0.04, 0]}>
          <mesh
            geometry={nodes.Circle031.geometry}
            material={materials["Black.014"]}
          />
          <mesh
            geometry={nodes.Circle031_1.geometry}
            material={materials["FrameGrey.001"]}
          />
        </group>
        <mesh
          geometry={nodes.SCREEN.geometry}
          // material={materials["Display.002"]}
        >
          <Html
            wrapperClass="mobile"
            position={[-0.62, 1.43, 0.05]}
            transform
            rotation-x={0}
            distanceFactor={1.95}
          >
            <motion.iframe
              dispose={null}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 3,
                duration: 0.1,
              }}
              src="https://danish.dev/phone"
            />
          </Html>
        </mesh>
        <mesh
          geometry={nodes.VolumeButtons001.geometry}
          material={materials["FrameGrey.001"]}
          position={[-0.66, 0.21, 0]}
        />
      </group>
      <mesh
        geometry={nodes.Top.geometry}
        material={materials["Material.003"]}
        position={[0.05, 1.35, -2.3]}
        scale={[2, 0.04, 0.7]}
      />
      <group position={[1.34, 0.65, -2.28]} scale={[0.7, 0.6, 0.7]}>
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Cube002_1.geometry}
          material={materials["Material.012"]}
        />
      </group>
      <mesh
        geometry={nodes.Cylinder014.geometry}
        material={materials["Material.001"]}
        position={[1.37, 0.96, -1.54]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.02}
      />
      <mesh
        geometry={nodes.Cylinder004.geometry}
        material={materials.BlackMetal}
        position={[1.84, 0.04, -1.75]}
        scale={0.05}
      />
      <mesh
        geometry={nodes.Cylinder005.geometry}
        material={materials.BlackMetal}
        position={[1.84, 0.04, -2.73]}
        scale={0.05}
      />
      <mesh
        geometry={nodes.Cylinder006.geometry}
        material={materials.BlackMetal}
        position={[0.85, 0.04, -1.75]}
        scale={0.05}
      />
      <mesh
        geometry={nodes.Cylinder007.geometry}
        material={materials.BlackMetal}
        position={[0.85, 0.04, -2.73]}
        scale={0.05}
      />
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials.BlackMetal}
        position={[0.85, 1.28, -2.73]}
        scale={0.05}
      />
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials.BlackMetal}
        position={[0.85, 1.28, -1.75]}
        scale={0.05}
      />
      <mesh
        geometry={nodes.Cylinder002.geometry}
        material={materials.BlackMetal}
        position={[1.84, 1.28, -2.73]}
        scale={0.05}
      />
      <mesh
        geometry={nodes.Cylinder003.geometry}
        material={materials.BlackMetal}
        position={[1.84, 1.28, -1.75]}
        scale={0.05}
      />
      <mesh
        geometry={nodes.Cylinder015.geometry}
        material={materials["Material.001"]}
        position={[1.37, 0.36, -1.54]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.02}
      />
      <mesh
        geometry={nodes.Base.geometry}
        material={materials["Material.002"]}
        position={[1.23, 1.42, -2.29]}
        scale={[0.2, 0.04, 0.2]}
      />
      <mesh
        geometry={nodes.Cylinder009.geometry}
        material={materials["Material.002"]}
        position={[1.3, 1.76, -2.29]}
        scale={[0.02, 0.4, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder010.geometry}
        material={materials["Material.002"]}
        position={[1.65, 2.46, -2.29]}
        scale={[0.02, 0.4, 0.02]}
      />
      <mesh
        geometry={nodes.Button.geometry}
        material={materials["Material.001"]}
        position={[1.19, 1.42, -2.29]}
        scale={0.03}
      />
      <mesh
        geometry={nodes.Cylinder012.geometry}
        material={materials.BlackPlasticBump}
        position={[1.42, 2.36, -2.29]}
        scale={0.03}
      />
      <mesh
        geometry={nodes.Head.geometry}
        material={materials["Material.005"]}
        position={[1.41, 2.34, -2.29]}
        rotation={[0, 0, -0.96]}
        scale={0.04}
      />
    </group>
  );
}

useGLTF.preload("./assets/Room.gltf");
