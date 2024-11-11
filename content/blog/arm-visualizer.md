[Live Demo](https://dan10ish.github.io/RoboticArm/) | [Source Code](https://github.com/dan10ish/RoboticArm)

## Introduction

Simulating robotic arms in 3D environments is crucial for testing control algorithms and user interfaces before deploying to physical hardware. This is why I built an interactive 3D robotic arm controller using React and Three.js, complete with smooth animations and intuitive controls.

## Prerequisites

- Basic `React`
- npm or yarn installed
- Understanding of basic 3D concepts
- Familiarity with `JavaScript`

## Project Setup

First, create a new React project and install dependencies:

```bash
npx create-react-app robotic-arm
cd robotic-arm
npm install @react-three/drei @react-three/fiber three framer-motion framer-motion-3d lucide-react
```

Our project structure:

```plaintext
src/
  ├── App.js          # Main application
  ├── Arm.jsx         # Robotic arm component
  ├── index.js        # Entry point
  └── index.css       # Styles
public/
  └── assets/
      └── Arm.glb     # 3D model file
```

## Understanding the Core Concepts

Our robotic arm has three degrees of freedom:

1. Base Rotation (Left/Right)
2. Lower Arm (Up/Down)
3. Upper Arm (Up/Down)

Each joint has specific movement limits to maintain realistic motion:

```jsx
const MOVEMENT_LIMITS = {
  base: { min: -Math.PI / 2, max: Math.PI / 2, axis: "z" },
  upper: { min: -Math.PI / 4, max: Math.PI / 2, axis: "x" },
  lower: { min: -Math.PI / 3, max: Math.PI / 2, axis: "x" },
};
```

## Implementation Details

### 1. 3D Model Management

We load and manage the 3D model using React Three Fiber:

```jsx
const { nodes, materials } = useGLTF("/assets/Arm.glb");
const skinnedMeshRef = useRef();
const [bones, setBones] = useState({});

useEffect(() => {
  const skeleton = nodes["4DOF_Robotic_Arm"].skeleton;
  const bonesMap = {};
  skeleton.bones.forEach((bone) => {
    bonesMap[bone.name] = bone;
  });
  setBones(bonesMap);
}, [nodes]);
```

This code creates a map of bone names to their corresponding bone objects, making it easier to control individual joints.

### 2. Movement System

The movement system uses a combination of state management and animation frames:

```jsx
const [movements, setMovements] = useState({});

useFrame(() => {
  if (!bones.base) return;

  Object.entries(movements).forEach(([joint, movement]) => {
    if (!movement) return;

    const { direction, speed } = movement;
    const baseSpeed = 0.05 * speed;

    switch (joint) {
      case "base": {
        const newRotation =
          bones.base.rotation.z +
          (direction === "right" ? baseSpeed : -baseSpeed);
        bones.base.rotation.z = Math.max(
          MOVEMENT_LIMITS.base.min,
          Math.min(MOVEMENT_LIMITS.base.max, newRotation)
        );
        break;
      }
      case "lower": {
        const newRotation =
          bones.LowerArm.rotation.x +
          (direction === "up" ? baseSpeed : -baseSpeed);
        bones.LowerArm.rotation.x = Math.max(
          MOVEMENT_LIMITS.lower.min,
          Math.min(MOVEMENT_LIMITS.lower.max, newRotation)
        );
        break;
      }
      case "upper": {
        const newRotation =
          bones.UpperArm.rotation.x +
          (direction === "up" ? baseSpeed : -baseSpeed);
        bones.UpperArm.rotation.x = Math.max(
          MOVEMENT_LIMITS.upper.min,
          Math.min(MOVEMENT_LIMITS.upper.max, newRotation)
        );
        break;
      }
      default: {
        console.warn(`Unexpected joint value: ${joint}`);
        break;
      }
    }
  });
});
```

### 3. Control Interface

The user interface consists of joint selection toggles and direction controls:

```jsx
const DirectionControls = ({ type, onControl, active }) => {
  if (!active) return null;

  return (
    <motion.div
      className={`direction-controls ${type}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {type === "base" ? (
        // Base Rotation Controls
        <>
          <button
            className="direction-button"
            onMouseDown={() => onControl(type, "left")}
            onMouseUp={() => onControl(type, "stop")}
            onMouseLeave={() => onControl(type, "stop")}
            onTouchStart={() => onControl(type, "left")}
            onTouchEnd={() => onControl(type, "stop")}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="direction-label">Rotate Base</div>
          <button
            className="direction-button"
            onMouseDown={() => onControl(type, "right")}
            onMouseUp={() => onControl(type, "stop")}
            onMouseLeave={() => onControl(type, "stop")}
            onTouchStart={() => onControl(type, "right")}
            onTouchEnd={() => onControl(type, "stop")}
          >
            <ChevronRight size={24} />
          </button>
        </>
      ) : (
        // Arm Controls
        <>
          <button
            className="direction-button"
            onMouseDown={() => onControl(type, "up")}
            onMouseUp={() => onControl(type, "stop")}
            onMouseLeave={() => onControl(type, "stop")}
            onTouchStart={() => onControl(type, "up")}
            onTouchEnd={() => onControl(type, "stop")}
          >
            <ChevronUp size={24} />
          </button>
          <div className="direction-label">
            {type === "upper" ? "Upper Arm" : "Lower Arm"}
          </div>
          <button
            className="direction-button"
            onMouseDown={() => onControl(type, "down")}
            onMouseUp={() => onControl(type, "stop")}
            onMouseLeave={() => onControl(type, "stop")}
            onTouchStart={() => onControl(type, "down")}
            onTouchEnd={() => onControl(type, "stop")}
          >
            <ChevronDown size={24} />
          </button>
        </>
      )}
    </motion.div>
  );
};
```

### 4. Scene Setup

The 3D scene requires proper camera positioning and controls:

```jsx
const Scene = () => {
  return (
    <Canvas shadows gl={{ antialias: true }}>
      <CustomCamera />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Environment preset="city" />
      <fog attach="fog" args={["#f0f0f0", 0, 100]} />

      <Arm
        ref={armRef}
        scale={0.1}
        position={[0, -2.5, 0]}
        rotation={[0, 0, 0]}
        castShadow
      />

      <OrbitControls
        minDistance={3}
        maxDistance={20}
        enablePan={true}
        panSpeed={2}
        maxPolarAngle={Math.PI / 1.5}
      />

      <gridHelper args={[50, 50, 0xff0000, 0x999999]} position={[0, -2.5, 0]} />
    </Canvas>
  );
};
```

## Mobile Optimization

For better mobile experience, we handle touch events and viewport sizing:

```jsx
useEffect(() => {
  const setHeight = () => {
    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight}px`
    );
  };

  setHeight();
  window.addEventListener("resize", setHeight);
  return () => window.removeEventListener("resize", setHeight);
}, []);
```

## Future Improvements

Consider adding these features to enhance the project:

1. Movement recording and playback
2. Preset positions
3. Inverse kinematics
4. Multiple viewing angles
5. Path planning visualization
6. Collision detection

## Troubleshooting Common Issues

1. **Model Loading Issues**

   - Ensure GLB file is in the correct location
   - Check model format and bone names
   - Verify file path in useGLTF

2. **Movement Glitches**

   - Check movement limits
   - Verify rotation axes
   - Ensure smooth animation frames

3. **Mobile Responsiveness**
   - Test touch events
   - Verify viewport settings
   - Check control button sizes

## Deployment

Deploy to GitHub Pages:

```bash
# Add homepage to package.json
{
  "homepage": "https://dan10ish.github.io/RoboticArm"
}

# Deploy command
npm run deploy
```

## Conclusion

This project demonstrates how to create an interactive 3D robotic arm controller using React and Three.js. The implementation provides a foundation for more complex robotics simulations and can be extended with additional features.
