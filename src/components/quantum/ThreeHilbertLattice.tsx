import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHilbertLatticeProps {
  qubitsCount?: number;
  className?: string;
}

export const ThreeHilbertLattice: React.FC<ThreeHilbertLatticeProps> = ({
  qubitsCount = 4,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent for video background
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Warm Sunset Golden Lattice
    const nodeCount = 8;
    const nodes: THREE.Vector3[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = 1.8;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = Math.sin(angle * 2) * 0.4;
      const pos = new THREE.Vector3(x, y, z);
      nodes.push(pos);

      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.copy(pos);
      group.add(sphere);
    }

    // Warm amber connecting strands
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.55
    });

    const linesGeo = new THREE.BufferGeometry();
    const linePts: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (i % 2 === j % 2 || (i + 1) % nodeCount === j) {
          linePts.push(nodes[i], nodes[j]);
        }
      }
    }
    linesGeo.setFromPoints(linePts);
    group.add(new THREE.LineSegments(linesGeo, lineMat));

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      group.rotation.y = time * 0.18;
      group.rotation.x = Math.sin(time * 0.2) * 0.12;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 180;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [qubitsCount]);

  return (
    <div className={`relative w-full h-[180px] rounded-xl overflow-hidden glass-card ${className}`}>
      <div ref={mountRef} className="w-full h-full"></div>
      <div className="absolute top-2 left-2 text-[10px] font-mono text-amber-900 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded border border-amber-300/50 pointer-events-none">
        Hilbert Space (2^{qubitsCount} Dimensional State Topology)
      </div>
    </div>
  );
};
