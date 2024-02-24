
import { Box, CubeCamera, Environment, Float, Lightformer, OrbitControls, PerspectiveCamera, Sphere, useGLTF } from '@react-three/drei'
import { applyProps, useFrame } from '@react-three/fiber';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import * as LAMINA from 'lamina'
import vertexShader from './GroundShader/smokeVertex';
import fragmentShader from './GroundShader/smokeFragment';
import carVertex from './CarShader/CarCoverVertex';
import carFragment from './CarShader/CarCoverFragment';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Model } from './GltfConversions/Scene';
import hologramFragment from './hologramShader/hologramFragment';
import hologramVertex from './hologramShader/hologramVertex';
import portalVertex from './PortalShader/portalVertex';
import portalFragment from './PortalShader/portalFragment';
import { CuboidCollider, RigidBody } from '@react-three/rapier';


function MovingShader() {

    
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




function Lambo1(props)
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





function Lambo(props)
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




function Showroom(props)
{
    return (
        <>
             <Model {...props}/>
        </>
    )
}


function Hologram(props)
{
  const uniforms = useMemo( () => ({
    _time: {value: 0},
    hologramColor: {value: {x: 0.027450980392156862 , y: 1 , z : 0.9921 , w : 1}}
    
  }),[])

  useFrame((state) => {
    uniforms._time.value = state.clock.getElapsedTime();
  })
  return (

    <>
      <mesh {...props}>
        <sphereGeometry args={[1,64,64]}/>
        <shaderMaterial 
        uniforms={uniforms}
        vertexShader={hologramVertex}
        fragmentShader={hologramFragment}
        transparent
        />
      </mesh>
    </>
  )
}



function Portal(props)
{
  const uniforms = useMemo(() => ({
    _time: {value: 0},
    strengthforemission: {value: 14.62},
    Float01: {value : 0.3}

  }),[])

  useFrame((state) => {
    uniforms._time.value = state.clock.getElapsedTime();
  })


  return (
  <>
    <mesh {...props}>
      <planeGeometry args={[7,7]}/>
      <shaderMaterial
      uniforms={uniforms}
      vertexShader={portalVertex}
      fragmentShader={portalFragment}
      transparent
      side={THREE.DoubleSide}
      
      />

    </mesh>
  </>
  )
}





const FeaturedCarsPage = () => {
  return (
    <>
        
        

          <mesh scale={3}  position={[1,0,1]} rotation={[-Math.PI /2 , 0 , 0]}>
            <planeGeometry args={[30,30]}/>
            <MovingShader/>
          </mesh>

          
            <Showroom />
              {/* <RigidBody type='fixed' >
                  <Box position={[0,5,0]} args={[10,1,10]}/>
              </RigidBody>


              <RigidBody>
                <Sphere position={[0,10,0]} args={[2,64,64]} />
              </RigidBody> */}

              <RigidBody colliders={false}>
                <CuboidCollider args={[4,2,9]} position={[0,10.2,2]}/>
              <Lambo position= {[0,8,2]} scale={5}/> 

                
              </RigidBody>





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
            <LAMINA.Depth colorA="blue" colorB="cyan" alpha={.5} mode="additive" near={0} far={300} origin={[100, 100, 100]} />
          </LAMINA.LayerMaterial>
        </mesh>
        </Float>
        
      </>
    )
  }
    

export default FeaturedCarsPage