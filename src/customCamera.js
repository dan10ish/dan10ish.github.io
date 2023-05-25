import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3, Euler, MathUtils } from "three";
import { gsap } from "gsap";

const CustomCamera = ({ position, rotation }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3()).current;
  const targetRotation = useRef(new Euler()).current;

  useEffect(() => {
    gsap.to(targetPosition, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1, // duration of transition in seconds
    });

    gsap.to(targetRotation, {
      x: MathUtils.degToRad(rotation.x),
      y: MathUtils.degToRad(rotation.y),
      z: MathUtils.degToRad(rotation.z),
      duration: 1, // duration of transition in seconds
    });
  }, [position, rotation]);

  useFrame(() => {
    camera.position.lerp(targetPosition, 0.05);
    camera.rotation.copy(targetRotation);
    camera.updateProjectionMatrix();
  });

  return null;
};

export default CustomCamera;
