import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from 'three'
import vertexShader from "../GroundShader/smokeVertex";
import fragmentShader from "../GroundShader/smokeFragment";
export default function MovingShader() {

    
    const uniforms = useMemo(() => ({
        _time: { value: 0 },
        speedofoffset: { value: 0.08 },
        nodeUniform0: { value: new THREE.TextureLoader().load("https://static.nodetoy.co/static/texture_library/noise/512/Noise_002.jpg")},
        smokeColor: { value: { x: 0 , y: 0, z: 1, w: 0 } }, // Comma added here
    }), []);

    useFrame((state) => {
        const { clock } = state;
        uniforms._time.value = clock.getElapsedTime();
    });

      
      
    return (
        <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms} // Pass time as uniform
            
            transparent={true} // Enable transparency
           
        />
    );
}