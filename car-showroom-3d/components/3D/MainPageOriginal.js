import { CubeCamera, Environment, Float, Lightformer, MeshReflectorMaterial, OrbitControls, PivotControls, PointMaterial, TransformControls, useFBX, useGLTF, useTexture } from '@react-three/drei'
import { applyProps, useFrame, useLoader } from '@react-three/fiber';
import { Color, Depth, LayerMaterial } from 'lamina';
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import {BlendFunction} from 'postprocessing'


const MainPageOriginal = () => {

  const positionBackground = useRef();

 

  return (
    <>

        <ambientLight/>
        <directionalLight/>
        
        <FordGT  position={[0,-1,7]} rotation={[0,  Math.PI  ,0]}/>
        {/* <Ground/> */}
        
        <BackGround ref={positionBackground} position ={[0 , -0.3 , 7]}  rotation={[0 , Math.PI  / 2  , 0]}/>
        <Environment resolution={256} background blur={1} frames={Infinity}>
            <LightFormers/>
           
        </Environment> 
    </>
  )
}


function Ground()
{

  // const [diffuse, displacement] = useLoader(THREE.TextureLoader, [
  //   "GroundTextures/RubberTiles/textures/dif.jpg",
  //   "GroundTextures/RubberTiles/textures/disp.png",
  // ]);

  const [diffuse , displacement , roughness , normal , arm ] = useTexture([
    "GroundTextures/RubberTiles/textures/dif.jpg",
    "GroundTextures/RubberTiles/textures/disp.png",
    "GroundTextures/RubberTiles/textures/roughness.png",
    "GroundTextures/RubberTiles/textures/normal.png",
    "GroundTextures/RubberTiles/textures/ARM.png"
  
  ]
  
  )


  useEffect(() => {
    [diffuse , displacement, roughness , normal , arm].forEach((t) =>{

      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.offset.set(0,0);
    })
  })
    return (
      <>
        

        <mesh rotation={[-Math.PI / 2, 0 ,0]} position={[-1,-1.1,5]}>
          <planeGeometry  args={[10,10]} />
          <meshStandardMaterial
          map={diffuse}
          normalMap={normal}
          roughnessMap={roughness}
          metalness={0}

          
          displacementMap={displacement} // Apply displacement map
          displacementScale={0.1} // Adjust displacement scale as needed
          normalScale={10}
          aoMap={arm}
            
        
         
          />
        </mesh>
      
      </>
    )
}



function BackGround(props)
{
  
  
  const warehouse = useGLTF("MainPageWarehouse/Warehouse2/scene.gltf")


  
  return (
    <>
    <PivotControls >
    <primitive object= {warehouse.scene} {...props}/>
    </PivotControls>
    
      
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
        <group ref={group}>
            {positions.map((x, i) => (
              <Lightformer color={"white"} key={i} form="circle" intensity={0.4} rotation={[Math.PI / 2, Math.PI / 4, 0]} position={[-6, 3, i * 4]} scale={[3, 1, 1]} />
            ))}
        </group>
        
        

       
            <Lightformer rotation={[0,  Math.PI / 2 ,0]} intensity={0.8} color={"white"} form={"circle"} position={[-1,0,19]} scale={[20,1,1]}/>
            
       

        <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth colorA="red" colorB="blue"  alpha={0.8} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>

        


        
        </>
    )
}



function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}



function FordGT(props) {
    const { scene, nodes, materials } = useGLTF('MainPageCar/FORD GT/scene.gltf')
    

    useLayoutEffect(() => {
      Object.values(nodes).forEach((node) => node.isMesh && (node.receiveShadow = node.castShadow = true))
      applyProps(materials.Body , { envMapIntensity : 5  , color: "#000000"})
    applyProps(materials.Black_Metal, { envMapIntensity : 1 , emissiveIntensity: 1 , color: "#EEEEEE" })
    applyProps(materials.Metal_Ring , { envMapIntensity : 1 , emissiveIntensity : 1 , color:"#FFFFFF"})
    
  }, [nodes, materials])


    return <primitive 
    
    object={scene} {...props} />
  }
export default MainPageOriginal