"use client";
import React, { useRef } from 'react';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";
import { useRouter } from 'next/navigation';
import { color } from 'three/tsl';

export default function Solarsis({ isRotating, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/model/solar.glb');
  const { actions } = useAnimations(animations, group);
  const router = useRouter();

  const rotationState = useRef(0.9);

  useFrame(() => {
    if (group.current) {
      if (isRotating) {
        rotationState.current += 0.009;
        group.current.rotation.y = rotationState.current;
      } else {
        group.current.rotation.y = rotationState.current;
      }
    }
  });

  // Adjusted positions with larger radius, accounting for model scale
  const quarters = [
    { angle: 0, page: "/about", position: [120, 50, 0], color: '#A8F447' }, // Right (0 radians)
    { angle: Math.PI / 2, page: "/contact", position: [0, 50, 120], color: '#FC5174' }, // Forward (π/2 radians)
    { angle: Math.PI, page: "/projects", position: [-120, 50, 0], color: '#5CE2F1' }, // Left (π radians)
    { angle: 3 * Math.PI / 2, page: "/experience", position: [0, 50, -120], color: '#A272F0' }, // Back (3π/2 radians)
  ];

  const handleButtonClick = (page) => {
    router.push(page);
  };

  const getButtonText = (angle) => {
    switch (angle) {
      case 0:
        return "About";
      case Math.PI / 2:
        return "Contact";
      case Math.PI:
        return "Projects";
      case 3 * Math.PI / 2:
        return "Skills And Services";
      default:
        return "Go to Page";
    }
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" scale={0.043}>
          <group name="5ce69907e7be4b5a89c12dcbbc7d7108fbx">
            <group name="Object_2">
              <group name="RootNode">
                {/* Torus Rings */}
                <group name="Torus_007" rotation={[-Math.PI / 2, 0, 0]} scale={6.317}>
                  <mesh name="Torus_007_unnamed_0" castShadow receiveShadow geometry={nodes.Torus_007_unnamed_0.geometry} material={materials.unnamed} />
                </group>
                <group name="Torus_006" rotation={[-Math.PI / 2, 0, 0]} scale={5.361}>
                  <mesh name="Torus_006_unnamed_0" castShadow receiveShadow geometry={nodes.Torus_006_unnamed_0.geometry} material={materials.unnamed} />
                </group>
                <group name="Torus_005" rotation={[-Math.PI / 2, 0, 0]} scale={4.531}>
                  <mesh name="Torus_005_unnamed_0" castShadow receiveShadow geometry={nodes.Torus_005_unnamed_0.geometry} material={materials.unnamed} />
                </group>
                <group name="Torus_004" rotation={[-Math.PI / 2, 0, 0]} scale={3.485}>
                  <mesh name="Torus_004_unnamed_0" castShadow receiveShadow geometry={nodes.Torus_004_unnamed_0.geometry} material={materials.unnamed} />
                </group>
                <group name="Torus_003" rotation={[-Math.PI / 2, 0, 0]} scale={2.51}>
                  <mesh name="Torus_003_unnamed_0" castShadow receiveShadow geometry={nodes.Torus_003_unnamed_0.geometry} material={materials.unnamed} />
                </group>
                <group name="Torus_002" rotation={[-Math.PI / 2, 0, 0]} scale={1.832}>
                  <mesh name="Torus_002_unnamed_0" castShadow receiveShadow geometry={nodes.Torus_002_unnamed_0.geometry} material={materials.unnamed} />
                </group>
                <group name="Torus_000" rotation={[-Math.PI / 2, 0, 0]} scale={1.326}>
                  <mesh name="Torus_000_unnamed_0" castShadow receiveShadow geometry={nodes.Torus_000_unnamed_0.geometry} material={materials.unnamed} />
                </group>
                <group name="Torus_001" rotation={[-Math.PI / 2, 0, 0]}>
                  <mesh name="Torus_001_unnamed_0" castShadow receiveShadow geometry={nodes.Torus_001_unnamed_0.geometry} material={materials.unnamed} />
                </group>

                {/* Planets */}
                <group name="BezierCircle_008" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={74.656}>
                  <group name="Sphere_008" position={[-0.756, -0.653, 0.011]} rotation={[0, 0, 0.124]} scale={0.031}>
                    <mesh name="Sphere_008_Material_010_0" castShadow receiveShadow geometry={nodes.Sphere_008_Material_010_0.geometry} material={materials.Material_010} />
                  </group>
                </group>
                <group name="BezierCircle_007" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={63.315}>
                  <group name="Sphere_007" position={[-0.805, 0.597, 0.013]} scale={0.02}>
                    <mesh name="Sphere_007_Material_009_0" castShadow receiveShadow geometry={nodes.Sphere_007_Material_009_0.geometry} material={materials.Material_009} />
                  </group>
                </group>
                <group name="BezierCircle_006" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={53.529}>
                  <group name="Sphere_006" position={[0.88, 0.457, 0.016]} rotation={[0, 0, 0.476]} scale={0.035}>
                    <mesh name="Sphere_006_Material_008_0" castShadow receiveShadow geometry={nodes.Sphere_006_Material_008_0.geometry} material={materials.Material_008} />
                  </group>
                </group>
                <group name="BezierCircle_005" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={41.142}>
                  <group name="Sphere_005" position={[-0.907, -0.403, 0.021]} rotation={[0, 0, -1.618]} scale={0.066}>
                    <mesh name="Sphere_005_Material_007_0" castShadow receiveShadow geometry={nodes.Sphere_005_Material_007_0.geometry} material={materials.Material_007} />
                  </group>
                </group>
                <group name="BezierCircle_004" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={29.634}>
                  <group name="Sphere" position={[0.732, -0.675, 0.028]} rotation={[0, 0, -0.749]} scale={0.055}>
                    <mesh name="Sphere_Material_003_0" castShadow receiveShadow geometry={nodes.Sphere_Material_003_0.geometry} material={materials.Material_003} />
                  </group>
                </group>
                <group name="BezierCircle_002" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={21.574}>
                  <group name="Sphere_003" position={[0.568, 0.815, 0.072]} rotation={[0, 0, 2.606]} scale={0.076}>
                    <mesh name="Sphere_003_Material_004_0" castShadow receiveShadow geometry={nodes.Sphere_003_Material_004_0.geometry} material={materials.Material_004} />
                    <group name="BezierCircle_003" rotation={[0, 0, 0.407]} scale={1.597}>
                      <group name="Sphere_010" position={[-0.919, -0.354, 0.056]} rotation={[0, 0, 2.482]} scale={0.11}>
                        <mesh name="Sphere_010_Material_011_0" castShadow receiveShadow geometry={nodes.Sphere_010_Material_011_0.geometry} material={materials.Material_011} />
                      </group>
                    </group>
                  </group>
                </group>
                <group name="BezierCircle_001" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={15.593}>
                  <group name="Sphere_009" position={[0.045, 0.98, 0.072]} rotation={[0, 0, 0.626]} scale={0.076}>
                    <mesh name="Sphere_009_Material_006_0" castShadow receiveShadow geometry={nodes.Sphere_009_Material_006_0.geometry} material={materials.Material_006} />
                  </group>
                </group>
                <group name="BezierCircle" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={11.745}>
                  <group name="Sphere_002" position={[0.309, 0.958, 0.072]} rotation={[0, 0, 1.245]} scale={0.062}>
                    <mesh name="Sphere_002_Material_005_0" castShadow receiveShadow geometry={nodes.Sphere_002_Material_005_0.geometry} material={materials.Material_005} />
                  </group>
                </group>

                {/* Sun */}
                <group name="Sphere_001" position={[0.016, -0.873, 0.083]} rotation={[-Math.PI / 2, 0, 0]} scale={5.337}>
                  <mesh name="Sphere_001_Material_002_0" castShadow receiveShadow geometry={nodes.Sphere_001_Material_002_0.geometry} material={materials.Material_002} />
                </group>
                <group name="Sun" position={[0, 5.74, 0]}>
                  <group name="Object_50" rotation={[Math.PI / 2, 0, 0]} />
                </group>

                {/* Lamps */}
                <group name="Lamp_001" position={[0.01, -0.921, 0.078]} rotation={[1.89, 0.881, -2.045]}>
                  <group name="Object_53" rotation={[Math.PI / 2, 0, 0]} />
                </group>
                <group name="Lamp" position={[0.01, -0.921, 0.078]} rotation={[1.89, 0.881, -2.045]}>
                  <group name="Object_56" rotation={[Math.PI / 2, 0, 0]} />
                </group>

                {/* Permanent Triangle Popups for Each Quarter */}
                {quarters.map((quarter) => (
                  <Html key={quarter.angle} position={quarter.position}>
                    <div
                      style={{
                        position: 'relative',
                        display: 'inline-block',
                        textAlign: 'center',
                      }}
                    >
                      <button
                        onClick={() => handleButtonClick(quarter.page)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: quarter.color,
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: 2,
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {getButtonText(quarter.angle)}
                      </button>
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '12px solid transparent',
                          borderRight: '12px solid transparent',
                          borderTop: '12px solid ',
                          zIndex: 1,
                        }}
                      />
                    </div>
                  </Html>
                ))}
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/model/solar.glb');