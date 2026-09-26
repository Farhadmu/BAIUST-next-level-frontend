'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Compass, Wrench, GraduationCap, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const searchableIndex = [
    { title: 'CSE-211: Data Structures and Algorithms', category: 'Academic Course', href: '#academic', icon: BookOpen },
    { title: 'CSE-311: Database Management Systems', category: 'Academic Course', href: '#academic', icon: BookOpen },
    { title: 'Midterm Question Papers (Spring/Fall 2025)', category: 'Exam Archives', href: '#academic', icon: BookOpen },
    { title: 'Competitive Programming Career Track', category: 'Career Track', href: '#career', icon: Compass },
    { title: 'Full Stack Development Track (Next.js & NestJS)', category: 'Career Track', href: '#career', icon: Compass },
    { title: 'Assignment & Lab Report Cover Generator', category: 'Student Tool', href: '#tools', icon: Wrench },
    { title: 'PDF Merge, Split & Compress Suite', category: 'Student Tool', href: '#tools', icon: Wrench },
    { title: 'Farhad Karim (Staff Engineer at Datadog)', category: 'Alumni Mentor', href: '#community', icon: GraduationCap },
  ];

  const results = query.trim() === ''
    ? searchableIndex.slice(0, 5)
    : searchableIndex.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded border border-[#1D533C] bg-[#0B241A] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#143526]">
          <Search className="h-5 w-5 text-[#39D98A] shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, question papers, career tracks, mentors..."
            className="w-full bg-transparent font-mono text-sm text-[#F2F5F3] placeholder-[#556B60] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8A9A92] hover:text-[#F2F5F3]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          <div className="font-mono text-[10px] text-[#556B60] px-3 py-1 uppercase">
            {query.trim() === '' ? 'QUICK DIRECTORY SHORTCUTS' : `MATCHING RESULTS (${results.length})`}
          </div>

          {results.length === 0 ? (
            <div className="p-6 text-center font-mono text-xs text-[#8A9A92]">
              No matching departmental records found.
            </div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigate(item.href);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded hover:bg-[#0E2F22] cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#07100C] border border-[#143526] text-[#39D98A]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-xs text-[#F2F5F3] group-hover:text-[#39D98A] transition-colors">
                        {item.title}
                      </p>
                      <span className="font-mono text-[10px] text-[#8A9A92]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#143526] group-hover:text-[#39D98A] transition-colors" />
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[#143526] bg-[#07100C] font-mono text-[10px] text-[#556B60]">
          <span>Use ESC to close</span>
          <span>ENTER to inspect selected record</span>
        </div>

      </div>
    </div>
  );
};
