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

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Create 4 qubit orbital rings and central entanglement mesh
    const nodeCount = 8;
    const nodes: THREE.Vector3[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x4f46e5 });

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

    // Connect nodes with entangling line strands
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.4
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
    const lineMesh = new THREE.LineSegments(linesGeo, lineMat);
    group.add(lineMesh);

    // Ambient rotation & subtle breathing
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      group.rotation.y = time * 0.15;
      group.rotation.x = Math.sin(time * 0.2) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 400;
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
    <div className={`relative w-full h-[180px] rounded-lg overflow-hidden border border-slate-200/80 bg-white/50 ${className}`}>
      <div ref={mountRef} className="w-full h-full"></div>
      <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200/60 pointer-events-none">
        Hilbert Space State Topology (2^{qubitsCount} Dimension)
      </div>
    </div>
  );
};
