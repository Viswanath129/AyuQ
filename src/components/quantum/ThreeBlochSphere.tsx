import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, Compass, Sparkles } from 'lucide-react';

interface ThreeBlochSphereProps {
  initialTheta?: number;
  initialPhi?: number;
  qubitLabel?: string;
  className?: string;
}

export const ThreeBlochSphere: React.FC<ThreeBlochSphereProps> = ({
  initialTheta = 45,
  initialPhi = 60,
  qubitLabel = 'q0',
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [theta, setTheta] = useState(initialTheta); // degrees [0, 180]
  const [phi, setPhi] = useState(initialPhi); // degrees [0, 360]
  const [isPrecessing, setIsPrecessing] = useState(false);

  // References to three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const vectorRef = useRef<THREE.ArrowHelper | null>(null);
  const vectorPointRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  // Drag interaction state (handles both mouse and mobile touch)
  const isDraggingRef = useRef(false);
  const prevPosRef = useRef({ x: 0, y: 0 });

  const radTheta = (theta * Math.PI) / 180;
  const radPhi = (phi * Math.PI) / 180;
  const radius = 2.0;

  const x = radius * Math.sin(radTheta) * Math.cos(radPhi);
  const z = radius * Math.sin(radTheta) * Math.sin(radPhi);
  const y = radius * Math.cos(radTheta);

  const alpha = Math.cos(radTheta / 2).toFixed(3);
  const beta = Math.sin(radTheta / 2).toFixed(3);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 260;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.2, 2.6, 4.2);
    camera.lookAt(0, 0, 0);

    // Renderer with full transparency for golden-hour background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    groupRef.current = masterGroup;

    // 1. Semi-transparent Golden Sphere Mesh
    const sphereGeo = new THREE.SphereGeometry(radius, 32, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.05,
      wireframe: false
    });
    masterGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

    // 2. Warm Sunset Wireframe Rings
    const equatorMat = new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.7 });
    const meridianMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.45 });

    // Equator ring (XZ plane)
    const equatorGeo = new THREE.BufferGeometry();
    const equatorPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      equatorPts.push(new THREE.Vector3(radius * Math.cos(a), 0, radius * Math.sin(a)));
    }
    equatorGeo.setFromPoints(equatorPts);
    masterGroup.add(new THREE.Line(equatorGeo, equatorMat));

    // Meridians (XY and YZ planes)
    const meridianXYGeo = new THREE.BufferGeometry();
    const meridianXYPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      meridianXYPts.push(new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), 0));
    }
    meridianXYGeo.setFromPoints(meridianXYPts);
    masterGroup.add(new THREE.Line(meridianXYGeo, meridianMat));

    const meridianYZGeo = new THREE.BufferGeometry();
    const meridianYZPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      meridianYZPts.push(new THREE.Vector3(0, radius * Math.cos(a), radius * Math.sin(a)));
    }
    meridianYZGeo.setFromPoints(meridianYZPts);
    masterGroup.add(new THREE.Line(meridianYZGeo, meridianMat));

    // 3. Axes
    const axisMat = new THREE.LineDashedMaterial({
      color: 0x78350f,
      dashSize: 0.1,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.5
    });

    const createAxisLine = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const line = new THREE.Line(geo, axisMat);
      line.computeLineDistances();
      masterGroup.add(line);
    };

    createAxisLine(new THREE.Vector3(0, -radius * 1.2, 0), new THREE.Vector3(0, radius * 1.2, 0));
    createAxisLine(new THREE.Vector3(-radius * 1.15, 0, 0), new THREE.Vector3(radius * 1.15, 0, 0));
    createAxisLine(new THREE.Vector3(0, 0, -radius * 1.15), new THREE.Vector3(0, 0, radius * 1.15));

    // North & South Pole Markers
    const poleGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0x9a3412 });
    const northPole = new THREE.Mesh(poleGeo, poleMat);
    northPole.position.set(0, radius, 0);
    masterGroup.add(northPole);

    const southPole = new THREE.Mesh(poleGeo, poleMat);
    southPole.position.set(0, -radius, 0);
    masterGroup.add(southPole);

    // 4. State Vector Arrow (Golden Amber Color)
    const dir = new THREE.Vector3(x, y, z).normalize();
    const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), radius, 0xd97706, 0.35, 0.15);
    masterGroup.add(arrow);
    vectorRef.current = arrow;

    // Glowing tip sphere
    const pointGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const pointMat = new THREE.MeshBasicMaterial({ color: 0xea580c });
    const pointMesh = new THREE.Mesh(pointGeo, pointMat);
    pointMesh.position.set(x, y, z);
    masterGroup.add(pointMesh);
    vectorPointRef.current = pointMesh;

    // Touch & Mouse Drag Handlers for cross-platform / mobile support
    const handleStart = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      prevPosRef.current = { x: clientX, y: clientY };
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current || !groupRef.current) return;
      const dx = clientX - prevPosRef.current.x;
      const dy = clientY - prevPosRef.current.y;
      groupRef.current.rotation.y += dx * 0.008;
      groupRef.current.rotation.x += dy * 0.008;
      prevPosRef.current = { x: clientX, y: clientY };
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleEnd();

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationId: number;
    let localPhi = phi;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (isPrecessing) {
        localPhi = (localPhi + 0.8) % 360;
        setPhi(Math.round(localPhi));
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth || 320;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isPrecessing]);

  useEffect(() => {
    const dir = new THREE.Vector3(x, y, z).normalize();
    if (vectorRef.current) {
      vectorRef.current.setDirection(dir);
    }
    if (vectorPointRef.current) {
      vectorPointRef.current.position.set(x, y, z);
    }
  }, [x, y, z]);

  const setPreset = (t: number, p: number) => {
    setTheta(t);
    setPhi(p);
  };

  return (
    <div className={`glass-card rounded-2xl p-4 shadow-sm select-none ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-200/40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-xs font-mono font-bold text-amber-950 tracking-tight">
            3D Bloch Sphere ({qubitLabel})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPrecessing(!isPrecessing)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium flex items-center gap-1 transition-colors ${
              isPrecessing
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200/70'
            }`}
          >
            {isPrecessing ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            <span>{isPrecessing ? 'Precessing' : 'Precession'}</span>
          </button>

          <button
            onClick={() => {
              if (groupRef.current) {
                groupRef.current.rotation.set(0, 0, 0);
              }
            }}
            className="p-1 text-amber-700/60 hover:text-amber-900 rounded hover:bg-amber-100/50 transition-colors"
            title="Reset orientation"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative my-2 cursor-grab active:cursor-grabbing touch-none">
        <div ref={mountRef} className="w-full h-[260px] rounded-lg overflow-hidden flex items-center justify-center"></div>

        <div className="absolute top-2 left-2 pointer-events-none text-[9px] font-mono text-amber-900/80 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded border border-amber-200/50">
          <div>|0⟩ = [1, 0]ᵀ (North)</div>
          <div>|1⟩ = [0, 1]ᵀ (South)</div>
        </div>

        <div className="absolute bottom-2 right-2 pointer-events-none text-[10px] font-mono text-amber-950 bg-amber-50/90 backdrop-blur-xs px-2.5 py-1 rounded border border-amber-300/60 font-semibold shadow-xs">
          |ψ⟩ = {alpha}|0⟩ + {beta}e^{`i${phi}°`}|1⟩
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-amber-200/40 text-[10px] font-mono">
        <span className="text-amber-800/70 mr-1">Presets:</span>
        {[
          { label: '|0⟩', t: 0, p: 0 },
          { label: '|1⟩', t: 180, p: 0 },
          { label: '|+⟩', t: 90, p: 0 },
          { label: '|-⟩', t: 90, p: 180 },
          { label: '|i⟩', t: 90, p: 90 },
          { label: '|-i⟩', t: 90, p: 270 },
        ].map((pr) => (
          <button
            key={pr.label}
            onClick={() => setPreset(pr.t, pr.p)}
            className="px-2 py-1 bg-amber-50/80 hover:bg-amber-100 text-amber-900 rounded border border-amber-200/60 transition-colors"
          >
            {pr.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-3 mt-3 pt-2 border-t border-amber-200/40 text-xs">
        <div>
          <div className="flex justify-between text-amber-900/70 text-[11px] mb-1 font-mono">
            <span>θ (Polar):</span>
            <span className="font-semibold text-amber-950">{theta}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
            className="w-full h-1.5 bg-amber-200/60 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
        </div>
        <div>
          <div className="flex justify-between text-amber-900/70 text-[11px] mb-1 font-mono">
            <span>φ (Phase):</span>
            <span className="font-semibold text-amber-950">{phi}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
            className="w-full h-1.5 bg-amber-200/60 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
        </div>
      </div>
    </div>
  );
};
