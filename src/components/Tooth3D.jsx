import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useRef } from 'react'

function Tooth() {
  const g = useRef(), ring = useRef()
  useFrame((s, dt) => {
    g.current.rotation.y += (s.pointer.x * 0.9 - g.current.rotation.y) * Math.min(1, dt * 3)
    g.current.rotation.x += (-s.pointer.y * 0.35 - g.current.rotation.x) * Math.min(1, dt * 3)
    ring.current.rotation.z += dt * 0.35
  })
  const mat = <meshPhysicalMaterial color="#ffffff" roughness={0.18} clearcoat={1} clearcoatRoughness={0.1} sheen={1} sheenColor="#bfeaf0" />
  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
      <group ref={g} scale={1.05}>
        <mesh position={[0, 0.5, 0]} scale={[1.2, 1, 0.9]}><sphereGeometry args={[1, 64, 64]} />{mat}</mesh>
        <mesh position={[-0.5, 1.25, 0]} scale={[0.6, 0.5, 0.55]}><sphereGeometry args={[1, 48, 48]} />{mat}</mesh>
        <mesh position={[0.5, 1.25, 0]} scale={[0.6, 0.5, 0.55]}><sphereGeometry args={[1, 48, 48]} />{mat}</mesh>
        <mesh position={[-0.5, -0.95, 0]} rotation={[Math.PI, 0, 0.08]}><coneGeometry args={[0.42, 1.7, 40]} />{mat}</mesh>
        <mesh position={[0.5, -0.95, 0]} rotation={[Math.PI, 0, -0.08]}><coneGeometry args={[0.42, 1.7, 40]} />{mat}</mesh>
        <group ref={ring} rotation={[1.25, 0.2, 0]}>
          <mesh><torusGeometry args={[2, 0.035, 16, 120]} /><meshStandardMaterial color="#12a8b8" emissive="#12a8b8" emissiveIntensity={0.6} /></mesh>
          <mesh position={[2, 0, 0]}><sphereGeometry args={[0.1, 24, 24]} /><meshStandardMaterial color="#fff" emissive="#7fe3ee" emissiveIntensity={1.2} /></mesh>
        </group>
      </group>
    </Float>
  )
}

export default function Tooth3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-4, -1, 3]} intensity={30} color="#12a8b8" />
      <pointLight position={[4, 2, -2]} intensity={25} color="#0b4a9c" />
      <Tooth />
      <Sparkles count={36} scale={[6, 5, 3]} size={3} speed={0.4} color="#7fe3ee" />
    </Canvas>
  )
}
