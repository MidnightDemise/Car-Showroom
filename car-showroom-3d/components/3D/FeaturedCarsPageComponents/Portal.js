import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import portalVertex from "../PortalShader/portalVertex";
import portalFragment from "../PortalShader/portalFragment";
import * as THREE from 'three'

export default function Portal(props)
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

