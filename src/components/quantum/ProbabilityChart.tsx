import React from 'react';
import { BarChart2 } from 'lucide-react';

export interface ProbabilityItem {
  state: string;
  probability: number;
  count: number;
}

interface ProbabilityChartProps {
  probabilities: ProbabilityItem[];
  shots?: number;
  title?: string;
  expectationZ0?: number;
  predictedRisk?: number;
}

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({
  probabilities,
  shots = 2048,
  title = 'Measurement State Probabilities',
  expectationZ0,
  predictedRisk
}) => {
  // Sort states descending by probability
  const sorted = [...probabilities].sort((a, b) => b.probability - a.probability);
  // Show states with probability > 0.005, or at least top 6
  const visibleStates = sorted.filter((p, idx) => p.probability > 0.005 || idx < 6);

  return (
    <div className="scientific-card rounded-2xl p-5 space-y-4 shadow-xs border border-amber-200/50">
      <div className="flex items-center justify-between pb-3 border-b border-amber-200/40">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-800">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">{title}</h4>
            <span className="text-[10px] px-2 py-0.5 bg-amber-500/15 text-amber-950 border border-amber-400/40 rounded-md font-mono font-extrabold">
              Aer Statevector Simulation
            </span>
          </div>
          <p className="text-[11px] text-stone-600 mt-1 font-mono">
            Computational Z-basis |q_{visibleStates.length > 0 ? visibleStates[0].state.length - 3 : 1}...q₀⟩
          </p>
        </div>

        {expectationZ0 !== undefined && (
          <div className="text-right">
            <span className="text-[10px] text-stone-500 block uppercase font-mono font-bold">Expectation ⟨Z₀⟩</span>
            <span className="font-mono text-xs font-extrabold text-amber-800">
              {expectationZ0 > 0 ? `+${expectationZ0.toFixed(3)}` : expectationZ0.toFixed(3)}
            </span>
          </div>
        )}
      </div>

      {/* Probabilities Bar List */}
      <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
        {visibleStates.map((item, idx) => {
          const pct = (item.probability * 100).toFixed(1);
          const isHighest = idx === 0 && item.probability > 0.2;

          return (
            <div key={item.state} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className={`font-extrabold flex items-center gap-1.5 ${isHighest ? 'text-amber-800' : 'text-stone-800'}`}>
                  {item.state}
                  {isHighest && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-950 rounded-md font-sans font-bold border border-amber-400/40">
                      Dominant
                    </span>
                  )}
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="text-stone-500 text-[11px] font-medium">
                    {item.count.toLocaleString()} shots
                  </span>
                  <span className="font-extrabold text-stone-900 w-12 text-right">{pct}%</span>
                </div>
              </div>

              <div className="w-full h-2.5 bg-stone-200/70 rounded-full overflow-hidden flex">
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isHighest ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-amber-300/80'
                  }`}
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between pt-3 border-t border-amber-200/30 text-[11px] text-stone-600">
        <div>
          Total Shots: <strong className="font-mono text-stone-900 font-bold">{shots.toLocaleString()}</strong>
        </div>
        {predictedRisk !== undefined && (
          <div className="flex items-center gap-1.5">
            <span>Mapped Clinical Risk:</span>
            <span className={`font-mono text-xs font-extrabold px-2 py-0.5 rounded-full border ${
              predictedRisk > 0.5 
                ? 'bg-amber-500/20 text-amber-950 border-amber-400/60' 
                : 'bg-emerald-500/15 text-emerald-950 border-emerald-500/30'
            }`}>
              {(predictedRisk * 100).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

