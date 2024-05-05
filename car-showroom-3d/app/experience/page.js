'use client'


import FeaturedCarsPage from '@/components/3D/FeaturedCarsPage'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import React, { Suspense } from 'react'

const experiencepage = () => {
  return (
    <>
    
    <Canvas flat linear style={{width: "100vw", height: "100vh"}}>
        <color args={[ 0 , 0, 0]}  attach={"background"}/>
        <ambientLight intensity={15}/>
        <directionalLight/>
        


      
          <OrbitControls camera={undefined} enablePan={false} enableZoom={false} />  
        
        

        <Suspense>
         <Physics debug>
          
            <FeaturedCarsPage/>  
        

        </Physics>  


        <OrbitControls autoRotate maxPolarAngle={45} autoRotateSpeed={3} />
        <PerspectiveCamera makeDefault position={[0,0,2.5]} rotation={[0,Math.PI - Math.PI/4 , 0]} fov={45} far={1000} near={1}/>

          
        </Suspense> 



      </Canvas>
    </>
  )
}

export default experiencepage