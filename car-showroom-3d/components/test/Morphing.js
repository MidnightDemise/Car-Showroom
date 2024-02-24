import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Morphing = () => {
  const groupRef = useRef();
  const meshRef = useRef();
  const geometryRef = useRef();

  const { vertices } = useLoader(OBJLoader, "models/face_1.obj");
  const { vertices: vertices2 } = useLoader(OBJLoader, "models/face_2.obj");
  const { vertices: vertices3 } = useLoader(OBJLoader, "models/face_3.obj");
  const { vertices: vertices4 } = useLoader(OBJLoader, "models/skull_4.obj");

  useEffect(() => {
    const numParticles = 25000;
    const particlesPosition = new Float32Array(numParticles * 3);

    for (let i = 0; i < numParticles; i++) {
      const vertexIndex = i % vertices.length;
      const position = vertices[vertexIndex];
      particlesPosition.set([position.x, position.y, position.z], i * 3);
    }

    geometryRef.current = new THREE.BufferGeometry();
    geometryRef.current.setAttribute("position", new THREE.BufferAttribute(particlesPosition, 3));
  }, [vertices]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
    }
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      defaults: {},
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
      },
    }).to(meshRef.current.rotation, {
      y: Math.PI * 2,
    });

    const uniforms = {
      u_sec1: { value: 0.0 },
      u_sec2: { value: 0.0 },
      u_sec3: { value: 0.0 },
      u_sec4: { value: 0.0 },
    };

    const material = new THREE.RawShaderMaterial({
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    meshRef.current = new THREE.Points(geometryRef.current, material);
    groupRef.current.add(meshRef.current);

    gsap.to(meshRef.current.material.uniforms.u_sec1, {
      value: 1.0,
      scrollTrigger: {
        trigger: ".s-1",
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0.7,
      },
    });

    gsap.to(meshRef.current.material.uniforms.u_sec2, {
      value: 1.0,
      scrollTrigger: {
        trigger: ".s-2",
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0.7,
      },
    });

    gsap.to(meshRef.current.material.uniforms.u_sec3, {
      value: 1.0,
      scrollTrigger: {
        trigger: ".s-3",
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0.7,
      },
    });
  }, []);

  return (
    <group ref={groupRef} />
  );
};

export default Morphing;