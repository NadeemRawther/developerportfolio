'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import { BillionStars } from '../../models/billionStars';
import * as THREE from 'three';
import HomeModel from '../components/HomeIcon3D';
import emailjs from '@emailjs/browser'; // Import EmailJS

// Floating Control Panel Component
function ControlPanel({ position = [0, 0, 0] }) {
  const panelRef = useRef();
  const formRef = useRef();
  // Add a ref for the form
  const { viewport } = useThree();

  const scaleFactor = Math.min(viewport.width / 20, 1);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [launched, setLaunched] = useState(false);

  useFrame((state) => {
    panelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.1; // Wobble effect
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLaunched(true);

    // Send email using EmailJS
    emailjs
      .sendForm(
        'service_je50ijr', // Replace with your Service ID
        'template_76ivg9o', // Replace with your Template ID
        formRef.current, // Reference to the form
        'eiwr-gOKkBnzpbQmC' // Replace with your Public Key
      )
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          setTimeout(() => {
            setLaunched(false);
            setFormData({ name: '', email: '', message: '' }); // Reset form
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
      {/* Panel Base */}
      <mesh>
        <boxGeometry args={[10 * scaleFactor, 6 * scaleFactor, 0.2]} />
        <meshStandardMaterial color="#1e90ff" opacity={0.8} transparent />
      </mesh>
      {/* Form as HTML Overlay */}
      <Html center>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 text-black">
          <input
            type="text"
            name="name" // Must match template variable
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 rounded"
            required
          />
          <input
            type="email"
            name="email" // Must match template variable
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-2 rounded"
            required
          />
          <textarea
            name="message" // Must match template variable
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
      {/* Success Message */}
      {launched && (
        <Text position={[0, 4 * scaleFactor, 0.5]} fontSize={0.5 * scaleFactor} color="white">
          Message Launched Successfully!
        </Text>
      )}
    </group>
  );
}

// Message Orb Component (unchanged)
function MessageOrb({ active, position }) {
  const orbRef = useRef();
  useFrame((state) => {
    if (orbRef.current && active) {
      orbRef.current.position.z += 0.5; // Fly away
      if (orbRef.current.position.z > 20) orbRef.current.visible = false; // Hide when far
    }
  });

  return (
    <mesh ref={orbRef} position={position} visible={active}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={1} />
    </mesh>
  );
}

export default function Contact() {
  const [messageLaunched, setMessageLaunched] = useState(false);

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