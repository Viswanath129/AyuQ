import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, RotateCw, Sparkles } from 'lucide-react';
import { BlochCoordinates } from '../../services/quantum/QuantumSimulator';

interface ThreeBlochSphereProps {
  coords?: BlochCoordinates;
  qubitLabel?: string;
  className?: string;
  initialTheta?: number;
  initialPhi?: number;
  onAngleChange?: (thetaRad: number, phiRad: number) => void;
  interactive?: boolean;
}

export const ThreeBlochSphere: React.FC<ThreeBlochSphereProps> = ({
  coords,
  qubitLabel = 'q0',
  className = '',
  initialTheta,
  initialPhi,
  onAngleChange,
  interactive = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Local state if external coords not provided (converts deg to rad if initialTheta is > 6.28 or in deg)
  const defaultTheta = initialTheta !== undefined 
    ? (initialTheta > Math.PI * 2 ? (initialTheta * Math.PI) / 180 : initialTheta) 
    : 0.785;
  const defaultPhi = initialPhi !== undefined 
    ? (initialPhi > Math.PI * 2 ? (initialPhi * Math.PI) / 180 : initialPhi) 
    : 1.047;

  const [internalTheta, setInternalTheta] = useState(coords?.theta ?? defaultTheta);
  const [internalPhi, setInternalPhi] = useState(coords?.phi ?? defaultPhi);
  const [isPrecessing, setIsPrecessing] = useState(false);

  // Effective angles
  const currentTheta = coords ? coords.theta : internalTheta;
  const currentPhi = coords ? coords.phi : internalPhi;

  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const vectorRef = useRef<THREE.ArrowHelper | null>(null);
  const vectorPointRef = useRef<THREE.Mesh | null>(null);
  const projectionRef = useRef<THREE.Line | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  // Drag handling
  const isDraggingRef = useRef(false);
  const prevPosRef = useRef({ x: 0, y: 0 });

  const radius = 2.0;

  // Coordinate calculations
  // Z is vertical in standard quantum Bloch sphere (convention: north pole = |0>, south pole = |1>)
  // In Three.js: Y is up, X is right, Z is front
  // Mapping:
  // Quantum Z (0 to 1) -> Three.js Y
  // Quantum X -> Three.js X
  // Quantum Y -> Three.js Z
  const qX = coords ? coords.x : Math.sin(currentTheta) * Math.cos(currentPhi);
  const qY = coords ? coords.y : Math.sin(currentTheta) * Math.sin(currentPhi);
  const qZ = coords ? coords.z : Math.cos(currentTheta);

  const tX = radius * qX;
  const tY = radius * qZ; // Y in Three.js represents |0>/|1> axis
  const tZ = radius * qY; // Z in Three.js represents Y axis

  // State amplitudes
  const alpha = Math.cos(currentTheta / 2).toFixed(3);
  const beta = Math.sin(currentTheta / 2).toFixed(3);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 270;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.5, 2.8, 4.5);
    camera.lookAt(0, 0, 0);

    // 3. Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    groupRef.current = masterGroup;

    // 4. Subtle Translucent Clinical Sphere
    const sphereGeo = new THREE.SphereGeometry(radius, 32, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.05,
      wireframe: false
    });
    masterGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

    // 5. Equator & Meridian Rings
    const equatorMat = new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.75 });
    const meridianMat = new THREE.LineBasicMaterial({ color: 0xb45309, transparent: true, opacity: 0.35 });

    // Equator ring (Three.js XZ plane -> Quantum XY plane)
    const equatorGeo = new THREE.BufferGeometry();
    const equatorPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      equatorPts.push(new THREE.Vector3(radius * Math.cos(a), 0, radius * Math.sin(a)));
    }
    equatorGeo.setFromPoints(equatorPts);
    masterGroup.add(new THREE.Line(equatorGeo, equatorMat));

    // Meridian (XY plane)
    const meridianXYGeo = new THREE.BufferGeometry();
    const meridianXYPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      meridianXYPts.push(new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), 0));
    }
    meridianXYGeo.setFromPoints(meridianXYPts);
    masterGroup.add(new THREE.Line(meridianXYGeo, meridianMat));

    // Meridian (YZ plane)
    const meridianYZGeo = new THREE.BufferGeometry();
    const meridianYZPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      meridianYZPts.push(new THREE.Vector3(0, radius * Math.cos(a), radius * Math.sin(a)));
    }
    meridianYZGeo.setFromPoints(meridianYZPts);
    masterGroup.add(new THREE.Line(meridianYZGeo, meridianMat));

    // 6. Scientific Dashed Coordinate Axes
    const axisMat = new THREE.LineDashedMaterial({
      color: 0x64748b,
      dashSize: 0.1,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.6
    });

    const createAxis = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const line = new THREE.Line(geo, axisMat);
      line.computeLineDistances();
      masterGroup.add(line);
    };

    // Z-axis (Vertical: |0> at +Y, |1> at -Y)
    createAxis(new THREE.Vector3(0, -radius * 1.25, 0), new THREE.Vector3(0, radius * 1.25, 0));
    // X-axis (Right: |+> at +X, |-> at -X)
    createAxis(new THREE.Vector3(-radius * 1.2, 0, 0), new THREE.Vector3(radius * 1.2, 0, 0));
    // Y-axis (Depth: |+i> at +Z, |-i> at -Z)
    createAxis(new THREE.Vector3(0, 0, -radius * 1.2), new THREE.Vector3(0, 0, radius * 1.2));

    // 7. North & South Pole Indicators (|0> and |1>)
    const poleGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0x4338ca });
    const northPole = new THREE.Mesh(poleGeo, poleMat);
    northPole.position.set(0, radius, 0);
    masterGroup.add(northPole);

    const southPole = new THREE.Mesh(poleGeo, poleMat);
    southPole.position.set(0, -radius, 0);
    masterGroup.add(southPole);

    // 8. State Vector Arrow (Rich Indigo with Vibrant Violet Head)
    const vecDir = new THREE.Vector3(tX, tY, tZ).normalize();
    const arrow = new THREE.ArrowHelper(vecDir, new THREE.Vector3(0, 0, 0), radius, 0x4338ca, 0.4, 0.18);
    masterGroup.add(arrow);
    vectorRef.current = arrow;

    // Glowing endpoint node
    const tipGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const tipMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed });
    const tipMesh = new THREE.Mesh(tipGeo, tipMat);
    tipMesh.position.set(tX, tY, tZ);
    masterGroup.add(tipMesh);
    vectorPointRef.current = tipMesh;

    // Projection line to XY equator plane
    const projGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(tX, tY, tZ),
      new THREE.Vector3(tX, 0, tZ),
      new THREE.Vector3(0, 0, 0)
    ]);
    const projMat = new THREE.LineDashedMaterial({
      color: 0x818cf8,
      dashSize: 0.08,
      gapSize: 0.04,
      transparent: true,
      opacity: 0.7
    });
    const projLine = new THREE.Line(projGeo, projMat);
    projLine.computeLineDistances();
    masterGroup.add(projLine);
    projectionRef.current = projLine;

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isPrecessing && groupRef.current) {
        masterGroup.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  // Update arrow whenever coordinates change
  useEffect(() => {
    if (!vectorRef.current || !vectorPointRef.current) return;

    const vecDir = new THREE.Vector3(tX, tY, tZ);
    const len = vecDir.length();
    if (len > 0.001) {
      vectorRef.current.setDirection(vecDir.clone().normalize());
      vectorRef.current.setLength(radius, 0.4, 0.18);
      vectorPointRef.current.position.set(tX, tY, tZ);

      // Update projection lines
      if (projectionRef.current) {
        projectionRef.current.geometry.setFromPoints([
          new THREE.Vector3(tX, tY, tZ),
          new THREE.Vector3(tX, 0, tZ),
          new THREE.Vector3(0, 0, 0)
        ]);
        projectionRef.current.computeLineDistances();
      }
    }
  }, [tX, tY, tZ]);

  // Mouse & Touch Drag Rotations
  const handlePointerDown = (clientX: number, clientY: number) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    prevPosRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current || !groupRef.current) return;

    const deltaX = clientX - prevPosRef.current.x;
    const deltaY = clientY - prevPosRef.current.y;
    prevPosRef.current = { x: clientX, y: clientY };

    groupRef.current.rotation.y += deltaX * 0.008;
    groupRef.current.rotation.x += deltaY * 0.008;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className={`scientific-card rounded-2xl p-5 flex flex-col relative select-none border border-amber-200/50 shadow-xs ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-200/40">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-800">
            <Compass className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-extrabold text-stone-900">
            Bloch Sphere Statevector Inspection
          </h4>
          <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-950 rounded-md font-mono font-extrabold border border-amber-400/50">
            |{qubitLabel}⟩
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPrecessing(!isPrecessing)}
            className={`p-1.5 rounded-lg text-xs transition-all ${
              isPrecessing 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'text-stone-500 hover:bg-amber-50 hover:text-stone-900'
            }`}
            title={isPrecessing ? 'Pause rotation' : 'Continuous precession'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isPrecessing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-[260px] cursor-grab active:cursor-grabbing relative overflow-hidden flex items-center justify-center"
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handlePointerUp}
      >
        {/* Floating Axis Labels */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-extrabold text-amber-950 bg-white/95 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs pointer-events-none">
          |0⟩ (North)
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-extrabold text-amber-950 bg-white/95 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs pointer-events-none">
          |1⟩ (South)
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-stone-600 pointer-events-none">
          |+⟩ (+X)
        </div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-stone-600 pointer-events-none">
          |−⟩ (−X)
        </div>
      </div>

      {/* State Mathematical Readout */}
      <div className="pt-3 mt-1 border-t border-amber-200/30 grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/60 shadow-2xs">
          <div className="text-[10px] text-stone-500 font-sans font-bold flex items-center justify-between">
            <span>Statevector |ψ⟩</span>
            <span className="text-amber-700 font-mono text-[9px] font-extrabold">Normalized</span>
          </div>
          <div className="font-extrabold text-stone-900 mt-0.5">
            {alpha}|0⟩ + {beta}e<sup>iφ</sup>|1⟩
          </div>
        </div>

        <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/60 shadow-2xs">
          <div className="text-[10px] text-stone-500 font-sans font-bold">Bloch Coordinates (⟨X⟩, ⟨Y⟩, ⟨Z⟩)</div>
          <div className="font-extrabold text-stone-900 mt-0.5 flex items-center gap-1.5">
            <span className="text-amber-800">X:{qX.toFixed(2)}</span>
            <span className="text-purple-700">Y:{qY.toFixed(2)}</span>
            <span className="text-indigo-700">Z:{qZ.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Angle Slider Controls (if interactive) */}
      {interactive && onAngleChange && (
        <div className="mt-3 pt-3 border-t border-amber-200/30 space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-stone-700 font-bold">Polar Angle θ (Superposition):</span>
            <span className="font-mono text-amber-800 font-extrabold">
              {(currentTheta * (180 / Math.PI)).toFixed(1)}° ({(currentTheta / Math.PI).toFixed(2)}π)
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="3.14159"
            step="0.05"
            value={currentTheta}
            onChange={(e) => {
              const newTheta = parseFloat(e.target.value);
              setInternalTheta(newTheta);
              onAngleChange(newTheta, currentPhi);
            }}
            className="w-full accent-amber-600 h-1.5 bg-amber-200/80 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px]">
            <span className="text-stone-700 font-bold">Azimuthal Phase φ (Rotation):</span>
            <span className="font-mono text-purple-800 font-extrabold">
              {(currentPhi * (180 / Math.PI)).toFixed(1)}° ({(currentPhi / Math.PI).toFixed(2)}π)
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="6.28318"
            step="0.05"
            value={currentPhi}
            onChange={(e) => {
              const newPhi = parseFloat(e.target.value);
              setInternalPhi(newPhi);
              onAngleChange(currentTheta, newPhi);
            }}
            className="w-full accent-purple-600 h-1.5 bg-purple-200/80 rounded-lg cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
