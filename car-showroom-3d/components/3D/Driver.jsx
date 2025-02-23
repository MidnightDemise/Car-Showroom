/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 driver.glb 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Driver(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/driver.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    console.log(actions);
    actions.armada.play();
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Alpha_Joints" geometry={nodes.Alpha_Joints.geometry} material={materials.Alpha_Joints_MAT} skeleton={nodes.Alpha_Joints.skeleton} />
          <skinnedMesh name="Alpha_Surface" geometry={nodes.Alpha_Surface.geometry} material={materials.Alpha_Body_MAT} skeleton={nodes.Alpha_Surface.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/driver.glb')
