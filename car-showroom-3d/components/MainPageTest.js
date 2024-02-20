import { AccumulativeShadows, ContactShadows, Environment, Float, Lightformer, PerformanceMonitor, RandomizedLight, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { applyProps } from '@react-three/fiber'
import * as LAMINA from 'lamina'
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
const MainPage = () => {
    const [degraded, degrade] = useState(false)

  return (
    <>
   {/* <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
      <ambientLight intensity={0.5} /> */}
      <Porsche scale={1.6} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / 5, 0]} />
      {/* <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
      </AccumulativeShadows> */}
      {/** PerfMon will detect performance issues */}
      <PerformanceMonitor onDecline={() => degrade(true)} />
      {/* Renders contents "live" into a HDRI environment (scene.environment). */}
      <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={1}>
        <Lightformers />
      </Environment>
   
      </>
  )
}

function Striplight(props) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}
function Porsche(props) {
    const { scene, nodes, materials } = useGLTF('MainPageCar/FORD GT/scene.gltf')
    
    console.log(materials);
    useLayoutEffect(() => {
      Object.values(nodes).forEach((node) => node.isMesh && (node.receiveShadow = node.castShadow = true))
    applyProps(materials.Body , { envMapIntensity : 5 , color: "#EEEEEE" })
    applyProps(materials.Black_Metal, { envMapIntensity : 5 , emissiveIntensity: 5 , color: "#EEEEEE" })
    applyProps(materials.Metal_Ring , { envMapIntensity : 5 , emissiveIntensity : 5 , color:"#FFFFFF"})
  }, [nodes, materials])


    return <primitive object={scene} {...props} />
  }
  
  function CameraRig({ v = new THREE.Vector3() }) {
    return useFrame((state) => {
      const t = state.clock.elapsedTime
      state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2), 0.05)
      state.camera.lookAt(0, 0, 0)
    })
  }
  
  function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    const group = useRef()
    useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
    return (
      <>
        {/* Ceiling */}
        <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
        <group rotation={[0, 0.5, 0]}>
          <group ref={group}>
            {positions.map((x, i) => (
              <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
            ))}
          </group>
        </group>
        {/* Sides */}
        <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
        <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
        <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        {/* Accent (red) */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
        </Float>
        
        {/* Background */}
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LAMINA.LayerMaterial side={THREE.BackSide}>
            <LAMINA.Color color="#444" alpha={1} mode="normal" />
            <LAMINA.Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
          </LAMINA.LayerMaterial>
        </mesh>
      </>
    )
  }
    
export default MainPage