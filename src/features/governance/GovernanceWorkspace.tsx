import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  Scale
} from 'lucide-react';
import { SafetyDisclaimer } from '../../components/layout/SafetyDisclaimer';
import { MOCK_AUDIT_LOGS } from '../../services/mockData';
import { AuditLogEntry } from '../../types';

export const GovernanceWorkspace: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [activeTab, setActiveTab] = useState<'privacy' | 'rbac' | 'audit' | 'ethics'>('privacy');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(l => 
    l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SafetyDisclaimer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Security, Governance & Ethical AI</h2>
            <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md font-medium">
              Security & Governance Layer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            HIPAA/GDPR compliance status, role-based access control (RBAC), immutable audit logging, and algorithmic fairness audits.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-slate-200 text-xs">
        {[
          { key: 'privacy', label: 'Privacy & Compliance' },
          { key: 'rbac', label: 'RBAC Access Matrix' },
          { key: 'audit', label: 'Audit Trail Logs' },
          { key: 'ethics', label: 'Ethical AI & Fairness' }
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

      {/* Tab Content Panes */}
      {activeTab === 'privacy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">HIPAA Security Rule Framework</h3>
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium">
                Compliant (Simulated)
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Encryption in Transit:</span>
                <strong className="font-mono text-slate-800">TLS 1.3 / mTLS Inter-service</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Encryption at Rest:</span>
                <strong className="font-mono text-slate-800">AES-GCM-256 (KMS Managed)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>De-identification Standard:</span>
                <strong className="font-mono text-slate-800">HIPAA Safe Harbor (18 Identifiers)</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Differential Privacy:</span>
                <strong className="font-mono text-slate-800">Laplace Mechanism (ε = 0.5)</strong>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">GDPR Compliance & Data Sovereignty</h3>
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium">
                Verified
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Right to Explanation:</span>
                <strong className="font-mono text-slate-800">SHAP Feature Attribution Active</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Data Minimization:</span>
                <strong className="font-mono text-slate-800">Enforced by Preprocessing Pipeline</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Audit Trail Retention:</span>
                <strong className="font-mono text-slate-800">7 Years Immutable WORM Storage</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rbac' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Role-Based Access Control (RBAC) Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                <tr>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">View Datasets</th>
                  <th className="py-2.5 px-3">Run QML Training</th>
                  <th className="py-2.5 px-3">Lock Test Set</th>
                  <th className="py-2.5 px-3">Clinical Inference</th>
                  <th className="py-2.5 px-3">Audit Logs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {[
                  { role: 'Administrator', r1: '✔ Full', r2: '✔ Full', r3: '✔ Full', r4: '✔ Full', r5: '✔ Full' },
                  { role: 'Quantum Researcher', r1: '✔ Read', r2: '✔ Submit Circuits', r3: '✘ No', r4: '✔ Sim Only', r5: '✔ Read' },
                  { role: 'ML Engineer', r1: '✔ Full', r2: '✔ Train Models', r3: '✔ Authorize', r4: '✔ Test', r5: '✔ Read' },
                  { role: 'Clinician', r1: '✔ Synthetic', r2: '✘ No', r3: '✘ No', r4: '✔ Review', r5: '✘ No' },
                  { role: 'Researcher', r1: '✔ Read', r2: '✘ No', r3: '✘ No', r4: '✔ Read', r5: '✘ No' },
                  { role: 'Patient', r1: '✘ No', r2: '✘ No', r3: '✘ No', r4: '✔ Personal Only', r5: '✘ No' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-800">{row.role}</td>
                    <td className="py-2 px-3 text-emerald-600">{row.r1}</td>
                    <td className="py-2 px-3">{row.r2}</td>
                    <td className="py-2 px-3">{row.r3}</td>
                    <td className="py-2 px-3">{row.r4}</td>
                    <td className="py-2 px-3">{row.r5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Immutable Cryptographic Audit Trail</h3>
            <div className="relative">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-3 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 w-48"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b">
                <tr>
                  <th className="py-2 px-3">Timestamp</th>
                  <th className="py-2 px-3">User</th>
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Action</th>
                  <th className="py-2 px-3">Resource Target</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 text-slate-500">{log.timestamp}</td>
                    <td className="py-2 px-3 text-slate-800 font-semibold">{log.user}</td>
                    <td className="py-2 px-3 text-slate-600">{log.role}</td>
                    <td className="py-2 px-3 text-indigo-700">{log.action}</td>
                    <td className="py-2 px-3 text-slate-600">{log.resource}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'ethics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Demographic Parity</span>
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold">PASS</span>
            </div>
            <div className="text-xl font-bold text-slate-800 font-mono">0.962</div>
            <p className="text-[11px] text-slate-500">Disparate impact ratio across synthetic gender subgroups (Threshold &gt; 0.80)</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Equal Opportunity</span>
              <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold">PASS</span>
            </div>
            <div className="text-xl font-bold text-slate-800 font-mono">0.941</div>
            <p className="text-[11px] text-slate-500">True positive rate difference &lt; 0.05 across age strata</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Model Transparency</span>
              <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-bold">REVIEW</span>
            </div>
            <div className="text-xl font-bold text-slate-800 font-mono">88%</div>
            <p className="text-[11px] text-slate-500">Shapley explainability coverage across all high-risk clinical predictions</p>
          </div>
        </div>
      )}
    </div>
  );
};
