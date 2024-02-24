import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { applyProps } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from 'three'




export default function Lambo(props)
{
    const {scene , nodes , materials} = useGLTF("FeaturedCars/Lambo/scene.gltf");

    const [nodeColor, setNodeColor] = useState(new THREE.Vector4(1 ,1 , 1, 1));

        

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
        })

        applyProps(materials.Carosserie , {color: "#000000" , emissive: "#000000" , envMapIntensity : 10 , emissiveIntensity: 5})
        // applyProps(materials.Tire , {color: "#000000" , emissive: "#000000" , envMapIntensity : 10 , emissiveIntensity: 5})
    })
    return (
        <>
            <primitive object={scene.clone()} {...props}/>
        </>
    )
}
