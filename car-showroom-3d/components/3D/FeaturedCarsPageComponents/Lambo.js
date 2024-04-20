import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { applyProps } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three'
import vertexShader from "../GroundShader/smokeVertex";
import opacityVertex from "../CarShader/CarOpacityVertex";
import fragmentShader from "../GroundShader/smokeFragment";
import opacityFragment from "../CarShader/CarOpacityFragment";




export default function Lambo(props)
{
    const {scene , nodes , materials} = useGLTF("FeaturedCars/Lambo/scene.gltf");

    const lambo = useRef();
    const [nodeColor, setNodeColor] = useState(new THREE.Vector4(1 ,1 , 1, 1));
   
    
        const uniforms = useMemo(() => ({
          _time: { value: 0 },
          colorForShader: { value: nodeColor }, // Comma added here

      }), [nodeColor]);

      useFrame((state) => {
          const { clock } = state;
          uniforms._time.value = clock.getElapsedTime();
    
          if(lambo.current.position.z > -22) 
          {
            lambo.current.position.z -= 0.1;

          }
          else
          {            console.log("Applying shader to all nodes.");

               
          }




          
      });


    useEffect(() => {
        
        applyProps(materials.Carosserie , {color: "#000000" , emissive: "#000000" , envMapIntensity : 10 , emissiveIntensity: 5})
         applyProps(materials.Tire , {color: "#000000" , emissive: "#000000" , envMapIntensity : 10 , emissiveIntensity: 5})
    })
    return (
        <>
            <primitive ref={lambo}  object={scene.clone} {...props}/>
        </>
    )
}
