"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  attribute float charIndex;
  attribute float opacity;
  attribute vec3 offset;
  
  varying float vCharIndex;
  varying float vOpacity;
  varying float vDistance;
  
  void main() {
    vCharIndex = charIndex;
    vOpacity = opacity;
    
    vec3 pos = position + offset;
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    vDistance = length(viewPosition.xyz);
    gl_Position = projectedPosition;
    gl_PointSize = (18.0 / vDistance) * (1.0 + opacity * 0.7);
  }
`;

const fragmentShader = `
  varying float vCharIndex;
  varying float vOpacity;
  varying float vDistance;
  
  uniform vec3 themeColor;
  uniform float time;
  
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
    
    float twinkle = 0.7 + 0.3 * sin(time * 2.0 + vCharIndex * 15.0);
    alpha *= vOpacity * twinkle;
    
    vec3 color = themeColor;
    if (vCharIndex > 4.5) color *= 1.4;
    else if (vCharIndex > 3.5) color *= 1.2;
    else if (vCharIndex > 2.5) color *= 1.0;
    else if (vCharIndex > 1.5) color *= 0.8;
    else color *= 0.6;
    
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;

function OptimizedGalaxy() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const [isInteracting, setIsInteracting] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const [lastPointerX, setLastPointerX] = useState(0);
  const [themeColor, setThemeColor] = useState(new THREE.Color("#666666"));
  
  const { gl, size } = useThree();

  useEffect(() => {
    const updateThemeColor = () => {
      const secondary = getComputedStyle(document.documentElement)
        .getPropertyValue("--secondary").trim();
      setThemeColor(new THREE.Color(secondary || "#666666"));
    };
    
    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    
    return () => observer.disconnect();
  }, []);

  const { geometry } = useMemo(() => {
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const charIndices = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount * 3);
    
    const spiralArms = 4;
    const maxRadius = 3.85;
    const height = 0.3;
    
    for (let i = 0; i < particleCount; i++) {
      const armIndex = i % spiralArms;
      const progress = Math.pow(Math.random(), 0.7);
      const radius = progress * maxRadius;
      
      const baseAngle = (armIndex / spiralArms) * Math.PI * 2;
      const spiralAngle = progress * Math.PI * 3.5;
      const angle = baseAngle + spiralAngle + (Math.random() - 0.5) * 0.3;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * height * (1 - progress * 0.8);
      
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      
      offsets[i * 3] = x;
      offsets[i * 3 + 1] = y;
      offsets[i * 3 + 2] = z;
      
      charIndices[i] = Math.floor(Math.random() * 5);
      opacities[i] = 0.4 + progress * 0.6;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('offset', new THREE.BufferAttribute(offsets, 3));
    geometry.setAttribute('charIndex', new THREE.BufferAttribute(charIndices, 1));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    
    return { geometry };
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        themeColor: { value: themeColor },
        time: { value: 0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [themeColor]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.themeColor.value = themeColor;
    }
  }, [themeColor]);

  useEffect(() => {
    const canvas = gl.domElement;
    
    const handlePointerDown = (event: PointerEvent) => {
      setIsInteracting(true);
      setLastPointerX(event.clientX);
      canvas.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isInteracting) return;
      
      const deltaX = event.clientX - lastPointerX;
      
      setRotationY(prev => prev + deltaX * 0.005);
      
      setLastPointerX(event.clientX);
      event.preventDefault();
    };

    const handlePointerUp = (event: PointerEvent) => {
      setIsInteracting(false);
      canvas.releasePointerCapture(event.pointerId);
      event.preventDefault();
    };

    const handlePointerLeave = () => {
      setIsInteracting(false);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    
    canvas.style.touchAction = 'none';

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.style.touchAction = 'auto';
    };
  }, [gl.domElement, isInteracting, lastPointerX]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    
    if (groupRef.current) {
      if (!isInteracting) {
        groupRef.current.rotation.y += 0.003;
      } else {
        groupRef.current.rotation.y = rotationY;
      }
      
      const breathe = Math.sin(state.clock.elapsedTime * 0.4) * 0.02 + 1;
      groupRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 6, 0, 0]}>
      <points ref={meshRef} geometry={geometry} material={material} />
    </group>
  );
}

export default function AsciiGalaxy() {
  const galaxyPosition = {
    x: 0,
    y: 2.2,
    z: 6
  };

  return (
    <div className="w-full h-24 relative overflow-hidden my-2 select-none">
      <Canvas
        camera={{
          position: [galaxyPosition.x, galaxyPosition.y, galaxyPosition.z],
          fov: 35
        }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          cursor: "grab"
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.9 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: true
        }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).style.cursor = "grabbing";
        }}
        onPointerUp={(e) => {
          (e.target as HTMLElement).style.cursor = "grab";
        }}
      >
        <OptimizedGalaxy />
      </Canvas>
    </div>
  );
} 