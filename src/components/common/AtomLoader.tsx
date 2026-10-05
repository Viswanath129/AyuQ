import React, { useEffect, useRef, useState, FC } from 'react';
import lottie from 'lottie-web/build/player/lottie_light';
import atomAnimationData from '../../assets/atom-loader.json';

export interface AtomLoaderProps {
  size?: number | string;
  className?: string;
  text?: string;
  subtext?: string;
  fullscreen?: boolean;
  speed?: number;
  progress?: number;
  glow?: boolean;
}

export const AtomLoader: FC<AtomLoaderProps> = ({
  size = 130,
  className = '',
  text,
  subtext,
  fullscreen = false,
  speed = 1.25,
  progress,
  glow = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<any>(null);
  const [hasLottieRendered, setHasLottieRendered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    if (animRef.current) {
      try {
        animRef.current.destroy();
      } catch {
        // ignore destroy error
      }
      animRef.current = null;
    }

    // Resolve lottie instance across window global and module import
    const lottieInstance = 
      (typeof window !== 'undefined' && (window as any).lottie?.loadAnimation)
        ? (window as any).lottie
        : (lottie as any)?.loadAnimation
          ? lottie
          : (lottie as any)?.default?.loadAnimation
            ? (lottie as any).default
            : null;

    if (lottieInstance && typeof lottieInstance.loadAnimation === 'function') {
      try {
        animRef.current = lottieInstance.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: atomAnimationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
            progressiveLoad: true
          }
        });

        animRef.current.setSpeed(speed);
        setHasLottieRendered(true);
      } catch (err) {
        console.warn('Lottie initialization warning:', err);
      }
    }

    return () => {
      if (animRef.current) {
        try {
          animRef.current.destroy();
        } catch {
          // ignore destroy error
        }
        animRef.current = null;
      }
    };
  }, [speed]);

  const dimensionStyle =
    typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : { width: size, height: size };

  const content = (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Quantum Atom Graphic with Orbital Field Aura */}
      <div className="relative flex items-center justify-center">
        {glow && (
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/25 via-sky-400/20 to-emerald-400/25 blur-xl pointer-events-none scale-125 animate-pulse" 
            style={{ animationDuration: '2.5s' }}
          />
        )}

        {/* Lottie Container */}
        <div
          ref={containerRef}
          style={dimensionStyle}
          className="relative filter drop-shadow-[0_6px_16px_rgba(245,158,11,0.28)] transition-transform duration-300 overflow-visible z-10"
        />

        {/* CSS/SVG Standby Fallback if Lottie is loading */}
        {!hasLottieRendered && (
          <div 
            style={dimensionStyle} 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/60 animate-spin" />
              <div className="absolute inset-[-6px] rounded-full border-2 border-dotted border-sky-500/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Primary Status Label & Technical Subtext */}
      {text && (
        <div className="mt-4 text-center px-4 max-w-sm z-10">
          <p className="text-xs sm:text-sm font-extrabold text-stone-900 tracking-tight flex items-center justify-center gap-1.5 font-mono">
            {text}
          </p>
          {subtext && (
            <p className="text-[11px] text-stone-600 mt-1 font-mono font-medium leading-relaxed">
              {subtext}
            </p>
          )}

          {/* Accessible Linear Progress Bar */}
          {progress !== undefined && (
            <div className="w-full bg-amber-100/70 h-2 rounded-full overflow-hidden mt-3.5 border border-amber-300/50 shadow-inner">
              <div
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-label={text || 'Loading'}
      >
        <div className="glass-card rounded-3xl p-8 border border-amber-300/70 shadow-2xl max-w-md w-full mx-4 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default AtomLoader;
