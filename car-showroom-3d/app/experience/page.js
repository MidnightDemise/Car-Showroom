'use client'


import FeaturedCarsHtml from '@/components/2D/FeaturedCarsHtml'
import MainPageHtml from '@/components/2D/MainPageHtml'
import FeaturedCarsPage from '@/components/3D/FeaturedCarsPage'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import React, { Suspense, useState } from 'react'



const nextCarButton = {
  position: 'absolute',
  top: '50%',
  left: '5%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  width: '25%',
  
  fontSize: '24px',
  color: '#FFFFFF',
};



const experiencepage = () => {

  const [ carIndex , setCarIndex] = useState(0);


  const handleCarSelection = () => {
    setCarIndex((carIndex + 1) % 3);
  }
  return (
    <>
    
    <Canvas flat linear style={{width: "100vw", height: "100vh"}}>
        <color args={[ 0 , 0, 0]}  attach={"background"}/>
        <ambientLight intensity={15}/>
        <directionalLight/>
        


      
          <OrbitControls camera={undefined} enablePan={false} enableZoom={false} />  
        
        

        <Suspense>
         <Physics>
          
            <FeaturedCarsPage carIndex={carIndex} />  
        

        </Physics>  


        <OrbitControls autoRotate maxPolarAngle={45} autoRotateSpeed={3} />
        <PerspectiveCamera makeDefault position={[0,15,20]} rotation={[0,Math.PI - Math.PI/4 , 0]} fov={45} far={1000} near={1}/>

          
        </Suspense> 




      </Canvas>

      



      <FeaturedCarsHtml/>

      <div style={nextCarButton}>
        <button onClick={() => handleCarSelection()} className='bg-black h-full w-50  px-4 py-2 mx-2 rounded-md  text-center '>
         Next
        </button>
  
        </div>
        
    </>
  )
}

export default experiencepage