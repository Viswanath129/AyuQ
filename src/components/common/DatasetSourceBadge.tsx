import React, { useState } from 'react';
import { ExternalLink, Database, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getDatasetMetadata } from '../../services/datasetRegistry';
import { DatasetMetadata } from '../../types';

interface DatasetSourceBadgeProps {
  datasetId?: string;
  datasetName?: string;
  variant?: 'badge' | 'link' | 'card' | 'inline';
  showPopoverOnHover?: boolean;
  className?: string;
}

export const DatasetSourceBadge: React.FC<DatasetSourceBadgeProps> = ({
  datasetId,
  datasetName,
  variant = 'badge',
  showPopoverOnHover = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const metadata: DatasetMetadata | undefined = getDatasetMetadata(datasetId || datasetName);

  if (!metadata) {
    return (
      <span className={`text-stone-600 text-xs ${className}`}>
        {datasetName || datasetId || 'Clinical Dataset'}
      </span>
    );
  }

  const ariaLabel = `View ${metadata.shortName} dataset source on ${metadata.sourceName}`;

  if (variant === 'link') {
    return (
      <div 
        className="relative inline-flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href={metadata.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={`inline-flex items-center gap-1 font-semibold text-stone-800 hover:text-amber-700 underline decoration-amber-300 underline-offset-2 hover:decoration-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-sm text-xs ${className}`}
        >
          <span>{datasetName || metadata.shortName}</span>
          <ExternalLink className="w-3 h-3 text-amber-600 shrink-0" aria-hidden="true" />
        </a>

        {/* Hover Context Popover */}
        {showPopoverOnHover && isHovered && (
          <div 
            role="tooltip"
            className="absolute bottom-full left-0 mb-2 z-50 w-72 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-amber-300/70 shadow-lg text-xs space-y-2 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between gap-1 border-b border-amber-200/50 pb-1.5">
              <div>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-500/15 px-2 py-0.5 rounded-full font-bold">
                  {metadata.sourceName}
                </span>
                <h4 className="font-bold text-stone-900 mt-1 leading-snug">{metadata.shortName}</h4>
              </div>
            </div>
            <p className="text-[11px] text-stone-600 line-clamp-3 leading-relaxed">
              {metadata.description}
            </p>
            <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-amber-200/40">
              <span className="font-mono">{metadata.recordCount.toLocaleString()} cases · {metadata.featureCount} vars</span>
              <span className="text-amber-700 font-bold flex items-center gap-0.5">
                Official Repository ↗
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-4 rounded-xl glass-panel border border-amber-200/60 shadow-xs space-y-3 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-300/50 text-amber-800">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-800 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-300/40">
                {metadata.sourceName}
              </span>
              <h4 className="text-sm font-bold text-stone-900 mt-1">{metadata.name}</h4>
            </div>
          </div>

          <a
            href={metadata.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 shrink-0"
          >
            <span>View Source Dataset</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          {metadata.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono bg-white/70 p-2.5 rounded-lg border border-amber-200/50">
          <div>
            <span className="text-stone-400 block text-[9px] uppercase">Instances</span>
            <span className="font-bold text-stone-800">{metadata.recordCount.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[9px] uppercase">Attributes</span>
            <span className="font-bold text-stone-800">{metadata.featureCount} Features</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[9px] uppercase">Dataset Type</span>
            <span className="font-bold text-stone-800">{metadata.datasetType}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[9px] uppercase">Target Endpoint</span>
            <span className="font-bold text-stone-800 truncate block" title={metadata.targetVariable}>{metadata.targetVariable}</span>
          </div>
        </div>

        {metadata.citation && (
          <div className="text-[11px] text-stone-500 bg-amber-50/50 p-2 rounded border border-amber-200/40 font-mono">
            <span className="font-bold text-stone-700 block mb-0.5">Authoritative Citation:</span>
            {metadata.citation}
          </div>
        )}
      </div>
    );
  }

  // Default 'badge' variant
  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={metadata.repositoryUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 hover:bg-amber-500/20 text-stone-800 border border-amber-300/40 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50 group ${className}`}
      >
        <span className="font-bold text-amber-900 group-hover:text-amber-950 truncate max-w-[130px]">
          {datasetName || metadata.shortName}
        </span>
        <span className="text-[9px] px-1 py-0.2 bg-amber-500/20 text-amber-950 rounded font-mono font-semibold">
          {metadata.sourceName === 'UCI Machine Learning Repository' ? 'UCI' : 'Source'}
        </span>
        <ExternalLink className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" aria-hidden="true" />
      </a>

      {/* Popover on Hover */}
      {showPopoverOnHover && isHovered && (
        <div 
          role="tooltip"
          className="absolute bottom-full left-0 mb-2 z-50 w-72 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-amber-300/70 shadow-lg text-xs space-y-2 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-start justify-between gap-1 border-b border-amber-200/50 pb-1.5">
            <div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-500/15 px-2 py-0.5 rounded-full font-bold">
                {metadata.sourceName}
              </span>
              <h4 className="font-bold text-stone-900 mt-1 leading-snug">{metadata.shortName}</h4>
            </div>
          </div>
          <p className="text-[11px] text-stone-600 line-clamp-3 leading-relaxed">
            {metadata.description}
          </p>
          <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-amber-200/40">
            <span className="font-mono">{metadata.recordCount.toLocaleString()} cases · {metadata.featureCount} vars</span>
            <span className="text-amber-700 font-bold flex items-center gap-0.5">
              Official Repository ↗
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
