import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls, Environment } from "@react-three/drei";

const AnimatedSphere = ({ color1 = "#915eff", color2 = "#00d9ff" }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 4;
    meshRef.current.rotation.y = Math.sin(t / 4) / 4;
    meshRef.current.rotation.z = Math.sin(t / 1.5) / 4;
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color={color1}
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const FloatingSphere = ({ color1, color2 }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 5]} intensity={2} color="#915eff" />
        <directionalLight position={[-2, -2, -5]} intensity={1} color="#00d9ff" />
        <AnimatedSphere color1={color1} color2={color2} />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Suspense>
    </Canvas>
  );
};

export default FloatingSphere;
