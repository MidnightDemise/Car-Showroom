'use client'

import MainPageHtml from '@/components/2D/MainPageHtml'
import MainPage from '@/components/3D/MainPageTest'
import ShaderPlayground from '@/components/GLSL/ShaderPlayground'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import * as THREE from 'three'
const HomePage = () => {

 


  const { data: session, status } = useSession(); // Destructure session from data
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // If authenticated, do nothing
      return;
    } else if (status === "loading") {
      // If session loading, wait
      return;
    } else {
      // If not authenticated, redirect to login page
      console.log("User not authenticated. Redirecting...");
      router.push("/");
    }
  }, [status, router]);

  return (
    <>
         <Canvas flat linear style={{width: "100vw", height: "100vh"}}>
        <color args={[ 0 , 0, 0]}  attach={"background"}/>
        <ambientLight intensity={15}/>
        <directionalLight/>
        


      
          <OrbitControls camera={undefined} enablePan={false} enableZoom={false} />  
        
        <ShaderPlayground/>

        <Suspense>
         <Physics debug>
          
            {/* <FeaturedCarsPage/>  */}
        

        </Physics>  


        <OrbitControls autoRotate maxPolarAngle={45} autoRotateSpeed={3} />
        <PerspectiveCamera makeDefault position={[0,0,2.5]} rotation={[0,Math.PI - Math.PI/4 , 0]} fov={45} far={1000} near={1}/>

          
        </Suspense> 


        {/* <MainPage/> */}

      </Canvas>

      {/* <MainPageHtml/> */}

    </>
  )
}

export default HomePage