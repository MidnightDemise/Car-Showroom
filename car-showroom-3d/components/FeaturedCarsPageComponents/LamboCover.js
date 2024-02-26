import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { applyProps } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three'
import carVertex from "../CarShader/CarCoverVertex";
import carFragment from "../CarShader/CarCoverFragment";
import dissolveVertex from "../CarShader/CarCoverDissolveVertex";
import dissolveFragment from "../CarShader/CarCoverDissolveFragment";








export default function Car(props) {
    const {carModel , isSelected} = props;
    const { scene, nodes, materials } = useGLTF(`FeaturedCars/${carModel}/scene.gltf`);
    const car = useRef();
    const [isClick, setIsClicked] = useState(false);
    const [nodeColor, setNodeColor] = useState(new THREE.Vector4(0, 0, 0, 1));
    const [originalMaterials, setOriginalMaterials] = useState({}); // Store original materials

    const click = () => {
        setIsClicked(true);
    }

    const uniforms = useMemo(() => ({
        _time: { value: 0 },
        colorForShader: { value: nodeColor },
    }), [nodeColor]);

    useFrame((state) => {
        const { clock } = state;
        uniforms._time.value = clock.getElapsedTime();

        const customShader = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: dissolveVertex,
            fragmentShader: dissolveFragment,
            transparent: true
        });


        Object.values(nodes).forEach((node) => {

            if(originalMaterials[node.uuid] != null)
            {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
        
                    const hasPositiveR3f = node.getWorldPosition(new THREE.Vector3(0, 0, 0)).z < -10;
        
                    if (hasPositiveR3f) {
                        node.material = customShader;
                    } else if (!hasPositiveR3f && originalMaterials[node.uuid]) {
                        node.material = originalMaterials[node.uuid];
                    }
                }
            }
           
        });
    

        if (isSelected && car.current.position.z < 0)
        {
            car.current.position.z += 0.1;
        }
        else if(!isSelected && car.current.position.z > -22)
        {
            car.current.position.z -= 0.1;
        }

    });
    
   
    useEffect(() => {
        // Store original materials
        Object.values(nodes).forEach((node) => {
            originalMaterials[node.uuid] = node.material;
        });

        Object.values(materials).forEach((material) => {
            console.log(material);

            material.envMapIntensity = 10;

        })
    }, []);

    // Revert shader to original material
    const revertShader = () => {
        setIsClicked(true);
        Object.values(nodes).forEach((node) => {
            if (node.isMesh && originalMaterials[node.uuid]) {
                node.material = originalMaterials[node.uuid];
            }
        });
    };

    return (
        <>
            <primitive ref={car}  object={scene} {...props} />
        </>
    );
}