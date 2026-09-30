import React from 'react';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Box, 
  Cloud, 
  Activity, 
  ShieldCheck, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { MOCK_INFRASTRUCTURE_NODES } from '../../services/mockData';

export const InfrastructureWorkspace: React.FC = () => {
  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Infrastructure & Hybrid Cloud Mesh</h2>
            <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-medium">
              Infrastructure Layer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Realtime simulated telemetry for high-performance CPU clusters, NVIDIA A100 GPU accelerators, and QPU simulation backends.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Prometheus Daemon Scrape: 1s</span>
        </div>
      </div>

      {/* Infrastructure Node Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_INFRASTRUCTURE_NODES.map((node, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                {node.category}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                node.status === 'HEALTHY' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                {node.status}
              </span>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{node.name}</h3>
              <p className="text-[11px] text-slate-500">{node.type}</p>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Load / Utilization:</span>
                <span className="font-semibold text-slate-800">{node.utilization}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    node.utilization > 80 ? 'bg-rose-500' : node.utilization > 50 ? 'bg-indigo-600' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${node.utilization}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
              Specs: {node.specs}
            </div>
          </div>
        ))}
      </div>

      {/* Observability Telemetry Block */}
      <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Prometheus & Grafana Observability Gateway</h3>
          <span className="text-xs font-mono text-emerald-600 font-semibold">Zero Pod Evictions</span>
        </div>
        <p className="text-xs text-slate-500">
          All quantum jobs and classical model evaluations are monitored via OpenTelemetry traces. 
          Hardware resource consumption is budgeted and logged to enforce reproducible research standards.
        </p>
      </div>
    </div>
  );
};
