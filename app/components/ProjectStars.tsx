import { Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import projects from "../data/Projects.json";

// Generate non-overlapping positions
const generatePositions = (
    count: number,
    minDistance: number = 6,
    bounds: { x: number; y: number; z: number } = { x: 16, y: 8, z: 16 }
): THREE.Vector3[] => {

    const positions: THREE.Vector3[] = [];
    const attempts = 100;

    for (let i = 0; i < count; i++) {
        let valid = false;
        let attempt = 0;
        let newPos: THREE.Vector3 = new THREE.Vector3(); // ✅ initialize with a default

        while (!valid && attempt < attempts) {
            newPos = new THREE.Vector3(
                (Math.random() - 0.5) * bounds.x,
                (Math.random() - 0.5) * bounds.y + 5,
                (Math.random() - 0.5) * bounds.z
            );
            valid = positions.every((pos) => pos.distanceTo(newPos) >= minDistance);
            attempt++;
        }

        if (valid) {
            positions.push(newPos);
        } else {
            const lastPos = positions[positions.length - 1] || new THREE.Vector3(0, 5, 0);
            newPos = lastPos.clone().add(
                new THREE.Vector3(
                    (Math.random() - 0.5) * minDistance,
                    (Math.random() - 0.5) * minDistance * 0.5,
                    (Math.random() - 0.5) * minDistance
                )
            );
            positions.push(newPos);
        }
    }

    return positions;
};

type Project = {
    name: string;
    description: string;
    link: string;
    tech: string[];
};

type StarProps = {
    position: THREE.Vector3;
    project: Project; // ❗ Ideally you should replace `any` with the correct project type later
    onClick: (project: Project) => void;
};

const Star = ({ position, project, onClick }: StarProps) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);
    const [sparkle, setSparkle] = useState(0.8); // Base emissive intensity

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (meshRef.current && materialRef.current) {
            // Floating motion
            meshRef.current.position.y = position.y + Math.sin(t + position.x) * 0.2;

            // Pulsing scale
            const scale = 0.3 + Math.sin(t * 2 + position.z) * 0.05;
            meshRef.current.scale.set(scale, scale, scale);

            // Subtle rotation
            meshRef.current.rotation.y += 0.002;

            // Brighter glitter: Random sparkle every ~0.3-1.5 seconds
            if (Math.random() < 0.03 && !hovered) {
                setSparkle(6 + Math.random() * 4); // Spike to 6-10 intensity
                materialRef.current.emissive.set("cyan"); // Shift to cyan
                setTimeout(() => {
                    setSparkle(0.8);
                    if (materialRef.current) {
                        materialRef.current.emissive.set("blue");
                    }
                    // Reset to blue
                }, 400); // Longer duration
            }

            materialRef.current.emissiveIntensity = hovered ? 2 : sparkle;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={[position.x, position.y, position.z]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => onClick(project)}
        >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
                ref={materialRef}
                color={hovered ? "cyan" : "white"}
                emissive={hovered ? "cyan" : "blue"}
                emissiveIntensity={hovered ? 2 : 0.8}
            />
            {hovered && (
                <Html>
                    <div className="bg-black text-white p-1 text-xs rounded-md">{project.name}</div>
                </Html>
            )}
        </mesh>
    );
};
type InterstellarLineProps = {
    start: THREE.Vector3;
    end: THREE.Vector3;
    index: number;
};


const InterstellarLine = ({ start, end, index }: InterstellarLineProps) => {
    const lineRef = useRef<THREE.Line>(null);

    useFrame(({ clock }) => {
        if (lineRef.current && (lineRef.current.material as THREE.Material)) {
            (lineRef.current.material as THREE.Material).opacity =
                0.3 + Math.sin(clock.getElapsedTime() + index) * 0.2;
        }
    });

    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const offset = 1.2;
    const startOffset = start.clone().add(direction.clone().multiplyScalar(offset));
    const endOffset = end.clone().add(direction.clone().multiplyScalar(-offset));

    return (
        <Line
            ref={lineRef}
            points={[startOffset, endOffset]}
            color="aqua"
            opacity={0.5}
            lineWidth={1}
            transparent
            dashSize={0.5}
            gapSize={0.3}
        />
    );
};
export default function ProjectStars({ onSelect }: { onSelect: (project: Project) => void }) {
    const positions = useMemo(() => generatePositions(projects.length), []);

    return (
        <>
            {/* Stars */}
            {projects.map((project, i) => (
                <Star key={i} position={positions[i]} project={project} onClick={onSelect} />
            ))}

            {/* Interstellar Lines */}
            {positions.map((start, i) => {
                const lines = [];
                for (let j = i + 1; j < positions.length; j++) {
                    const end = positions[j];
                    const distance = start.distanceTo(end);
                    if (distance < 6) {
                        lines.push(
                            <InterstellarLine key={`${i}-${j}`} start={start} end={end} index={i + j} />
                        );
                    }
                }
                return lines;
            })}
        </>
    );
}