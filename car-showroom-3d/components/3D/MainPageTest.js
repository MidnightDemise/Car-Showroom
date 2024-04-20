
import React, {  useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { data } from './Brain/data'
import { Float, Scroll, ScrollControls, Sparkles, shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { Color, Depth, LayerMaterial } from 'lamina';

const PATHS = data.economics[0].paths;
const randomRange = (min , max) => Math.random() * (max - min) + min; 


let curves = []


for(let i = 0 ; i < 100 ; i++)
  {
    let points = []
    let length = randomRange(0.5 , 1);

    for(let j = 0 ; j < 100 ; j++)
    {
      points.push(new THREE.Vector3().setFromSphericalCoords( 1,
       Math.PI -  (j / 100) * Math.PI * length ,
        (i / 100 ) * Math.PI * 2))

    }

    let tempCurve = new THREE.CatmullRomCurve3(points);
    curves.push(tempCurve);
  }



function Tubes()
{
  return (
    <>
      {curves.map((curve , index)=> (
        <Tube curve={curve} key={index}/>
      ))}
    </>
  )
}

function Tube({curve}){

  const brainMat = useRef();


  const handleMouseMove = (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    brainMat.current.uniforms.u_mouse.value.x = mouseX;
    brainMat.current.uniforms.u_mouse.value.y = mouseY;

  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(({clock}) => {
    brainMat.current.uniforms.time.value = clock.getElapsedTime();
  })
  const BrainMaterial = shaderMaterial(
    
    { time: 0, color: new THREE.Color(0.1, 0.3, 0.6) , u_mouse: new THREE.Vector2() },
    // vertex shader
    /*glsl*/`
      varying vec2 vUv;
      uniform vec2 u_mouse;
      uniform float time;
      varying vec3 vNormal;
      varying float vProgress; 
      void main() {
        vUv = uv;

        vNormal = normal;


        vProgress = smoothstep(-1.,1.,sin(vUv.x*8. + time));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position  * cos((vProgress * 3.0 + time)) * 2.0, 1.0);
      }
    `,
    // fragment shader
    /*glsl*/`
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
      
        gl_FragColor.rgba = vec4(color , vProgress);
      }
    `
  )
  extend({ BrainMaterial })


  return <>
  
    <mesh>
      <tubeGeometry args={[curve , 64 , 0.01 , 3 , false]}/>
      <brainMaterial wireframe={false}  ref={brainMat} side={THREE.DoubleSide} transparent={true} depthWrite={false} depthTest={false} blending={THREE.AdditiveBlending}/>
    </mesh>
    
   

  </>
}

const MainPage = () => {





  return (
    <>
    
      <Lightformers/>
       <Tubes/>
       <Sparkles color={new THREE.Color(1,1,1)} size={3} scale={new THREE.Vector3(5,5,5)} />
      </>
  )
}

  
    


function Lightformers() {
    
  return (
    <>
      <Float>
      <mesh scale={100}>
        <sphereGeometry args={[1, 32, 32]} />
        <LayerMaterial refractionRatio={5} reflectivity={5} emissiveIntensity={1} lightMapIntensity={1} side={THREE.BackSide}>
          <Depth colorA="black" colorB="#0000AA" alpha={1.} mode="additive" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
      </Float>
      
    </>
  )
}
  
    
export default MainPage