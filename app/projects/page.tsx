"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei"; // fix: Html should come from drei not next/document
import { Suspense, useState } from "react";
import { BillionStars } from "../../models/billionStars";
import HomeModel from "../components/HomeIcon3D";
import ProjectStars from "../components/ProjectStars";
import ProjectModal from "../components/ProjectModal";
import { Stars } from '@react-three/drei';

export default function Page4() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas camera={{ position: [0, 10, 30], fov: 50 }}


      >

        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={<Html>Loading...</Html>}>
          <HomeModel position={[-22, 9, 0]} />
          <BillionStars position={[0, 0, 0]} scale={50} />
          <ProjectStars onSelect={setSelectedProject} />
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
