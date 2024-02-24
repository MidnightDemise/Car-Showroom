import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { applyProps } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from 'three'
import carVertex from "../CarShader/CarCoverVertex";
import carFragment from "../CarShader/CarCoverFragment";

export default function LamboCover(props)
{
    const {scene , nodes , materials} = useGLTF("FeaturedCars/Lambo/scene.gltf");

    
    const [nodeColor, setNodeColor] = useState(new THREE.Vector4( 0, 0  , 0 , 1));


        const uniforms = useMemo(() => ({
          _time: { value: 0 },
          colorForShader: { value: nodeColor }, // Comma added here

      }), [nodeColor]);

      useFrame((state) => {
          const { clock } = state;
          uniforms._time.value = clock.getElapsedTime();


          
      });


    useEffect(() => {
        Object.values(nodes).forEach((node) => {
            if(node.isMesh)
            {
                node.castShadow = true;
                node.receiveShadow = true;
            }
            
           
            const customShader = new THREE.ShaderMaterial({
              uniforms: uniforms,
              vertexShader: carVertex,
              fragmentShader: carFragment,

              transparent: true
              
              
            })
            

            node.material = customShader;
        })

        applyProps(materials.Carosserie , {color: "#000000" , emissive: "#000000" , envMapIntensity : 10 , emissiveIntensity: 5})
        // applyProps(materials.Tire , {color: "#000000" , emissive: "#000000" , envMapIntensity : 10 , emissiveIntensity: 5})
    })
    return (
        <>
            <primitive object={scene} {...props}/>
        </>
    )
}


