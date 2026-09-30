import React, { useState } from 'react';

interface BlochSphereProps {
  initialTheta?: number;
  initialPhi?: number;
  qubitLabel?: string;
  size?: number;
}

export const BlochSphere: React.FC<BlochSphereProps> = ({
  initialTheta = 45,
  initialPhi = 60,
  qubitLabel = 'q0',
  size = 180
}) => {
  const [theta, setTheta] = useState(initialTheta); // Polar angle (degrees)
  const [phi, setPhi] = useState(initialPhi); // Azimuthal angle (degrees)

  const radius = (size / 2) - 24;
  const cx = size / 2;
  const cy = size / 2;

  // Convert spherical to 2D projection
  const radTheta = (theta * Math.PI) / 180;
  const radPhi = (phi * Math.PI) / 180;

  // 3D vector coordinates
  const x = Math.sin(radTheta) * Math.cos(radPhi);
  const y = Math.sin(radTheta) * Math.sin(radPhi);
  const z = Math.cos(radTheta);

  // Isometric / orthographic projection for SVG
  const projX = cx + radius * (x * 0.866 - y * 0.5);
  const projY = cy - radius * (z * 0.9 - (x * 0.2 + y * 0.2));

  // State amplitudes
  const alpha = Math.cos(radTheta / 2).toFixed(3);
  const beta = Math.sin(radTheta / 2).toFixed(3);

  return (
    <div className="flex flex-col items-center p-3 bg-white border border-slate-200 rounded-lg shadow-xs select-none">
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-xs font-semibold text-slate-700 font-mono tracking-tight flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Bloch Sphere ({qubitLabel})
        </span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
          |ψ⟩ = {alpha}|0⟩ + {beta}|1⟩
        </span>
      </div>

      <svg width={size} height={size} className="overflow-visible my-1">
        {/* Sphere outer boundary */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
        
        {/* Equator ellipse */}
        <ellipse cx={cx} cy={cy} rx={radius} ry={radius * 0.35} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Meridian ellipse */}
        <ellipse cx={cx} cy={cy} rx={radius * 0.35} ry={radius} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />

        {/* Z-Axis (Vertical |0> to |1>) */}
        <line x1={cx} y1={cy - radius - 10} x2={cx} y2={cy + radius + 10} stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
        <text x={cx + 4} y={cy - radius - 6} fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="bold">|0⟩ (+z)</text>
        <text x={cx + 4} y={cy + radius + 14} fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="bold">|1⟩ (-z)</text>

        {/* X and Y axes */}
        <line x1={cx - radius * 0.8} y1={cy + radius * 0.3} x2={cx + radius * 0.8} y2={cy - radius * 0.3} stroke="#cbd5e1" strokeWidth="1" />
        <text x={cx + radius * 0.8 + 4} y={cy - radius * 0.3} fill="#94a3b8" fontSize="9" fontFamily="monospace">x</text>

        {/* State Vector Line */}
        <line x1={cx} y1={cy} x2={projX} y2={projY} stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Vector Head */}
        <circle cx={projX} cy={projY} r="4.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
        
        {/* Projection point on equator */}
        <line x1={projX} y1={projY} x2={projX} y2={cy + (projX - cx) * 0.15} stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      </svg>

      {/* Angle sliders */}
      <div className="grid grid-cols-2 gap-2 w-full mt-2 pt-2 border-t border-slate-100 text-[11px]">
        <div>
          <div className="flex justify-between text-slate-500 mb-0.5">
            <span>θ (polar):</span>
            <span className="font-mono text-slate-700">{theta}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
        <div>
          <div className="flex justify-between text-slate-500 mb-0.5">
            <span>φ (phase):</span>
            <span className="font-mono text-slate-700">{phi}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};
