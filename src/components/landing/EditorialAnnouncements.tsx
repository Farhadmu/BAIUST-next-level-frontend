'use client';

import React, { useState } from 'react';
import { Megaphone, ExternalLink, Calendar, UserCheck, Filter, ArrowUpRight } from 'lucide-react';

interface AnnouncementItem {
  id: string;
  index: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  actionText: string;
  actionUrl: string;
  author: string;
  badgeColor?: string;
}

export const EditorialAnnouncements: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const announcements: AnnouncementItem[] = [
    {
      id: 'ann-1',
      index: '01',
      category: 'CONTEST',
      date: '25 SEP 2026',
      title: 'CSE Programming Contest Registration Open (NCPC 2026)',
      summary: 'Registration for the upcoming national programming contest team selection is now available. Open to all students with active Codeforces or LeetCode ratings. Preliminary judge system goes live on October 01.',
      actionText: 'REGISTER NOW',
      actionUrl: '#register',
      author: 'Posted by CSE HUB Moderator',
    },
    {
      id: 'ann-2',
      index: '02',
      category: 'WORKSHOP',
      date: '24 SEP 2026',
      title: 'Cloud-Native Architecture & Microservices Masterclass with Industry Engineers',
      summary: 'A 3-day deep technical hands-on workshop covering Docker, Kubernetes, event-driven message queues, and high-concurrency NestJS microservices. Required for 3rd and 4th-year students.',
      actionText: 'VIEW SCHEDULE & RSVP',
      actionUrl: '#workshop',
      author: 'Posted by Faculty Coordinator',
    },
    {
      id: 'ann-3',
      index: '03',
      category: 'CAREER OPPORTUNITY',
      date: '22 SEP 2026',
      title: 'Verified Alumni Job Dispatch: Associate Software Engineer at Datadog & Brain Station 23',
      summary: 'Exclusive application fast-track submitted by verified department alumni. Open to graduating seniors with strong foundations in Data Structures, SQL, and Web Frameworks.',
      actionText: 'APPLY VIA PORTAL',
      actionUrl: '#jobs',
      author: 'Posted by Alumni Relations Cell',
    },
    {
      id: 'ann-4',
      index: '04',
      category: 'IMPORTANT NOTICE',
      date: '20 SEP 2026',
      title: 'Capstone Project Synopsis Submission & Supervisor Allotment Deadline Extended',
      summary: 'All final semester project groups must submit their formal IEEE/ACM formatted system architecture, database ERD, and faculty supervisor approval before October 05.',
      actionText: 'SUBMIT DOCUMENT',
      actionUrl: '#academic',
      author: 'Posted by CSE Project Committee',
    },
  ];

  const categories = ['ALL', 'CONTEST', 'WORKSHOP', 'CAREER OPPORTUNITY', 'IMPORTANT NOTICE'];

  const filtered = selectedFilter === 'ALL'
    ? announcements
    : announcements.filter((a) => a.category === selectedFilter);

  return (
    <section id="announcements" className="border-b border-[#143526] bg-[#07100C] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#143526] pb-6 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#39D98A] uppercase tracking-wider mb-2">
              <Megaphone className="h-4 w-4" />
              <span>OFFICIAL DISPATCH & BULLETIN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F2F5F3] uppercase">
              LATEST ANNOUNCEMENTS
            </h2>
            <p className="text-sm text-[#8A9A92] mt-1 font-mono">
              Live notifications published directly by Department Faculty, Moderators, and Committee Chairs.
            </p>
          </div>

          {/* Editorial Category Filters */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1 font-mono text-[11px] rounded transition-all ${
                  selectedFilter === cat
                    ? 'bg-[#39D98A] text-[#07100C] font-bold shadow-sm'
                    : 'bg-[#0B241A] text-[#8A9A92] hover:text-[#F2F5F3] border border-[#143526]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Feed (NOT normal card grids - High-impact vertical rows with large typography numbers) */}
        <div className="divide-y divide-[#143526]">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group py-8 lg:py-10 transition-colors hover:bg-[#0B241A]/30 px-2 sm:px-6 rounded"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Number & Metadata Column */}
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4">
                  <span className="font-mono text-4xl lg:text-6xl font-black text-[#143526] group-hover:text-[#39D98A] transition-colors select-none">
                    {item.index}
                  </span>
                  
                  <div className="space-y-1">
                    <span className="inline-block rounded bg-[#0B241A] border border-[#1D533C] px-2 py-0.5 font-mono text-[10px] font-bold text-[#39D98A] tracking-wider uppercase">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#8A9A92]">
                      <Calendar className="h-3 w-3 text-[#39D98A]" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Main Content Column */}
                <div className="lg:col-span-7 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F2F5F3] group-hover:text-[#39D98A] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8A9A92] leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="flex items-center gap-2 pt-2 font-mono text-xs text-[#556B60]">
                    <UserCheck className="h-3.5 w-3.5 text-[#39D98A]" />
                    <span>{item.author}</span>
                  </div>
                </div>

                {/* Action CTA Column */}
                <div className="lg:col-span-2 flex lg:justify-end items-center">
                  <a
                    href={item.actionUrl}
                    className="inline-flex items-center gap-2 rounded bg-[#0B241A] hover:bg-[#0F6B45] text-[#F2F5F3] px-4 py-2.5 font-mono text-xs font-semibold tracking-wider uppercase border border-[#1D533C] hover:border-[#39D98A] transition-all group-hover:scale-105"
                  >
                    <span>{item.actionText}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#39D98A] group-hover:text-white" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
