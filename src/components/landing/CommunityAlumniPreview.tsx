'use client';

import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  MessageSquare, 
  ArrowUpRight, 
  Star, 
  CheckCircle,
  Briefcase
} from 'lucide-react';

export const CommunityAlumniPreview: React.FC = () => {
  const mentors = [
    {
      name: 'Farhad Karim',
      batch: 'Batch 32',
      role: 'Staff Infrastructure Engineer',
      company: 'Datadog',
      specialty: 'Distributed Systems & Go',
      verified: true,
      sessionsCompleted: 42,
    },
    {
      name: 'Nuzhat Tabassum',
      batch: 'Batch 34',
      role: 'Senior Machine Learning Scientist',
      company: 'Brain Station 23',
      specialty: 'NLP & LLM Optimization',
      verified: true,
      sessionsCompleted: 29,
    },
    {
      name: 'Tanvir Hossain',
      batch: 'Batch 35',
      role: 'Software Engineer II',
      company: 'DataSoft Systems',
      specialty: 'Next.js & NestJS Full-Stack',
      verified: true,
      sessionsCompleted: 38,
    },
  ];

  const discussions = [
    {
      id: 'd-1',
      title: 'How should 2nd-year students balance CP vs Web Development for summer internships?',
      category: 'CAREER',
      replies: 19,
      author: 'A. Rahman (Batch 39)',
      upvotes: 45,
    },
    {
      id: 'd-2',
      title: 'Common pitfalls in B+ Tree query optimization (CSE-311 DBMS Lab discussion)',
      category: 'ACADEMIC',
      replies: 12,
      author: 'M. S. Al-Amin (Batch 38)',
      upvotes: 31,
    },
    {
      id: 'd-3',
      title: 'Codeforces Round 980 (Div. 2) Problem C Editorial & Alternate Dijkstra approach',
      category: 'CP',
      replies: 28,
      author: 'K. Hasan (Batch 40)',
      upvotes: 64,
    },
  ];

  return (
    <section id="community" className="border-b border-[#143526] bg-[#07100C] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Ask a Senior / Verified Alumni Mentors */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border-b border-[#143526] pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#39D98A] uppercase tracking-wider mb-2">
                <GraduationCap className="h-4 w-4" />
                <span>ALUMNI NETWORK & MENTORSHIP</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F2F5F3] uppercase">
                ASK A SENIOR // VERIFIED ALUMNI
              </h3>
              <p className="text-xs text-[#8A9A92] mt-1 font-mono">
                Connect directly with graduates working at global tech companies for code reviews, roadmap guidance, and mock interviews.
              </p>
            </div>

            <div className="space-y-3">
              {mentors.map((m) => (
                <div
                  key={m.name}
                  className="p-4 rounded border border-[#143526] bg-[#0B241A] hover:border-[#1D533C] transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F2F5F3] text-sm">{m.name}</span>
                      {m.verified && (
                        <span className="inline-flex items-center gap-0.5 font-mono text-[9px] text-[#39D98A] bg-[#0E2F22] px-1.5 py-0.5 rounded border border-[#1D533C]">
                          <CheckCircle className="h-2.5 w-2.5" />
                          VERIFIED
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-[#556B60]">{m.batch}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#8A9A92]">
                      <Building2 className="h-3 w-3 text-[#39D98A]" />
                      <span>{m.role} at <strong className="text-[#F2F5F3]">{m.company}</strong></span>
                    </div>

                    <div className="font-mono text-[10px] text-[#39D98A]">
                      Focus: {m.specialty}
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Requesting 1-on-1 mentorship session with ${m.name}`)}
                    className="shrink-0 rounded bg-[#07100C] hover:bg-[#0F6B45] text-[#F2F5F3] px-3 py-1.5 font-mono text-xs border border-[#143526] hover:border-[#39D98A] transition-all"
                  >
                    REQUEST
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#alumni-directory"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#39D98A] hover:underline"
              >
                <span>BROWSE COMPLETE ALUMNI DIRECTORY (320+ GRADUATES)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Community Discussions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border-b border-[#143526] pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#39D98A] uppercase tracking-wider mb-2">
                <Users className="h-4 w-4" />
                <span>COMMUNITY & STUDY GROUPS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F2F5F3] uppercase">
                PEER DISCUSSIONS & QUESTIONS
              </h3>
              <p className="text-xs text-[#8A9A92] mt-1 font-mono">
                Ask questions, share code snippets, analyze contest problems, and form study groups with classmates.
              </p>
            </div>

            <div className="space-y-3">
              {discussions.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded border border-[#143526] bg-[#0B241A] hover:border-[#1D533C] transition-all space-y-2 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#39D98A] bg-[#07100C] px-2 py-0.5 rounded border border-[#143526]">
                      {d.category}
                    </span>
                    <span className="font-mono text-[10px] text-[#556B60]">
                      {d.author}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-[#F2F5F3] group-hover:text-[#39D98A] transition-colors">
                    {d.title}
                  </h4>

                  <div className="flex items-center gap-4 font-mono text-[10px] text-[#8A9A92] pt-1">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3 text-[#39D98A]" />
                      {d.replies} Replies
                    </span>
                    <span>•</span>
                    <span className="text-[#39D98A]">+{d.upvotes} Upvotes</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert('Starting a new community technical discussion.')}
                className="w-full flex items-center justify-center gap-2 rounded bg-[#0B241A] hover:bg-[#0E2F22] text-[#F2F5F3] py-2.5 font-mono text-xs font-semibold uppercase border border-[#1D533C] hover:border-[#39D98A] transition-all"
              >
                <MessageSquare className="h-3.5 w-3.5 text-[#39D98A]" />
                <span>START A NEW TECHNICAL DISCUSSION</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
