'use client'

import MainPageOriginal from "@/components/MainPageOriginal";
import MainPage from "@/components/MainPageTest";
import SmokeTest from "@/components/SmokeTest";
import { Float, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from 'three'

export default function Home() {
  const [particles , setParticles] = useState([]);


  useEffect(() => {
    // Create a particle system
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x888888,
      size: 0.1,
    });
    const positions = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 10 - 5;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 10 - 5;
      positions.push(x, y, z);
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    const particleSystem = new THREE.Points(
      particleGeometry,
      particleMaterial
    );
    setParticles(particleSystem);
  }, []);



  return (
   <>
      <Canvas flat linear style={{width: "100vw", height: "100vh"}}>
        <color args={[1,1,1]}  attach={"background"}/>
        
        {/*         
        <Float floatingRange={0.1} rotationIntensity={0.2} floatIntensity={0.3}>
          <PerspectiveCamera makeDefault position={[4,0,4]} rotation={[0,Math.PI - Math.PI/4 , 0]} fov={45} far={1000} near={1}/>
        </Float> */}
        <OrbitControls/>
        <ambientLight/>
        <directionalLight/>
        <mesh position={[0,-2,0]} rotation={[-Math.PI / 2 , 0, 0]}>
          <planeGeometry args={[30,30]}/>
          <meshBasicMaterial color={"black"}/>
        </mesh>
        


      </Canvas>
    
   </>
  )
}
