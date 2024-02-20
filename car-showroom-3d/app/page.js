'use client'

import MainPageOriginal from "@/components/MainPageOriginal";
import MainPage from "@/components/MainPageTest";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
   <>
      <Canvas flat linear style={{width: "100vw", height: "100vh"}}>
        <color args={[0,0,0]}  attach={"background"}/>
        <OrbitControls/>
        <PerspectiveCamera fov={45} far={1000} near={1}/>
        <ambientLight  intensity={0.4} />
        <MainPageOriginal/>  
      </Canvas>
    
   </>
  )
}
