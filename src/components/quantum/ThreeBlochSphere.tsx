import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Play, Pause, Compass, Sparkles } from 'lucide-react';

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

  // References to three.js objects for real-time updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const vectorRef = useRef<THREE.ArrowHelper | null>(null);
  const vectorPointRef = useRef<THREE.Mesh | null>(null);
  const trailRef = useRef<THREE.Line | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Calculate cartesian coordinates from spherical
  const radTheta = (theta * Math.PI) / 180;
  const radPhi = (phi * Math.PI) / 180;
  const radius = 2.0;

  const x = radius * Math.sin(radTheta) * Math.cos(radPhi);
  const z = radius * Math.sin(radTheta) * Math.sin(radPhi);
  const y = radius * Math.cos(radTheta); // Y is vertical (|0> to |1>)

  const alpha = Math.cos(radTheta / 2).toFixed(3);
  const beta = Math.sin(radTheta / 2).toFixed(3);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 280;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd); // Ultra-clean subtle off-white
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.2, 2.6, 4.2);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Master Group for mouse rotation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    groupRef.current = masterGroup;

    // 1. Semi-transparent Bloch Sphere Mesh
    const sphereGeo = new THREE.SphereGeometry(radius, 32, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.04,
      wireframe: false
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    masterGroup.add(sphereMesh);

    // 2. Wireframe Rings (Equator, Meridians, Latitudes)
    const lineMat = new THREE.LineBasicMaterial({ color: 0xc7d2fe, transparent: true, opacity: 0.65 });
    const subtleMat = new THREE.LineBasicMaterial({ color: 0xe0e7ff, transparent: true, opacity: 0.45 });

    // Equator ring (XZ plane)
    const equatorGeo = new THREE.BufferGeometry();
    const equatorPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      equatorPts.push(new THREE.Vector3(radius * Math.cos(a), 0, radius * Math.sin(a)));
    }
    equatorGeo.setFromPoints(equatorPts);
    masterGroup.add(new THREE.Line(equatorGeo, lineMat));

    // Meridians (XY and YZ planes)
    const meridianXYGeo = new THREE.BufferGeometry();
    const meridianXYPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      meridianXYPts.push(new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), 0));
    }
    meridianXYGeo.setFromPoints(meridianXYPts);
    masterGroup.add(new THREE.Line(meridianXYGeo, subtleMat));

    const meridianYZGeo = new THREE.BufferGeometry();
    const meridianYZPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      meridianYZPts.push(new THREE.Vector3(0, radius * Math.cos(a), radius * Math.sin(a)));
    }
    meridianYZGeo.setFromPoints(meridianYZPts);
    masterGroup.add(new THREE.Line(meridianYZGeo, subtleMat));

    // 3. Axes: +Y (|0>), -Y (|1>), +X, +Z
    const axisMat = new THREE.LineDashedMaterial({
      color: 0x94a3b8,
      dashSize: 0.1,
      gapSize: 0.05
    });

    const createAxisLine = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const line = new THREE.Line(geo, axisMat);
      line.computeLineDistances();
      masterGroup.add(line);
    };

    createAxisLine(new THREE.Vector3(0, -radius * 1.25, 0), new THREE.Vector3(0, radius * 1.25, 0));
    createAxisLine(new THREE.Vector3(-radius * 1.15, 0, 0), new THREE.Vector3(radius * 1.15, 0, 0));
    createAxisLine(new THREE.Vector3(0, 0, -radius * 1.15), new THREE.Vector3(0, 0, radius * 1.15));

    // North & South Pole Markers (|0> and |1>)
    const poleGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0x475569 });
    const northPole = new THREE.Mesh(poleGeo, poleMat);
    northPole.position.set(0, radius, 0);
    masterGroup.add(northPole);

    const southPole = new THREE.Mesh(poleGeo, poleMat);
    southPole.position.set(0, -radius, 0);
    masterGroup.add(southPole);

    // 4. State Vector Arrow (Three.js ArrowHelper)
    const dir = new THREE.Vector3(x, y, z).normalize();
    const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), radius, 0x4f46e5, 0.35, 0.15);
    masterGroup.add(arrow);
    vectorRef.current = arrow;

    // Glowing tip sphere
    const pointGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const pointMat = new THREE.MeshBasicMaterial({ color: 0x4338ca });
    const pointMesh = new THREE.Mesh(pointGeo, pointMat);
    pointMesh.position.set(x, y, z);
    masterGroup.add(pointMesh);
    vectorPointRef.current = pointMesh;

    // Mouse drag handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !groupRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      groupRef.current.rotation.y += dx * 0.008;
      groupRef.current.rotation.x += dy * 0.008;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

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

    // Handle Resize
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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isPrecessing]);

  // Update vector position when theta or phi changes
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
    <div className={`bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs select-none ${className}`}>
      {/* Micro-header with scientific badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></div>
          <span className="text-xs font-mono font-semibold text-slate-800 tracking-tight">
            3D Bloch Sphere ({qubitLabel})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPrecessing(!isPrecessing)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium flex items-center gap-1 transition-colors ${
              isPrecessing
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Toggle Larmor phase precession"
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
            className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors"
            title="Reset 3D camera rotation"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative my-2 cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-[280px] rounded-lg overflow-hidden flex items-center justify-center"></div>

        {/* Overlay Labels */}
        <div className="absolute top-2 left-2 pointer-events-none text-[10px] font-mono text-slate-500 bg-white/80 backdrop-blur-xs px-2 py-1 rounded border border-slate-200/50">
          <div>|0⟩ = [1, 0]ᵀ (North Pole)</div>
          <div>|1⟩ = [0, 1]ᵀ (South Pole)</div>
        </div>

        <div className="absolute bottom-2 right-2 pointer-events-none text-[10px] font-mono text-indigo-700 bg-white/90 backdrop-blur-xs px-2 py-1 rounded border border-indigo-200/60 font-semibold shadow-2xs">
          |ψ⟩ = {alpha}|0⟩ + {beta}e^{`i${phi}°`}|1⟩
        </div>
      </div>

      {/* Quantum State Presets (Hadamard, Pauli, Superposition) */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 text-[10px] font-mono">
        <span className="text-slate-400">Presets:</span>
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
            className="px-2 py-0.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 text-slate-700 rounded border border-slate-200 transition-colors"
          >
            {pr.label}
          </button>
        ))}
      </div>

      {/* Polar & Azimuth Sliders */}
      <div className="grid grid-cols-2 gap-3 mt-3 pt-2 border-t border-slate-100 text-xs">
        <div>
          <div className="flex justify-between text-slate-500 text-[11px] mb-1 font-mono">
            <span>θ (Polar):</span>
            <span className="font-semibold text-slate-800">{theta}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
        <div>
          <div className="flex justify-between text-slate-500 text-[11px] mb-1 font-mono">
            <span>φ (Azimuthal Phase):</span>
            <span className="font-semibold text-slate-800">{phi}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};
