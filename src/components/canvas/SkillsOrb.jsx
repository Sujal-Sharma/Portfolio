import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Trail, Sphere } from "@react-three/drei";
import * as THREE from "three";

const OrbitingSkill = ({ skill, index, total, radius = 2 }) => {
  const meshRef = useRef();
  const trailRef = useRef();
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = 0.3 + index * 0.05;
    meshRef.current.position.x = Math.cos(t * speed + angle) * radius;
    meshRef.current.position.z = Math.sin(t * speed + angle) * radius;
    meshRef.current.position.y = Math.sin(t * 0.5 + index) * 0.5;
    meshRef.current.rotation.y = t * speed;
  });

  const color = skill.color || "#915eff";

  return (
    <group ref={meshRef}>
      <Sphere args={[0.12, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </group>
  );
};

const CenterOrb = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[0.5, 32, 32]}>
      <meshStandardMaterial
        color="#915eff"
        emissive="#915eff"
        emissiveIntensity={0.3}
        roughness={0.1}
        metalness={0.9}
        wireframe
      />
    </Sphere>
  );
};

const SkillsOrbCanvas = ({ skills = [] }) => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#915eff" distance={10} />
        <CenterOrb />
        {skills.slice(0, 8).map((skill, i) => (
          <OrbitingSkill
            key={skill.name}
            skill={skill}
            index={i}
            total={Math.min(skills.length, 8)}
            radius={2}
          />
        ))}
        {skills.slice(8, 14).map((skill, i) => (
          <OrbitingSkill
            key={skill.name}
            skill={skill}
            index={i}
            total={Math.min(skills.length - 8, 6)}
            radius={3.2}
          />
        ))}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default SkillsOrbCanvas;
