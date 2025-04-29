"use client";
import { OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { BillionStars } from "../models/BillionStars";
import * as THREE from "three";
import HomeModel from "../components/HomeIcon3D"
import { Group } from "three";


type WobbleBoxProps = {
  position: [number, number, number];
  size: [number, number, number];
  text?: string;
  url?: string;
  isContentBox?: boolean;
};
// 3D Wobble Box Component
function WobbleBox({ position, size, text, url, isContentBox = false }: WobbleBoxProps) {
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree(); // Get viewport dimensions
  const scaleFactor = Math.min(viewport.width / 20, 1); // Scale for mobile (base width ~20 units)

  const adjustedSize: [number, number, number] = [
    size[0] * scaleFactor,
    size[1] * scaleFactor,
    size[2] * scaleFactor,
  ];
  const adjustedPosition: [number, number, number] = [
    position[0] * scaleFactor,
    position[1] * scaleFactor,
    position[2],
  ];

  const canvasTexture = useMemo(() => {
    if (!isContentBox) return null;

    const canvas = document.createElement("canvas");
    const canvasWidth = 1024 * scaleFactor;
    const canvasHeight = 512 * scaleFactor;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    // Background
    if (ctx) {
      ctx.fillStyle = "rgba(152, 251, 180, 0.5)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Text styling
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Title
      ctx.font = `bold ${55 * scaleFactor}px Arial`;
      ctx?.fillText("About Me", canvasWidth / 2, 80 * scaleFactor);

      // Content
      ctx.font = `${25 * scaleFactor}px Arial`;
    }
    const content = [
      "I’m Nadeem Rawther, an enthusiastic Android Developer with over seven years",
      "of experience crafting high-quality Android applications. My expertise lies",
      "in leveraging cutting-edge technologies like Jetpack libraries, including",
      "Jetpack Compose, to build robust and scalable solutions.",
      "I’m passionate about clean code and follow modern development practices",
      "such as MVVM, Clean Architecture, SOLID principles, and Test-Driven",
      "Development (TDD). I have hands-on experience building both front-end and",
      "back-end components for Android apps and have worked with frameworks",
      "like CodeIgniter and Kivy.",
      "As a self-taught software developer, I thrive on learning and implementing",
      "new technologies to enhance my projects. My curiosity drives me to stay",
      "ahead of the curve and deliver innovative solutions.",
    ];
    const lineHeight = 30 * scaleFactor;
    content.forEach((line, index) => {
      ctx?.fillText(line, canvasWidth / 2, 120 * scaleFactor + index * lineHeight);
    });

    return new THREE.CanvasTexture(canvas);
  }, [isContentBox, scaleFactor]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current?.rotation) {
      groupRef.current.rotation.x = Math.sin(time) * 0.1;
      groupRef.current.rotation.y = Math.cos(time) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={adjustedPosition}>
      <mesh onClick={url ? () => window.open(url, "_blank") : undefined}>
        <boxGeometry args={adjustedSize} />
        {isContentBox ? (
          <meshStandardMaterial
            map={canvasTexture}
            metalness={0.5}
            roughness={0.2}
            color="#98F2FB"
          />
        ) : (
          <meshStandardMaterial
            color="#32cd32"
            metalness={0.5}
            roughness={0.2}
          />
        )}
      </mesh>
      {!isContentBox && (
        <Text
          position={[0, 0, adjustedSize[2] / 2 + 0.01]}
          fontSize={0.5 * scaleFactor}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      )}
    </group>
  );
}

export default function About() {
  const boxes: WobbleBoxProps[] = [
    { position: [0, 4, 0], size: [18, 10, 0.5], isContentBox: true },
    { position: [-6, -3, 0], size: [4, 2, 0.5], text: "GitHub", url: "https://github.com/NadeemRawther" },
    { position: [0, -3, 0], size: [4, 2, 0.5], text: "LinkedIn", url: "https://linkedin.com/in/nadeemrawther" },
    { position: [6, -3, 0], size: [4, 2, 0.5], text: "Stack Overflow", url: "https://stackoverflow.com/users/6634545/nadeem" },
    { position: [-6, -6, 0], size: [4, 2, 0.5], text: "Email", url: "mailto:nadeemsani786@gmail.com" },
    { position: [6, -6, 0], size: [4, 2, 0.5], text: "Phone", url: "tel:+918075467438" },
  ];

  return (
    <div className="w-screen relative min-h-screen overflow-y-auto">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        style={{ height: "150vh", width: "100vw" }} // Restored larger height for scrolling
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={<Text position={[0, 0, 0]} fontSize={1}>Loading...</Text>}>
          <HomeModel position={[-11, 7, 0]} />
          <BillionStars position={[0, 0, 0]} scale={50} />
          {boxes.map((box, index) => (
            <WobbleBox
              key={index}
              position={box.position}
              size={box.size}
              text={box.text}
              url={box.url}
              isContentBox={box.isContentBox}
            />
          ))}
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enableRotate={true} // Touch rotation
          enablePan={true} // Touch panning
        />
      </Canvas>
    </div>
  );
}