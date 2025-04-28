"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import Solarsis from "./models/Solarsis";
import { BillionStars } from "././models/BillionStars";
import * as THREE from "three";

export default function Home() {
  const [isRotating, setIsRotating] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvasRef = useRef();

  const toggleRotation = (e) => {
    e.stopPropagation();
    setIsRotating((prev) => {
      const newState = !prev;
      console.log("isRotating toggled to:", newState);
      return newState;
    });
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 2 - 1; // -1 to 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1; // -1 to 1
    setMouse({ x, y });
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0" >
      <Canvas ref={canvasRef} camera={{ position: [0, 10, 30], fov: 50 }} onClick={toggleRotation}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={<Html>Loading...</Html>}>
          <BillionStars position={[0, 0, 0]} scale={50} />
          <Solarsis isRotating={isRotating} scale={3} position={[0, 2, 0]} />
          {/* <MagnifyingGlass mouse={mouse} /> */}
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}

function MagnifyingGlass({ mouse }) {
  const { gl, scene, camera, size } = useThree();
  const meshRef = useRef();
  const renderTarget = useRef(new THREE.WebGLRenderTarget(512, 512)); // Higher resolution for clarity
  const magnifierCamera = useRef(new THREE.PerspectiveCamera(15, 1, 0.1, 1000)); // Narrower FOV for more zoom

  useFrame(() => {
    if (meshRef.current) {
      // Convert mouse coords to world space at a fixed depth
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5); // 0.5 is mid-depth in NDC
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = (10 - camera.position.z) / dir.z; // Adjust depth (10 is near plane)
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Position magnifier camera slightly closer to the scene
      magnifierCamera.current.position.lerp(pos, 0.1); // Smooth movement
      magnifierCamera.current.quaternion.copy(camera.quaternion);
      magnifierCamera.current.position.z = Math.max(magnifierCamera.current.position.z, 15); // Keep above scene

      // Render magnified view
      gl.setRenderTarget(renderTarget.current);
      gl.render(scene, magnifierCamera.current);
      gl.setRenderTarget(null);

      // Position the magnifier mesh in screen space
      meshRef.current.position.set(mouse.x * (size.width / size.height) * 15, mouse.y * 15, 10); // Aspect-adjusted X
    }
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[5, 74]} /> {/* Larger radius, smoother edges */}
      <meshBasicMaterial
        map={renderTarget.current.texture}
        transparent={true}
        opacity={0.95}
        side={THREE.DoubleSide} // Visible from both sides
      />
    </mesh>
  );
}