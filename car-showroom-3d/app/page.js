'use client'

import MainPageOriginal from "@/components/MainPageOriginal";
import MainPage from "@/components/MainPageTest";
import SmokeTest from "@/components/SmokeTest";
import { NodeToyMaterial, NodeToyTick } from "@nodetoy/react-nodetoy";
import { Float, OrbitControls, PerspectiveCamera, TransformControls, useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import vertexShader from "@/components/smokeVertex";
import fragmentShader from "@/components/smokeFragment";






export default function Home() {
  const crateGroup = useRef();
  const scene = useFBX("Arm Stretching.fbx").animations;

  console.log(scene);


  return (
   <>
      <Canvas flat linear style={{width: "100vw", height: "100vh"}}>
        <color args={[0,0,0]}  attach={"background"}/>
        <ambientLight />
        <directionalLight/>
        
        
           
         {/* <Float floatingRange={0.1} rotationIntensity={0.2} floatIntensity={0.3}>
          <PerspectiveCamera makeDefault position={[4,0,4]} rotation={[0,Math.PI - Math.PI/4 , 0]} fov={45} far={1000} near={1}/>
        </Float>   */}
    
      {/* <MainPageOriginal/> */}
       
        


      </Canvas>
    
   </>
  )
}
   {/* <OrbitControls makeDefault/>   */}
       {/* <ambientLight/>
        <directionalLight/>*/}
        {/* <NodeToyTick/> */}
        
        {/* 
        <TransformControls>
        <mesh>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <NodeToyMaterial  parameters={{
                lights: false, // Disable lights affecting the material
                envMap: false, // Disable environment map affecting the material
              }} url={"https://draft.nodetoy.co/OUsvR8blhs7VwoIX"} />
        </mesh> 
        </TransformControls>
        */
      }