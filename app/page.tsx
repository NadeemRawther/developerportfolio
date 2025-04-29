"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import Solarsis from "./models/Solarsis";
import { BillionStars } from "././models/BillionStars";

export default function Home() {
  const [isRotating, setIsRotating] = useState(true);
  const canvasRef = useRef();

  const toggleRotation = (e) => {
    e.stopPropagation();
    setIsRotating((prev) => {
      const newState = !prev;
      console.log("isRotating toggled to:", newState);
      return newState;
    });
  };



  return (
    <div className="w-screen h-screen fixed top-0 left-0" >
      <Canvas ref={canvasRef} camera={{ position: [0, 10, 30], fov: 50 }} onClick={toggleRotation}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={<Html>Loading...</Html>}>
          <BillionStars position={[0, 0, 0]} scale={50} />
          <Solarsis isRotating={isRotating} scale={3} position={[0, 2, 0]} />
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}