import React from 'react'
import * as THREE from 'three';

import testVertexShader from '@/components/GLSL/lightningVertex.glsl'
import testFragmentShader from '@/components/GLSL/lightningFragment.glsl'


const ShaderPlayground = () => {
  return (
    <>
     <mesh>
          <planeGeometry/>
          <shaderMaterial side={THREE.DoubleSide}
          vertexShader={testVertexShader}
          fragmentShader={testFragmentShader}
          
          />
    </mesh>
        
    
    </>
  )
}

export default ShaderPlayground