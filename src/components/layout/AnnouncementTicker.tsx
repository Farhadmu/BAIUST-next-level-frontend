'use client';

import React from 'react';
import { Radio, ChevronRight } from 'lucide-react';

interface TickerItem {
  id: string;
  category: string;
  title: string;
  href?: string;
}

interface AnnouncementTickerProps {
  items?: TickerItem[];
  onSelect?: (item: TickerItem) => void;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({ items, onSelect }) => {
  const defaultItems: TickerItem[] = [
    { id: 't1', category: 'ANNOUNCEMENT', title: 'CSE CONTEST REGISTRATION OPEN (NCPC 2026 PRELIMINARY)' },
    { id: 't2', category: 'WORKSHOP', title: 'FULL-STACK CLOUD ARCHITECTURE MASTERCLASS WITH INDUSTRY LEADERS' },
    { id: 't3', category: 'NEW RESOURCE', title: 'CSE-311 ADVANCED B+ TREE & QUERY OPTIMIZATION SLIDES UPLOADED' },
    { id: 't4', category: 'IMPORTANT NOTICE', title: 'FINAL YEAR CAPSTONE SYNOPSIS SUBMISSION EXTENDED TO OCT 05' },
    { id: 't5', category: 'ALUMNI TALK', title: 'LANDING HIGH-SCALE BACKEND ROLES BY FARHAD KARIM (DATADOG)' },
  ];

  const activeItems = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="relative w-full border-b border-[#143526] bg-[#081A13] overflow-hidden select-none">
      <div className="mx-auto max-w-7xl flex items-center h-8 px-4 sm:px-6 lg:px-8">
        
        {/* Live Broadcast Badge */}
        <div className="flex items-center gap-2 pr-3 border-r border-[#143526] shrink-0 z-10 bg-[#081A13]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39D98A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39D98A]"></span>
          </span>
          <span className="font-mono text-[10px] font-bold tracking-wider text-[#39D98A] uppercase">
            LIVE BROADCAST
          </span>
        </div>

        {/* Marquee Scroller */}
        <div className="flex-1 overflow-hidden relative flex items-center">
          <div className="animate-ticker flex items-center gap-8 pl-4">
            {/* Double the list for seamless loop */}
            {[...activeItems, ...activeItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => onSelect && onSelect(item)}
                className="flex items-center gap-2 cursor-pointer group shrink-0"
              >
                <span className="font-mono text-[9px] font-semibold tracking-wider text-[#39D98A] bg-[#0B241A] px-1.5 py-0.5 rounded border border-[#1D533C]">
                  {item.category}
                </span>
                <span className="font-mono text-[11px] text-[#F2F5F3] group-hover:text-[#39D98A] transition-colors">
                  {item.title}
                </span>
                <span className="text-[#1D533C] px-1">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action link */}
        <a 
          href="#announcements" 
          className="hidden md:flex items-center gap-1 pl-3 text-[10px] font-mono text-[#8A9A92] hover:text-[#39D98A] border-l border-[#143526] shrink-0 z-10 bg-[#081A13]"
        >
          <span>VIEW ARCHIVE</span>
          <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};
