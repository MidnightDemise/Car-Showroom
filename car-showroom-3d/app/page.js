

// import MainPageOriginal from "@/components/3D/MainPageOriginal";
// import { Box, Environment, Float, OrbitControls, PerspectiveCamera, ScrollControls, Sphere, TransformControls, useFBX } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from 'three'
// import FeaturedCarsPage from "@/components/3D/FeaturedCarsPage";
// import { Suspense, useRef } from "react";
// import { Physics } from "@react-three/rapier";
// import Morphing from "@/components/3D/test/Morphing";
// import ShadersPractice from "@/components/3D/ShadersPractice";
// import FeaturedCards2D from "@/components/3D/Html/FeaturedCards2D";
// import MainPage from "@/components/3D/MainPageTest";
// import MainPageHtml from "@/components/3D/Brain/HtmlFrontPage/MainPageHtml";
// import SignInPage from "@/components/2D/SignInPage";

import SignInPage from "@/components/2D/SignInPage";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authConfig);

  console.log("Session: ", session);

  if (session) return redirect("home");
  

  return (
   <>
     

       <SignInPage/>

          
   </>
  )
}
  