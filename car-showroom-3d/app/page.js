'use client'

import MainPageOriginal from "@/components/MainPageOriginal";
import { Box, Environment, Float, OrbitControls, PerspectiveCamera, Sphere, TransformControls, useFBX } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import FeaturedCarsPage from "@/components/FeaturedCarsPage";
import { Suspense, useRef } from "react";
import { Physics } from "@react-three/rapier";
import Morphing from "@/components/test/Morphing";

export default function Home() {

  


  return (
   <>
      <Canvas flat linear style={{width: "100vw", height: "100vh"}}>
        <color args={[ 0 , 0, 0]}  attach={"background"}/>
        <ambientLight intensity={15}/>
        <directionalLight/>
        

      <PerspectiveCamera makeDefault position={[0, 11, 20]}/> 
         <OrbitControls autoRotate autoRotateSpeed={3} camera={undefined} enablePan={false} enableZoom={false} /> 
        
        <Morphing/>
















       <Suspense>
         <Physics debug>
          
        <FeaturedCarsPage/> 

        </Physics> 


    
{/*            
          <Float floatingRange={0.1} rotationIntensity={0.2} floatIntensity={0.3}>
          <PerspectiveCamera makeDefault position={[4,0,4]} rotation={[0,Math.PI - Math.PI/4 , 0]} fov={45} far={1000} near={1}/>
        </Float>    */}
    
      {/* <MainPageOriginal/>  */}
       </Suspense>

      </Canvas>
    
   </>
  )
}
  