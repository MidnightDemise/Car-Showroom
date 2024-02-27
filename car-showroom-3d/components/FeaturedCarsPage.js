
import { Box, CubeCamera, Environment, Float, Lightformer, OrbitControls, PerspectiveCamera, Sphere, useGLTF } from '@react-three/drei'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import * as LAMINA from 'lamina'
import { Model } from './GltfConversions/Scene';
import MovingShader from './FeaturedCarsPageComponents/MovingShader';
import Portal from './FeaturedCarsPageComponents/Portal';
import Hologram from './FeaturedCarsPageComponents/Hologram';

import { Driver } from './Driver';
import { WorkingDriver } from './Workingdriver';
import { WorkingDriverCopy } from '@/public/Workingdriver2';
import { DriverTexting } from './Drivertext';
import Car from './FeaturedCarsPageComponents/LamboCover';
import { TestGLTF } from './FeaturedCarsPageComponents/Scene';





function Showroom(props)
{
    return (
        <>
             <Model {...props}/>
        </>
    )
}




const FeaturedCarsPage = () => {
  
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const carNames = ["Challenger", "Lambo", "RocketLeague"];
  const [selectedCar, setSelectedCar] = useState(null);

  const handleNextCar = () => {
    setSelectedCarIndex((prevIndex) => (prevIndex + 1) % carNames.length);
  };

  const handleCarSelection = (carIndex) => {
    setSelectedCar(carIndex);

  };
  

  const cars = [
    //   { carModel: "Challenger", rotation: [0, Math.PI, 0], position: [0, 1, -8], scale: 0.03, name: "Challenger", isSelected: selectedCar === "Challenger" },
    //  { carModel: "Lambo", rotation: [0, 0, 0], position: [0, 1, -22], scale: 5, name: "Lambo", isSelected: selectedCar === "Lambo" },
   // { carModel: "ETron", rotation: [0, 0 , 0], position: [0, 1, -22], scale: 0.4, name: "ETron", isSelected: selectedCar === "ETron" },
  //  { carModel: "Bugatti", rotation: [0, Math.PI, 0], position: [0, 1, -25], scale: 3.5, name: "Bugatti", isSelected: selectedCar === "Bugatti" },
  // { carModel: "test", rotation: [0, 0, 0], position: [0, 3.2, -25], scale: 3, name: "test", isSelected: selectedCar === "test" }
  ];
  return (
    <>
        {/* <mesh position={[0,5,-25]}>
          <boxGeometry args={[10,10,15]}/>
          <shaderMaterial
          uniforms={uniforms}
          vertexShader={intersectionVertex}
          fragmentShader={intersectionFragment}
          transparent
          />

        </mesh> */}
        

          <mesh scale={3}  position={[1,0,1]} rotation={[-Math.PI /2 , 0 , 0]} >
            <planeGeometry args={[30,30]}/>
            <MovingShader/>
          </mesh>

          
            <Showroom />
              
              <WorkingDriver scale={3.5} rotation={[0 , Math.PI / 2 , 0]} position={[12,0,5]}/>
              <WorkingDriverCopy scale={3.5} rotation={[0 , -Math.PI / 2 , 0]} position={[-12,0,5]}/>
              <DriverTexting scale={3.5} rotation={[0 , -Math.PI / 2 , 0]} position={[6,1,0]}/>
              
              
              {/* <BugattiGLTF scale={3.5} position={[0,1,0]} rotation={[Math.PI/2,Math.PI ,-Math.PI]}/> */}
              {/* <LamboGLTF position={[0,1,0]} scale={5}/> */}
              {/* <Lambo  position= {[0,1,0]} scale={5} />  */}
               {cars.map((car, index) => (
                 <Car
                   key={index}
                carModel={car.carModel}
                   rotation={car.rotation}
                   position={car.position}
                   scale={car.scale}
                   name={car.name}
                   onClick={() => handleCarSelection(car.name)}
                   isSelected={car.isSelected}
                 />
               ))}  
              {/* <OpenText scale={5} position={[0,2,0]}/> */}
             





            <Hologram scale={2} position={[15,5,5]}/>
            <Hologram scale={2} position={[-15,5,5]}/>



            <Portal rotation={[0  , 0 , 0]} position={[0,5,-12.5]}/>

            
            <Environment background blur={10} resolution={256} frames={Infinity}>
                <Lightformers/>
            </Environment>


{/* 
            <EffectComposer>
              <Bloom/>
            </EffectComposer>
                 */}
         
        
    </>
  )
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    
    return (
      <>
        {/* Ceiling */}
        
        {/* Sides */}
       
        {/* Accent (red) */}
        
        
        {/* Background */}
        <Float>
        <mesh scale={100}>
          <sphereGeometry args={[1, 32, 32]} />
          <LAMINA.LayerMaterial refractionRatio={5} reflectivity={5} emissiveIntensity={1} lightMapIntensity={50} side={THREE.BackSide}>
            <LAMINA.Color color="#444" alpha={.5} mode="additive" />
            <LAMINA.Depth colorA="white" colorB="cyan" alpha={.5} mode="subtract" near={0} far={300} origin={[100, 100, 100]} />
          </LAMINA.LayerMaterial>
        </mesh>
        </Float>
        
      </>
    )
  }
    

export default FeaturedCarsPage