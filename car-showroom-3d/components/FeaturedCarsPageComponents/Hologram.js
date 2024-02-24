import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import hologramVertex from "../hologramShader/hologramVertex";
import hologramFragment from "../hologramShader/hologramFragment";

export default function Hologram(props)
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



