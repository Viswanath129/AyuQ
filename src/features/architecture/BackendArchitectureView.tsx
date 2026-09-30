import React, { useState } from 'react';
import { Code2, Server, Terminal, CheckCircle2, Copy, Check } from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { API_ENDPOINTS } from '../../backend-design/api-contracts';
import { BACKEND_PSEUDOCODE } from '../../backend-design/pseudocode-services';

export const BackendArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'qiskit' | 'eval' | 'auth'>('endpoints');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Backend Architecture & Service Contracts</h2>
            <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md font-medium">
              Target Blueprint
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Formal REST API contracts, service interfaces, and Python (FastAPI / Qiskit / PyTorch) pseudocode designed for seamless future backend replacement.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 text-xs">
        {[
          { key: 'endpoints', label: 'REST API Contracts (OpenAPI)' },
          { key: 'qiskit', label: 'Qiskit Quantum Service Pseudocode' },
          { key: 'eval', label: 'Evaluation Vault Service Pseudocode' },
          { key: 'auth', label: 'Auth & RBAC Service Pseudocode' }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`px-3.5 py-2 font-semibold border-b-2 transition-colors -mb-px ${
              activeTab === t.key
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* REST API Endpoints Table */}
      {activeTab === 'endpoints' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Target RESTful Endpoints</h3>
            <span className="text-xs font-mono text-slate-400">Base Path: /api/v1</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b">
                <tr>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Path</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Status in Prototype</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(API_ENDPOINTS).map(([k, ep]) => (
                  <tr key={k} className="hover:bg-slate-50">
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ep.method === 'GET' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-800">{ep.path}</td>
                    <td className="py-2 px-3 text-slate-600">{ep.description}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-sans font-medium">
                        Mocked Client
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Qiskit Python Pseudocode */}
      {activeTab === 'qiskit' && (
        <div className="bg-slate-900 rounded-lg p-5 shadow-xs text-slate-200 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>app/services/quantum_service.py (Target Implementation)</span>
            <button
              onClick={() => copyToClipboard(BACKEND_PSEUDOCODE.quantumServicePy, 'qiskit')}
              className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
            >
              {copiedKey === 'qiskit' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'qiskit' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="overflow-x-auto text-indigo-300 leading-relaxed">
            {BACKEND_PSEUDOCODE.quantumServicePy}
          </pre>
        </div>
      )}

      {/* Evaluation Vault Python Pseudocode */}
      {activeTab === 'eval' && (
        <div className="bg-slate-900 rounded-lg p-5 shadow-xs text-slate-200 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>app/services/evaluation_service.py (Target Implementation)</span>
            <button
              onClick={() => copyToClipboard(BACKEND_PSEUDOCODE.evaluationProtocolPy, 'eval')}
              className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
            >
              {copiedKey === 'eval' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'eval' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="overflow-x-auto text-indigo-300 leading-relaxed">
            {BACKEND_PSEUDOCODE.evaluationProtocolPy}
          </pre>
        </div>
      )}

      {/* Auth & RBAC Python Pseudocode */}
      {activeTab === 'auth' && (
        <div className="bg-slate-900 rounded-lg p-5 shadow-xs text-slate-200 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>app/services/auth_service.py (Target Implementation)</span>
            <button
              onClick={() => copyToClipboard(BACKEND_PSEUDOCODE.mockAuthServicePy, 'auth')}
              className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
            >
              {copiedKey === 'auth' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'auth' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="overflow-x-auto text-indigo-300 leading-relaxed">
            {BACKEND_PSEUDOCODE.mockAuthServicePy}
          </pre>
        </div>
      )}
    </div>
  );
};
