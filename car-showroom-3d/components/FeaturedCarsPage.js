
import { Box, CubeCamera, Environment, Float, Lightformer, OrbitControls, PerspectiveCamera, Sphere, useGLTF } from '@react-three/drei'
import { applyProps, useFrame } from '@react-three/fiber';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import * as LAMINA from 'lamina'
import { Model } from './GltfConversions/Scene';
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import MovingShader from './FeaturedCarsPageComponents/MovingShader';
import Portal from './FeaturedCarsPageComponents/Portal';
import Hologram from './FeaturedCarsPageComponents/Hologram';
import Lambo from './FeaturedCarsPageComponents/Lambo';
import LamboCover from './FeaturedCarsPageComponents/LamboCover';
import intersectionVertex from './ReverseOpacityShader/intersectonVertex';
import fragmentShader from './GroundShader/smokeFragment';
import intersectionFragment from './ReverseOpacityShader/intersectionFragment';




function Showroom(props)
{
    return (
        <>
             <Model {...props}/>
        </>
    )
}






const FeaturedCarsPage = () => {
  

 

  const uniforms = useMemo(() => ({
    // _normalMatrix: {
    //   type: 'mat3',
    //   value: {
    //     elements: [1, 0, 0, 0, 1, 0, 0, 0, 1]
    //   }
    // },
    // _viewMatrix: {
    //   type: 'mat4',
    //   value: {
    //     elements: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    //   }
    // },
    _screenSize: {
      type: 'vec4',
      value: {
        x: 0,
        y: 0,
        z: 0,
        w: 0
      }
    }
  }), []);



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
             
              {/* <Lambo  position= {[0,1,0]} scale={5} />  */}
              <LamboCover position= {[0,1,0]} scale={5}/>    
              
             





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
          <sphereGeometry args={[1, 64, 64]} />
          <LAMINA.LayerMaterial refractionRatio={5} reflectivity={5} emissiveIntensity={1} lightMapIntensity={50} side={THREE.BackSide}>
            <LAMINA.Color color="#444" alpha={.5} mode="additive" />
            <LAMINA.Depth colorA="white" colorB="black" alpha={.5} mode="additive" near={0} far={300} origin={[100, 100, 100]} />
          </LAMINA.LayerMaterial>
        </mesh>
        </Float>
        
      </>
    )
  }
    

export default FeaturedCarsPage