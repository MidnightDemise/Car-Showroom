import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { applyProps } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three'
import carVertex from "../CarShader/CarCoverVertex";
import carFragment from "../CarShader/CarCoverFragment";
import dissolveVertex from "../CarShader/CarCoverDissolveVertex";
import dissolveFragment from "../CarShader/CarCoverDissolveFragment";








export default function LamboCover(props) {
    const { scene, nodes, materials } = useGLTF("FeaturedCars/goblin/scene.gltf");
    const lambo = useRef();
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

        Object.values(nodes).forEach((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;

                const hasPositiveR3f = node.getWorldPosition(new THREE.Vector3(0, 0, 0)).z < -10;

                if (hasPositiveR3f && originalMaterials[node.uuid] != null) {
                    console.log("hi")
                    const customShader = new THREE.ShaderMaterial({
                        uniforms: uniforms,
                        vertexShader: dissolveVertex,
                        fragmentShader: dissolveFragment,
                        transparent: true
                    });
                    // Store original material before applying custom shader
                    if (!originalMaterials[node.uuid]) {
                        originalMaterials[node.uuid] = node.material;
                    }
                    node.material = customShader;
                }
                else
                {
                    if (node.isMesh && originalMaterials[node.uuid]) {
                        node.material = originalMaterials[node.uuid];
                    }
                }
            }
        });

        if (lambo.current.position.z > -22) lambo.current.position.z -= 0.1;
    });

    useEffect(() => {
        Object.values(nodes).forEach((node) => {
           
            originalMaterials[node.uuid] = node.material;
        })
        // applyProps(materials.Carosserie, { color: "#000000", emissive: "#000000", envMapIntensity: 10, emissiveIntensity: 5 });
        // applyProps(materials.Tire, { color: "#000000", emissive: "#000000", envMapIntensity: 10, emissiveIntensity: 5 });
    });

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
            <primitive ref={lambo}  object={scene} {...props} />
        </>
    );
}