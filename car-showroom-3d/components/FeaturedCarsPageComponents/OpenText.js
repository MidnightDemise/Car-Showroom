import { useGLTF } from '@react-three/drei'
import React from 'react'

const OpenText = (props) => {

    const {scene , nodes , materials} = useGLTF("OpenText/scene.gltf");

  return (
    <>
        <primitive object={scene} {...props}/>
    </>
  )
}

export default OpenText