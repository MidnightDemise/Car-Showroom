import { Environment, Float, Lightformer, useGLTF } from '@react-three/drei'
import { applyProps, useFrame } from '@react-three/fiber';
import React, { useLayoutEffect, useRef } from 'react'

const MainPageOriginal = () => {
  return (
    <>

        <ambientLight/>
        <directionalLight/>
        <FordGT />
        <Environment resolution={256} background blur={1} frames={Infinity}>
            <LightFormers/>
        </Environment>
    </>
  )
}


function LightFormers({positions = [2,0,2,0,2,0,2,0]})
{
    const group = useRef();   

    useFrame((state , delta) => {
        group.current.position.z += delta * 10;

        if(group.current.position.z > 20)
        {
            group.current.position.z = -60;
        }
    })
    return (
        <>
        <Lightformer intensity={0.1} position={[0 , 9 , 0]} rotation={[Math.PI /2 , 0 , 0]} color={"white"}/>
        <group ref={group}>
            {positions.map((x, i) => (
              <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
            ))}
        </group>
        
        <Lightformer  color={"blue"} intensity={2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
        <Lightformer color={"red"} intensity={2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        <Lightformer  rotation={[-Math.PI / 2 , 0 ,0]} position={[0,-5,0]}/>

        <Float>
            <Lightformer color={"red"} form={"circle"} position={[-4,0,0]} scale={[3,1,1]}/>
        </Float>
        </>
    )
}



function FordGT(props) {
    const { scene, nodes, materials } = useGLTF('MainPageCar/FORD GT/scene.gltf')
    

    useLayoutEffect(() => {
      Object.values(nodes).forEach((node) => node.isMesh && (node.receiveShadow = node.castShadow = true))
        
  }, [nodes, materials])


    return <primitive 
    
    object={scene} {...props} />
  }
export default MainPageOriginal