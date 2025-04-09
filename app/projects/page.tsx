"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Html } from "next/document";
import { Suspense } from "react";
import { BillionStars } from "../models/billionStars";
import HomeModel from "../components/HomeIcon3D";
export default function Page4() {
    return (
        <div className="w-screen h-screen fixed top-0 left-0">
              <Canvas camera={{ position: [0, 10, 30], fov: 50 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
        
                <Suspense fallback={<Html>Loading...</Html>}>
                <HomeModel position={[-11, 5, 0]} />
                  <BillionStars position={[0, 0, 0]} scale={50} />
              
                </Suspense>
        
                <OrbitControls enableZoom={false} enableRotate={false} />
              </Canvas>
            </div>
    );
  }