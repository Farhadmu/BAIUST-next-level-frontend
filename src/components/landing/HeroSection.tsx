'use client';

import React from 'react';
import { Terminal, ArrowRight, ShieldCheck, Cpu, Code2, GitFork, Users, Database } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onStart }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#143526] bg-[#07100C] py-20 lg:py-28 tech-grid-pattern">
      
      {/* Background Circuit SVG Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#39D98A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F6B45" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {/* Circuit Bus Lines */}
          <path d="M 50 100 L 250 100 L 320 180 L 600 180" stroke="url(#circuit-grad)" strokeWidth="1.5" fill="none" />
          <path d="M 800 50 L 950 200 L 1200 200" stroke="url(#circuit-grad)" strokeWidth="1.5" fill="none" />
          <path d="M 150 450 L 400 450 L 480 380 L 900 380" stroke="url(#circuit-grad)" strokeWidth="1.5" fill="none" />
          
          {/* Circuit Nodes */}
          <circle cx="250" cy="100" r="3" fill="#39D98A" />
          <circle cx="320" cy="180" r="4" fill="#39D98A" className="animate-ping" />
          <circle cx="320" cy="180" r="3" fill="#39D98A" />
          <circle cx="480" cy="380" r="3" fill="#39D98A" />
          <circle cx="950" cy="200" r="4" fill="#39D98A" />
        </svg>
      </div>

      {/* Floating Monospace Code & Algorithmic Badges */}
      <div className="hidden xl:block absolute top-12 left-10 p-2.5 rounded bg-[#0B241A]/90 border border-[#143526] font-mono text-[10px] text-[#8A9A92] opacity-80 backdrop-blur-sm pointer-events-none">
        <div className="text-[#39D98A] font-semibold">// Complexity Spectrum</div>
        <div>O(1) &lt; O(log N) &lt; O(N) &lt; O(N log N)</div>
      </div>

      <div className="hidden xl:block absolute bottom-16 right-12 p-3 rounded bg-[#0B241A]/90 border border-[#143526] font-mono text-[10px] text-[#8A9A92] opacity-80 backdrop-blur-sm pointer-events-none">
        <div className="text-[#39D98A] font-semibold">$ git status --short</div>
        <div className="text-[#F2F5F3]">M core/architecture.rs</div>
        <div className="text-[#39D98A]">A career_tracks/full_stack.json</div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Department Top Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1D533C] bg-[#0B241A]/80 px-3.5 py-1 text-xs font-mono text-[#F2F5F3]">
            <Cpu className="h-3.5 w-3.5 text-[#39D98A]" />
            <span className="text-[#8A9A92]">DEPARTMENT OF CSE</span>
            <span className="text-[#39D98A]">•</span>
            <span>UNIFIED DIGITAL ECOSYSTEM</span>
          </div>
        </div>

        {/* Main Editorial Hero Typography */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F2F5F3] uppercase">
            CSE <span className="text-[#39D98A]">HUB</span>
          </h1>

          <div className="font-mono text-sm sm:text-base font-semibold tracking-widest text-[#39D98A] uppercase">
            LEARN. BUILD. CONNECT. GROW.
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-[#8A9A92] max-w-2xl mx-auto leading-relaxed pt-2">
            Your complete digital ecosystem for CSE academic life, skill development, and career preparation. From freshman orientation to alumni leadership.
          </p>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-[#0F6B45] hover:bg-[#0A8F56] text-[#F2F5F3] px-6 py-3 font-mono text-xs font-bold tracking-wider uppercase border border-[#39D98A]/30 shadow-lg shadow-[#0F6B45]/20 transition-all hover:scale-[1.02]"
            >
              <span>EXPLORE PLATFORM</span>
              <ArrowRight className="h-4 w-4 text-[#39D98A]" />
            </button>

            <button
              onClick={onStart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-[#0B241A] hover:bg-[#0E2F22] text-[#F2F5F3] px-6 py-3 font-mono text-xs font-bold tracking-wider uppercase border border-[#1D533C] hover:border-[#39D98A] transition-all"
            >
              <Terminal className="h-4 w-4 text-[#39D98A]" />
              <span>START YOUR JOURNEY</span>
            </button>
          </div>
        </div>

        {/* Technical Campus Telemetry Bar */}
        <div className="mt-16 pt-10 border-t border-[#143526]/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded bg-[#0B241A]/40 border border-[#143526]">
            <div className="font-mono text-2xl lg:text-3xl font-bold text-[#F2F5F3]">1,420+</div>
            <div className="font-mono text-[11px] text-[#8A9A92] uppercase mt-1">Active CSE Students</div>
          </div>
          <div className="p-4 rounded bg-[#0B241A]/40 border border-[#143526]">
            <div className="font-mono text-2xl lg:text-3xl font-bold text-[#39D98A]">10</div>
            <div className="font-mono text-[11px] text-[#8A9A92] uppercase mt-1">Engineered Career Tracks</div>
          </div>
          <div className="p-4 rounded bg-[#0B241A]/40 border border-[#143526]">
            <div className="font-mono text-2xl lg:text-3xl font-bold text-[#F2F5F3]">14,800+</div>
            <div className="font-mono text-[11px] text-[#8A9A92] uppercase mt-1">Resource Downloads</div>
          </div>
          <div className="p-4 rounded bg-[#0B241A]/40 border border-[#143526]">
            <div className="font-mono text-2xl lg:text-3xl font-bold text-[#39D98A]">48</div>
            <div className="font-mono text-[11px] text-[#8A9A92] uppercase mt-1">Senior Mentors Ready</div>
          </div>
        </div>

      </div>
    </section>
  );
};
