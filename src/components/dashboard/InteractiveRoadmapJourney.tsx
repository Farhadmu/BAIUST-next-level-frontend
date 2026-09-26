'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass, CheckCircle, Clock, BookOpen, Code, Award, ExternalLink,
  ChevronRight, Sparkles, AlertCircle, ArrowRight, Layers, Lock, Play,
  FolderGit2, Check, Star, Zap, Shield, Laptop, RefreshCw, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '@/lib/api';

export interface MilestoneResource {
  title: string;
  type: 'VIDEO' | 'DOCS' | 'ARTICLE';
  url: string;
}

export interface MilestonePracticeTask {
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  description: string;
  link?: string;
}

export interface MilestoneMiniProject {
  title: string;
  description: string;
  expectedDeliverables: string[];
}

export interface RoadmapMilestone {
  id: string;
  order: number;
  level?: string;
  title: string;
  description?: string;
  status: 'COMPLETED' | 'CURRENT' | 'UPCOMING';
  skillSlug?: string;
  type?: string;
  estimatedTime?: string;
  why?: string;
  baiustCourse?: string;
  resources?: MilestoneResource[];
  practiceTasks?: MilestonePracticeTask[];
  miniProject?: MilestoneMiniProject;
}

export interface TrackMeta {
  slug: string;
  title: string;
  category: 'WEB' | 'AI' | 'CP' | 'SECURITY' | 'CLOUD';
  description: string;
  icon: string;
  badge: string;
  estimatedTime: string;
  totalMilestones: number;
  keyTechnologies: string[];
  baiustRelevance: string;
}

interface InteractiveRoadmapJourneyProps {
  initialRoadmap: any;
  onRoadmapUpdate?: (updated: any) => void;
  onXpEarned?: (amount: number) => void;
}

export const InteractiveRoadmapJourney: React.FC<InteractiveRoadmapJourneyProps> = ({
  initialRoadmap,
  onRoadmapUpdate,
  onXpEarned,
}) => {
  const [roadmap, setRoadmap] = useState<any>(initialRoadmap);
  const [tracks, setTracks] = useState<TrackMeta[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<RoadmapMilestone | null>(null);
  const [switchingTrack, setSwitchingTrack] = useState(false);
  const [projectSubmissionUrl, setProjectSubmissionUrl] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  useEffect(() => {
    setRoadmap(initialRoadmap);
  }, [initialRoadmap]);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      const data = await api.getRoadmapTracks();
      if (data && data.length > 0) {
        setTracks(data);
      }
    } catch (e) {
      // Fallback
    }
  };

  const handleSelectTrack = async (trackSlug: string) => {
    setSwitchingTrack(true);
    try {
      const newRoadmap = await api.generateRoadmap(trackSlug);
      setRoadmap(newRoadmap);
      if (onRoadmapUpdate) onRoadmapUpdate(newRoadmap);
      setSelectedMilestone(null);
    } catch (e) {
      // Fallback local switch
      alert('Could not switch track on server. Using offline track preview.');
    } finally {
      setSwitchingTrack(false);
    }
  };

  const handleToggleMilestone = async (m: RoadmapMilestone) => {
    const isNowCompleting = m.status !== 'COMPLETED';

    try {
      await api.toggleMilestone(m.id);
      const updated = await api.getActiveRoadmap();
      setRoadmap(updated);
      if (onRoadmapUpdate) onRoadmapUpdate(updated);

      if (selectedMilestone?.id === m.id) {
        setSelectedMilestone({
          ...selectedMilestone,
          status: isNowCompleting ? 'COMPLETED' : 'CURRENT',
        });
      }
    } catch (e) {
      // Local optimistic update
      const updatedMilestones = (roadmap?.milestones || []).map((item: any) => {
        if (item.id === m.id) {
          return { ...item, status: isNowCompleting ? 'COMPLETED' : 'CURRENT' };
        }
        return item;
      });
      const localUpdated = { ...roadmap, milestones: updatedMilestones };
      setRoadmap(localUpdated);
      if (onRoadmapUpdate) onRoadmapUpdate(localUpdated);

      if (selectedMilestone?.id === m.id) {
        setSelectedMilestone({
          ...selectedMilestone,
          status: isNowCompleting ? 'COMPLETED' : 'CURRENT',
        });
      }
    }

    if (isNowCompleting) {
      // Trigger confetti celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#39D98A', '#0F6B45', '#F2F5F3', '#FFD166'],
        });
      } catch (err) {
        // Confetti non-critical
      }
      if (onXpEarned) onXpEarned(100);
    }
  };

  const milestones: RoadmapMilestone[] = roadmap?.milestones || [];
  const completedCount = milestones.filter((m) => m.status === 'COMPLETED').length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;
  const currentMilestone = milestones.find((m) => m.status === 'CURRENT') || milestones[0];

  // Group milestones by Level
  const levels = Array.from(new Set(milestones.map((m) => m.level || 'CORE MASTERY')));

  const filteredMilestones = milestones.filter((m) => {
    if (filterLevel === 'ALL') return true;
    return m.level === filterLevel;
  });

  const activeTrackMeta = tracks.find(
    (t) => t.slug === roadmap?.targetRole || t.slug === roadmap?.targetRole?.toLowerCase().replace(/\s+/g, '-')
  ) || tracks[0];

  return (
    <div className="space-y-6">
      
      {/* ========================================================= */}
      {/* 1. TRACK SELECTOR CAROUSEL                                */}
      {/* ========================================================= */}
      <div className="rounded-2xl border border-[#143526] bg-[#0B241A] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#143526] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#39D98A]" />
              <h2 className="text-lg font-bold text-[#F2F5F3]">CHOOSE YOUR CAREER JOURNEY</h2>
            </div>
            <p className="font-mono text-xs text-[#8A9A92] mt-0.5">
              Select any specialized CSE track. Your milestone quest and projects will dynamically adapt.
            </p>
          </div>
          {switchingTrack && (
            <div className="flex items-center gap-2 font-mono text-xs text-[#39D98A]">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Generating Track Journey...</span>
            </div>
          )}
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {(tracks.length > 0 ? tracks : [
            {
              slug: 'full-stack-developer',
              title: 'Full-Stack Web Dev',
              category: 'WEB',
              description: 'Frontend, backend, databases & cloud.',
              icon: '🌐',
              badge: 'CORE',
              estimatedTime: '16 Weeks',
              totalMilestones: 8,
              keyTechnologies: ['React', 'Next.js', 'NestJS', 'PostgreSQL'],
              baiustRelevance: 'BAIUST CSE-211 & CSE-312',
            },
            {
              slug: 'ai-ml-engineer',
              title: 'AI & Machine Learning',
              category: 'AI',
              description: 'Math, PyTorch, Deep Learning & LLMs.',
              icon: '🤖',
              badge: 'FUTURE',
              estimatedTime: '18 Weeks',
              totalMilestones: 8,
              keyTechnologies: ['Python', 'PyTorch', 'Pandas', 'FastAPI'],
              baiustRelevance: 'BAIUST CSE-411 AI',
            },
            {
              slug: 'competitive-programming',
              title: 'Competitive Programming',
              category: 'CP',
              description: 'C++ STL, Trees, DP & Contest Speed.',
              icon: '⚡',
              badge: 'CONTEST',
              estimatedTime: '20 Weeks',
              totalMilestones: 8,
              keyTechnologies: ['C++20', 'STL', 'DP', 'Graphs'],
              baiustRelevance: 'BAIUST Contest Club',
            },
            {
              slug: 'cyber-security',
              title: 'Cyber Security',
              category: 'SECURITY',
              description: 'Linux, Wireshark, OWASP & CTF.',
              icon: '🛡️',
              badge: 'SHIELD',
              estimatedTime: '16 Weeks',
              totalMilestones: 8,
              keyTechnologies: ['Linux', 'Wireshark', 'Cryptography'],
              baiustRelevance: 'BAIUST CSE-323 Networks',
            },
            {
              slug: 'devops-cloud',
              title: 'DevOps & Cloud',
              category: 'CLOUD',
              description: 'Docker, CI/CD, Kubernetes & SRE.',
              icon: '☁️',
              badge: 'SCALE',
              estimatedTime: '14 Weeks',
              totalMilestones: 8,
              keyTechnologies: ['Docker', 'Kubernetes', 'Actions'],
              baiustRelevance: 'BAIUST CSE-422 Cloud',
            },
          ]).map((t: any) => {
            const isSelected =
              roadmap?.targetRole?.toLowerCase().replace(/\s+/g, '-') === t.slug ||
              roadmap?.targetRole === t.title;

            return (
              <div
                key={t.slug}
                onClick={() => !switchingTrack && handleSelectTrack(t.slug)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-[#0E2F22] border-[#39D98A] shadow-[0_0_20px_rgba(57,217,138,0.25)] scale-[1.02]'
                    : 'bg-[#07100C] border-[#143526] hover:border-[#1D533C] hover:bg-[#091b14]'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2.5 right-3 bg-[#39D98A] text-[#07100C] font-mono text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                    ACTIVE TRACK
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{t.icon}</span>
                    <span className="font-mono text-[9px] text-[#556B60] uppercase bg-[#0B241A] px-1.5 py-0.5 rounded border border-[#143526]">
                      {t.estimatedTime}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xs font-bold ${isSelected ? 'text-[#39D98A]' : 'text-[#F2F5F3]'}`}>
                      {t.title}
                    </h3>
                    <p className="text-[10px] text-[#8A9A92] line-clamp-2 mt-1">
                      {t.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#143526]/60 mt-3 flex items-center justify-between font-mono text-[9px]">
                  <span className="text-[#556B60]">{t.totalMilestones || 8} Milestones</span>
                  <span className={isSelected ? 'text-[#39D98A] font-bold' : 'text-[#8A9A92] group-hover:text-[#F2F5F3]'}>
                    {isSelected ? 'IN PROGRESS →' : 'SELECT TRACK →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. PROGRESS BANNER & NEXT FOCUS                           */}
      {/* ========================================================= */}
      <div className="rounded-2xl border border-[#143526] bg-gradient-to-r from-[#0B241A] via-[#0E2F22] to-[#07100C] p-6 space-y-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#39D98A]" />
              <span className="font-mono text-xs text-[#39D98A] uppercase font-bold tracking-wider">
                ACTIVE JOURNEY: {roadmap?.targetRole?.toUpperCase()?.replace(/-/g, ' ') || 'FULL STACK DEVELOPER'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#F2F5F3]">
              {completedCount === milestones.length && milestones.length > 0
                ? '🎉 Congratulations! You have conquered this entire track!'
                : `Progress: ${progressPercent}% Completed (${completedCount} of ${milestones.length} Milestones Mastered)`}
            </h3>
            {activeTrackMeta?.baiustRelevance && (
              <p className="text-xs text-[#8A9A92] flex items-center gap-1.5 pt-0.5">
                <Laptop className="h-3.5 w-3.5 text-[#39D98A]" />
                <span>Academic Synergy: {activeTrackMeta.baiustRelevance}</span>
              </p>
            )}
          </div>

          {/* Quick CTA to Current Milestone */}
          {currentMilestone && (
            <button
              onClick={() => setSelectedMilestone(currentMilestone)}
              className="px-5 py-2.5 rounded-xl bg-[#39D98A] hover:bg-[#2fc47a] text-[#07100C] font-mono text-xs font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(57,217,138,0.3)] flex items-center gap-2 shrink-0"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>CONTINUE STEP {currentMilestone.order}: {currentMilestone.title.slice(0, 24)}...</span>
            </button>
          )}
        </div>

        {/* Global Journey Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-mono text-xs text-[#8A9A92]">
            <span>TRACK COMPLETION PROGRESS</span>
            <span className="text-[#39D98A] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#07100C] h-3 rounded-full overflow-hidden border border-[#143526]">
            <div
              className="bg-gradient-to-r from-[#0F6B45] via-[#2fc47a] to-[#39D98A] h-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. LEVEL FILTER TABS                                      */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
        <button
          onClick={() => setFilterLevel('ALL')}
          className={`px-3.5 py-1.5 rounded-xl border transition-all shrink-0 ${
            filterLevel === 'ALL'
              ? 'bg-[#39D98A] text-[#07100C] font-bold border-[#39D98A]'
              : 'bg-[#0B241A] text-[#8A9A92] border-[#143526] hover:text-[#F2F5F3]'
          }`}
        >
          ALL MILESTONES ({milestones.length})
        </button>
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilterLevel(lvl)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all shrink-0 ${
              filterLevel === lvl
                ? 'bg-[#39D98A] text-[#07100C] font-bold border-[#39D98A]'
                : 'bg-[#0B241A] text-[#8A9A92] border-[#143526] hover:text-[#F2F5F3]'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 4. VISUAL MILESTONE JOURNEY QUEST                         */}
      {/* ========================================================= */}
      <div className="space-y-4">
        {filteredMilestones.map((m, idx) => {
          const isDone = m.status === 'COMPLETED';
          const isCurrent = m.status === 'CURRENT';

          return (
            <div
              key={m.id || idx}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isDone
                  ? 'bg-[#07100C]/90 border-[#143526] text-[#F2F5F3]'
                  : isCurrent
                  ? 'bg-[#0B241A] border-[#39D98A] shadow-[0_0_25px_rgba(57,217,138,0.2)] ring-1 ring-[#39D98A]'
                  : 'bg-[#07100C]/70 border-[#143526]/80 text-[#8A9A92]'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left: Status Node + Info */}
                <div className="flex items-start gap-3.5">
                  
                  {/* Step Completion Circle */}
                  <button
                    onClick={() => handleToggleMilestone(m)}
                    title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                    className={`mt-1 h-7 w-7 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                      isDone
                        ? 'bg-[#39D98A] border-[#39D98A] text-[#07100C] hover:opacity-80'
                        : isCurrent
                        ? 'border-[#39D98A] bg-[#0E2F22] text-[#39D98A] hover:bg-[#39D98A] hover:text-[#07100C] animate-pulse'
                        : 'border-[#1D533C] bg-[#07100C] text-[#556B60] hover:border-[#39D98A]'
                    }`}
                  >
                    {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : <span className="font-mono text-xs font-bold">{m.order}</span>}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-[#39D98A] font-bold bg-[#0E2F22] px-2 py-0.5 rounded border border-[#1D533C]">
                        {m.level || `STEP ${m.order}`}
                      </span>
                      {m.baiustCourse && (
                        <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                          {m.baiustCourse}
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-[#556B60]">
                        ⏱️ {m.estimatedTime || '2 weeks'}
                      </span>
                    </div>

                    <h4 className={`text-base font-bold transition-colors ${
                      isDone ? 'line-through text-[#8A9A92]' : 'text-[#F2F5F3]'
                    }`}>
                      {m.title}
                    </h4>

                    {m.description && (
                      <p className="text-xs text-[#8A9A92] max-w-3xl leading-relaxed">
                        {m.description}
                      </p>
                    )}

                    {m.why && (
                      <div className="font-mono text-[10px] text-[#556B60] flex items-center gap-1.5 pt-0.5">
                        <Sparkles className="h-3 w-3 text-[#39D98A]" />
                        <span>Why this matters: {m.why}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                  <button
                    onClick={() => handleToggleMilestone(m)}
                    className={`font-mono text-xs px-3.5 py-1.5 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-[#0E2F22] border-[#1D533C] text-[#39D98A] hover:bg-[#143526]'
                        : 'bg-[#07100C] border-[#143526] text-[#8A9A92] hover:border-[#39D98A] hover:text-[#F2F5F3]'
                    }`}
                  >
                    {isDone ? '✓ Completed' : 'Mark Done (+100 XP)'}
                  </button>

                  <button
                    onClick={() => setSelectedMilestone(m)}
                    className="font-mono text-xs px-4 py-1.5 rounded-xl bg-[#0E2F22] hover:bg-[#143526] border border-[#39D98A] text-[#39D98A] font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(57,217,138,0.15)]"
                  >
                    <span>VIEW MISSION</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 5. MILESTONE MISSION DETAIL MODAL / DRAWER                */}
      {/* ========================================================= */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#39D98A] bg-[#07100C] p-6 sm:p-8 space-y-6 shadow-2xl text-[#F2F5F3]">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#143526] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#39D98A] font-bold bg-[#0E2F22] px-2.5 py-1 rounded border border-[#1D533C]">
                    {selectedMilestone.level || `MILESTONE ${selectedMilestone.order}`}
                  </span>
                  <span className="font-mono text-xs text-[#8A9A92]">
                    ⏱️ {selectedMilestone.estimatedTime || '2 weeks'}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#F2F5F3] pt-1">
                  {selectedMilestone.title}
                </h3>
                {selectedMilestone.baiustCourse && (
                  <p className="font-mono text-xs text-cyan-400">
                    🎓 Academic Synergy: {selectedMilestone.baiustCourse}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedMilestone(null)}
                className="p-2 rounded-xl bg-[#0B241A] border border-[#143526] hover:border-[#39D98A] text-[#8A9A92] hover:text-[#F2F5F3] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Description & Why */}
            <div className="p-4 rounded-2xl bg-[#0B241A] border border-[#143526] space-y-2">
              <p className="text-xs text-[#E0E6E2] leading-relaxed">
                {selectedMilestone.description}
              </p>
              {selectedMilestone.why && (
                <p className="font-mono text-[11px] text-[#39D98A] pt-1 border-t border-[#143526]/60">
                  ⚡ Industry Value: {selectedMilestone.why}
                </p>
              )}
            </div>

            {/* Curated Resources */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#39D98A]" />
                <h4 className="font-mono text-xs font-bold uppercase text-[#F2F5F3]">
                  1. WHAT TO LEARN // CURATED RESOURCES
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(selectedMilestone.resources || [
                  { title: 'Official Documentation & Specs', type: 'DOCS', url: 'https://developer.mozilla.org' },
                  { title: 'Complete Visual Video Masterclass', type: 'VIDEO', url: 'https://youtube.com' },
                  { title: 'Industry Best Practices & Pitfalls', type: 'ARTICLE', url: 'https://github.com' },
                ]).map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#0B241A] border border-[#143526] hover:border-[#39D98A] flex items-center justify-between group transition-all"
                  >
                    <div className="space-y-0.5">
                      <span className="font-mono text-[9px] text-[#39D98A] block uppercase">{res.type}</span>
                      <span className="text-xs font-semibold text-[#F2F5F3] group-hover:text-[#39D98A] transition-colors">
                        {res.title}
                      </span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-[#556B60] group-hover:text-[#39D98A] shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Practice Drills */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-[#39D98A]" />
                <h4 className="font-mono text-xs font-bold uppercase text-[#F2F5F3]">
                  2. HANDS-ON CODING DRILLS // LAB EXERCISES
                </h4>
              </div>

              <div className="space-y-2">
                {(selectedMilestone.practiceTasks || [
                  {
                    title: 'Core Concept Implementation & Edge Case Testing',
                    difficulty: 'MEDIUM',
                    description: 'Implement the fundamental algorithm/component and verify boundary inputs.',
                  },
                ]).map((task, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#0B241A] border border-[#143526] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F2F5F3]">{task.title}</span>
                      <span className={`font-mono text-[9px] px-2 py-0.5 rounded font-bold ${
                        task.difficulty === 'EASY'
                          ? 'bg-green-950/60 text-green-400 border border-green-800'
                          : task.difficulty === 'MEDIUM'
                          ? 'bg-yellow-950/60 text-yellow-400 border border-yellow-800'
                          : 'bg-red-950/60 text-red-400 border border-red-800'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8A9A92]">{task.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone Mini-Project */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-[#39D98A]" />
                <h4 className="font-mono text-xs font-bold uppercase text-[#F2F5F3]">
                  3. MILESTONE MINI-PROJECT // PORTFOLIO PROOF
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-[#0B241A] border border-[#143526] space-y-3">
                <div>
                  <h5 className="text-xs font-bold text-[#39D98A]">
                    {selectedMilestone.miniProject?.title || `${selectedMilestone.title} Project Deliverable`}
                  </h5>
                  <p className="text-[11px] text-[#8A9A92] mt-0.5">
                    {selectedMilestone.miniProject?.description || 'Build a functional, clean repository demonstrating this capability.'}
                  </p>
                </div>

                {selectedMilestone.miniProject?.expectedDeliverables && (
                  <div className="space-y-1 font-mono text-[10px] text-[#8A9A92]">
                    <span className="text-[#556B60] uppercase block">Expected Deliverables:</span>
                    {selectedMilestone.miniProject.expectedDeliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[#E0E6E2]">
                        <span className="text-[#39D98A]">✓</span>
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* GitHub Submission Input */}
                <div className="pt-2 border-t border-[#143526]/60 flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    placeholder="https://github.com/username/project-repo (Optional)"
                    value={projectSubmissionUrl}
                    onChange={(e) => setProjectSubmissionUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#07100C] border border-[#143526] text-xs text-[#F2F5F3] font-mono focus:outline-none focus:border-[#39D98A]"
                  />
                  <button
                    onClick={() => {
                      if (projectSubmissionUrl) {
                        setSubmissionSuccess(true);
                        setTimeout(() => setSubmissionSuccess(false), 3000);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0E2F22] hover:bg-[#143526] border border-[#1D533C] text-[#39D98A] font-mono text-xs font-bold shrink-0 transition-colors"
                  >
                    {submissionSuccess ? 'LINK SAVED!' : 'ATTACH GITHUB'}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#143526]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8A9A92]">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Rewards: <strong className="text-[#39D98A]">+100 XP</strong>, Skill Level Up</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="px-4 py-2 rounded-xl bg-[#07100C] border border-[#143526] text-[#8A9A92] hover:text-[#F2F5F3] font-mono text-xs"
                >
                  CLOSE
                </button>
                <button
                  onClick={() => {
                    handleToggleMilestone(selectedMilestone);
                  }}
                  className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-lg flex items-center gap-2 ${
                    selectedMilestone.status === 'COMPLETED'
                      ? 'bg-[#0E2F22] text-[#39D98A] border border-[#1D533C] hover:bg-[#143526]'
                      : 'bg-[#39D98A] hover:bg-[#2fc47a] text-[#07100C] hover:scale-105 shadow-[0_0_20px_rgba(57,217,138,0.3)]'
                  }`}
                >
                  {selectedMilestone.status === 'COMPLETED' ? (
                    <>
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span>COMPLETED (CLICK TO REOPEN)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>MARK COMPLETED (+100 XP)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
