'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const HomeModel = ({ position = [0, 0, 0], scale = 1 }) => {
  const houseRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();
  const scaleFactor = Math.min(viewport.width / 20, 1); // Consistent with WobbleBox

  // Base size of the house
  const baseSize = 2;
  const adjustedSize = baseSize * scaleFactor * scale;

  // Dynamically adjust position to stay within viewport
  const maxX = viewport.width / 2 - adjustedSize / 2; // Half viewport width minus half model size
  const maxY = viewport.height / 2 - adjustedSize / 2; // Half viewport height minus half model size
  const adjustedPosition = [
    Math.max(-maxX, Math.min(maxX, position[0] * scaleFactor)), // Clamp x within viewport
    Math.max(-maxY, Math.min(maxY, position[1] * scaleFactor)), // Clamp y within viewport
    position[2], // z remains unchanged
  ];

  useFrame(() => {
    if (houseRef.current) {
      houseRef.current.rotation.y += 0.01; // Continuous rotation
      houseRef.current.scale.setScalar(hovered ? 1.2 * scaleFactor : 1 * scaleFactor); // Hover effect
    }
  });

  return (
    <group
      ref={houseRef}
      position={adjustedPosition}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => (window.location.href = '/')}
    >
      {/* House Base */}
      <mesh position={[0, adjustedSize / 4, 0]}>
        <boxGeometry args={[adjustedSize, adjustedSize / 2, adjustedSize * 0.75]} />
        <meshStandardMaterial color={hovered ? 'orange' : 'sandybrown'} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, adjustedSize * 0.625, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[adjustedSize * 0.75, adjustedSize / 2, 4]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      {/* Door */}
      <mesh position={[0, adjustedSize / 8, adjustedSize * 0.375 + 0.05]}>
        <boxGeometry args={[adjustedSize / 4, adjustedSize / 4, 0.1]} />
        <meshStandardMaterial color="darkred" />
      </mesh>
    </group>
  );
};

export default HomeModel;