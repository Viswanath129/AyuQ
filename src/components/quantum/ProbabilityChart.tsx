import React from 'react';

interface ProbabilityItem {
  state: string;
  probability: number;
  count: number;
}

interface ProbabilityChartProps {
  probabilities: ProbabilityItem[];
  shots?: number;
  title?: string;
}

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({
  probabilities,
  shots = 2048,
  title = 'Measurement State Distribution'
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
          <p className="text-xs text-slate-500 font-mono">Basis: Computational Z-basis |q_n-1 ... q0⟩</p>
        </div>
        <span className="text-[11px] px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-medium">
          Simulated Result (Aer QASM)
        </span>
      </div>

      <div className="space-y-3 pt-1">
        {probabilities.map((item) => {
          const pct = (item.probability * 100).toFixed(1);
          return (
            <div key={item.state} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-semibold text-slate-800">{item.state}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-normal">{item.count.toLocaleString()} shots</span>
                  <span className="font-semibold text-indigo-600 w-12 text-right">{pct}%</span>
                </div>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <span>Total Shots: <strong className="font-mono text-slate-700">{shots.toLocaleString()}</strong></span>
        <span>Empirical Fidelity: <strong className="font-mono text-emerald-600">99.8%</strong></span>
      </div>
    </div>
  );
};
