'use client';

import React from 'react';
import { Terminal, Mail, ShieldAlert, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#143526] bg-[#07100C] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#143526]">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0B241A] border border-[#1D533C]">
                <Terminal className="h-4 w-4 text-[#39D98A]" />
              </div>
              <span className="font-mono text-lg font-bold tracking-tight text-[#F2F5F3]">
                CSE<span className="text-[#39D98A]">HUB</span>
              </span>
            </div>

            <p className="text-xs text-[#8A9A92] leading-relaxed max-w-sm">
              The unified digital ecosystem for Computer Science & Engineering students. One platform for Academic Life, Learning Journey, Career Preparation, Community, Tools, and Alumni Network.
            </p>

            <div className="inline-flex items-center gap-2 rounded bg-[#0B241A] border border-[#143526] px-2.5 py-1">
              <span className="h-2 w-2 rounded-full bg-[#39D98A] animate-pulse" />
              <span className="font-mono text-[10px] text-[#39D98A]">SYSTEMS OPERATIONAL • v1.0.4</span>
            </div>
          </div>

          {/* Links Column 1: Academic & Learning */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2F5F3]">
              ACADEMIC & LEARNING
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#8A9A92]">
              <li><a href="#academic" className="hover:text-[#39D98A] transition-colors">Course Catalog</a></li>
              <li><a href="#academic" className="hover:text-[#39D98A] transition-colors">Lecture Slides</a></li>
              <li><a href="#academic" className="hover:text-[#39D98A] transition-colors">Previous Questions</a></li>
              <li><a href="#academic" className="hover:text-[#39D98A] transition-colors">Lab Manuals</a></li>
              <li><a href="#career" className="hover:text-[#39D98A] transition-colors">Competitive Programming</a></li>
            </ul>
          </div>

          {/* Links Column 2: Career & Workbench */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2F5F3]">
              CAREER & WORKBENCH
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#8A9A92]">
              <li><a href="#career" className="hover:text-[#39D98A] transition-colors">10 Career Tracks</a></li>
              <li><a href="#tools" className="hover:text-[#39D98A] transition-colors">Cover Page Generator</a></li>
              <li><a href="#tools" className="hover:text-[#39D98A] transition-colors">PDF Suite (Merge/Split)</a></li>
              <li><a href="#tools" className="hover:text-[#39D98A] transition-colors">CS Resume Builder</a></li>
              <li><a href="#tools" className="hover:text-[#39D98A] transition-colors">Developer Sandbox</a></li>
            </ul>
          </div>

          {/* Links Column 3: Community & Governance */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2F5F3]">
              COMMUNITY & NETWORK
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#8A9A92]">
              <li><a href="#community" className="hover:text-[#39D98A] transition-colors">Ask a Senior</a></li>
              <li><a href="#community" className="hover:text-[#39D98A] transition-colors">Alumni Directory</a></li>
              <li><a href="#announcements" className="hover:text-[#39D98A] transition-colors">Dispatches & Contests</a></li>
              <li><a href="#jobs" className="hover:text-[#39D98A] transition-colors">Tech Internships</a></li>
              <li><a href="#contact" className="hover:text-[#39D98A] transition-colors">Department Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#556B60]">
          <div>
            © {new Date().getFullYear()} CSE HUB. Engineered exclusively for University Computer Science & Engineering.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#39D98A] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#39D98A] transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-[#39D98A] transition-colors">Security Audit</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
