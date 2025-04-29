"use client";
import React from 'react';
import { useGLTF } from '@react-three/drei';

export function BillionStars(props) {
  const { nodes, materials } = useGLTF('../../model/billions_stars.glb'); // Correct path: singular "model"
  return (
    <group {...props} dispose={null} scale={100}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('../../model/billions_stars.glb'); // Correct path: singular "model"