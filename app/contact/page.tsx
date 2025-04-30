'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import { BillionStars } from '../models/BillionStars';
import HomeModel from '../components/HomeIcon3D';
import emailjs from '@emailjs/browser';
import * as THREE from 'three';

type Vec3 = [number, number, number];

// Floating Control Panel Component
function ControlPanel({ position }: { position: Vec3 }) {
  const panelRef = useRef<THREE.Group>(null!);
  const formRef = useRef<HTMLFormElement>(null);
  const { viewport } = useThree();

  const scaleFactor = Math.min(viewport.width / 20, 1);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [launched, setLaunched] = useState(false);

  useFrame((state) => {
    if (panelRef.current) {
      panelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLaunched(true);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        'service_je50ijr',
        'template_76ivg9o',
        formRef.current,
        'eiwr-gOKkBnzpbQmC'
      )
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          setTimeout(() => {
            setLaunched(false);
            setFormData({ name: '', email: '', message: '' });
          }, 2000);
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          setLaunched(false);
        }
      );
  };

  return (
    <group ref={panelRef} position={position}>
      <mesh>
        <boxGeometry args={[10 * scaleFactor, 6 * scaleFactor, 0.2]} />
        <meshStandardMaterial color="#1e90ff" opacity={0.8} transparent />
      </mesh>
      <Html center>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 text-black">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-2 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="p-2 rounded h-24"
            required
          />
          <button type="submit" className="p-2 bg-green-500 text-white rounded">
            Launch Message
          </button>
        </form>
      </Html>

      {launched && (
        <Text position={[0, 4 * scaleFactor, 0.5]} fontSize={0.5 * scaleFactor} color="white">
          Message Launched Successfully!
        </Text>
      )}
    </group>
  );
}

// Message Orb Component
function MessageOrb({ active, position }: { active: boolean; position: Vec3 }) {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (orbRef.current && active) {
      orbRef.current.position.z += 0.5;
      if (orbRef.current.position.z > 20) {
        orbRef.current.visible = false;
      }
    }
  });

  return (
    <mesh ref={orbRef} position={position} visible={active}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={1} />
    </mesh>
  );
}

// Main Contact Component
export default function Contact() {
  const [messageLaunched] = useState(false);

  return (
    <div className="w-screen h-screen relative">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <BillionStars position={[0, 0, -10]} scale={50} />
        <ControlPanel position={[0, 0, 0]} />
        <MessageOrb active={messageLaunched} position={[0, 0, 0]} />
        <HomeModel position={[-8, 5, 0]} scale={1} />
        <OrbitControls enableZoom={false} enableRotate={true} enablePan={true} />
      </Canvas>
    </div>
  );
}
