'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Code, 
  Layers, 
  Terminal, 
  Cpu, 
  ExternalLink,
  BookOpen,
  Briefcase,
  GitBranch
} from 'lucide-react';

interface CareerTrackItem {
  code: string;
  slug: string;
  title: string;
  tagline: string;
  timeline: string;
  prerequisites: string[];
  skills: string[];
  roadmapNodes: Array<{ step: string; status: 'Ready' | 'Core' | 'Advanced' }>;
  capstoneProject: string;
  interviewPrep: string[];
}

export const InteractiveCareerTracks: React.FC = () => {
  const tracks: CareerTrackItem[] = [
    {
      code: '01',
      slug: 'competitive-programming',
      title: 'COMPETITIVE PROGRAMMING',
      tagline: 'Master data structures, graph theory, dynamic programming, and global rating ladders.',
      timeline: '12 - 18 Months',
      prerequisites: ['C/C++ Fast I/O', 'Discrete Math', 'Algorithm Complexity Analysis'],
      skills: ['STL & Iterators', 'Segment Trees', 'Binary Search on Answers', 'Tree DP', 'Dijkstra & DSU'],
      roadmapNodes: [
        { step: 'C++ STL Mastery', status: 'Ready' },
        { step: 'Complexity & Math Foundations', status: 'Ready' },
        { step: 'Greedy & Two Pointers', status: 'Core' },
        { step: 'Binary Search & Monotonic Spaces', status: 'Core' },
        { step: 'Dynamic Programming (Knapsack to Trees)', status: 'Core' },
        { step: 'Graph Theory & Shortest Path', status: 'Advanced' },
        { step: 'Range Queries & Segment Trees', status: 'Advanced' },
        { step: 'NCPC / ICPC Team Training', status: 'Advanced' },
      ],
      capstoneProject: 'Custom Online Judge System with Sandbox Execution & Test Case Generator',
      interviewPrep: ['LeetCode Hard Problem Walkthroughs', 'Time Complexity Proofs', 'Whiteboard Coding Practice'],
    },
    {
      code: '02',
      slug: 'software-engineering',
      title: 'SOFTWARE ENGINEERING',
      tagline: 'Architect distributed systems, design patterns, clean architecture, and enterprise APIs.',
      timeline: '9 - 12 Months',
      prerequisites: ['Object Oriented Programming', 'Relational Databases', 'Data Structures'],
      skills: ['SOLID Principles', 'Design Patterns', 'Microservices', 'Clean Architecture', 'Event Sourcing'],
      roadmapNodes: [
        { step: 'Object-Oriented Design & Refactoring', status: 'Ready' },
        { step: 'Creational & Behavioral Design Patterns', status: 'Ready' },
        { step: 'Database Normalization & B-Tree Indexes', status: 'Core' },
        { step: 'Clean Architecture & Domain Driven Design', status: 'Core' },
        { step: 'Distributed Message Queues (Kafka/RabbitMQ)', status: 'Advanced' },
        { step: 'High-Availability Caching Strategies (Redis)', status: 'Advanced' },
      ],
      capstoneProject: 'Distributed Multi-Tenant ERP with Event Bus & Audited Ledger',
      interviewPrep: ['System Design (URL Shortener, Uber, Slack)', 'Concurrency & Race Conditions', 'Database Sharding'],
    },
    {
      code: '03',
      slug: 'full-stack-development',
      title: 'FULL STACK DEVELOPMENT',
      tagline: 'Build end-to-end cloud platforms with Next.js, React 19, NestJS, and PostgreSQL.',
      timeline: '8 - 10 Months',
      prerequisites: ['Web Fundamentals', 'JavaScript ES6+', 'Basic SQL'],
      skills: ['Next.js App Router', 'TypeScript', 'NestJS / Express', 'PostgreSQL & Prisma', 'Tailwind CSS'],
      roadmapNodes: [
        { step: 'HTML5 Semantic & Modern CSS Layouts', status: 'Ready' },
        { step: 'TypeScript Strict Types & Generics', status: 'Ready' },
        { step: 'React 19 & Next.js Server Components', status: 'Core' },
        { step: 'NestJS REST APIs & Modular Guards', status: 'Core' },
        { step: 'PostgreSQL Schema, Indexes & Prisma ORM', status: 'Core' },
        { step: 'JWT Refresh Token Security & RBAC', status: 'Core' },
        { step: 'Docker Containerization & CI/CD Actions', status: 'Advanced' },
      ],
      capstoneProject: 'Production University Ecosystem Portal (CSE HUB) with Real-Time Sockets',
      interviewPrep: ['Frontend State & Rendering Cycles', 'API Contract Design & Idempotency', 'Full-Stack Performance'],
    },
    {
      code: '04',
      slug: 'ai-machine-learning',
      title: 'AI / MACHINE LEARNING',
      tagline: 'Develop neural networks, computer vision, natural language transformers, and LLM RAG pipelines.',
      timeline: '10 - 14 Months',
      prerequisites: ['Linear Algebra', 'Calculus & Probability', 'Python'],
      skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face Transformers', 'Vector DBs (Pinecone/Chroma)'],
      roadmapNodes: [
        { step: 'Python for Scientific Computing (NumPy/Pandas)', status: 'Ready' },
        { step: 'Classical ML Algorithms & Cost Functions', status: 'Ready' },
        { step: 'Deep Neural Networks & Backpropagation', status: 'Core' },
        { step: 'Computer Vision (CNNs & Object Detection)', status: 'Core' },
        { step: 'Transformers, Self-Attention & LLM Tuning', status: 'Advanced' },
        { step: 'Retrieval Augmented Generation (RAG) Systems', status: 'Advanced' },
      ],
      capstoneProject: 'Grounded Academic RAG Assistant with Hybrid Vector & Keyword Search',
      interviewPrep: ['Bias-Variance Tradeoff', 'Attention Mechanism Derivation', 'Model Evaluation Metrics'],
    },
    {
      code: '05',
      slug: 'data-science',
      title: 'DATA SCIENCE',
      tagline: 'Extract predictive intelligence from big datasets using exploratory analytics and statistical models.',
      timeline: '8 - 10 Months',
      prerequisites: ['Applied Statistics', 'SQL Basics', 'Python Fundamentals'],
      skills: ['Advanced SQL', 'Pandas & Polars', 'Exploratory Analysis', 'A/B Testing', 'PowerBI / Tableau'],
      roadmapNodes: [
        { step: 'Window Functions & Advanced SQL Queries', status: 'Ready' },
        { step: 'Exploratory Data Analysis & Visualizations', status: 'Ready' },
        { step: 'Hypothesis Testing & Statistical Inference', status: 'Core' },
        { step: 'Predictive Modeling & Feature Engineering', status: 'Core' },
      ],
      capstoneProject: 'Student Academic Performance Early Warning & Prediction Pipeline',
      interviewPrep: ['A/B Testing Methodology', 'Handling Imbalanced Datasets', 'SQL Query Optimization'],
    },
    {
      code: '06',
      slug: 'cyber-security',
      title: 'CYBER SECURITY',
      tagline: 'Penetration testing, cryptography, network packet forensics, and OWASP web application defense.',
      timeline: '10 - 12 Months',
      prerequisites: ['Computer Networks (TCP/IP)', 'Linux OS & Permissions', 'Web Protocols'],
      skills: ['Wireshark', 'Burp Suite', 'Metasploit', 'Cryptography & PKI', 'OWASP Top 10 Mitigation'],
      roadmapNodes: [
        { step: 'Linux Sysadmin & Network Protocol Analysis', status: 'Ready' },
        { step: 'Web Application Security & OWASP Top 10', status: 'Core' },
        { step: 'Network Penetration Testing & Reconnaissance', status: 'Core' },
        { step: 'Applied Cryptography & Security Hardening', status: 'Advanced' },
      ],
      capstoneProject: 'Automated Vulnerability Scanner for Department Web Applications',
      interviewPrep: ['SQL Injection & XSS Exploits', 'Zero-Trust Architecture', 'Security Incident Triage'],
    },
    {
      code: '07',
      slug: 'mobile-development',
      title: 'MOBILE DEVELOPMENT',
      tagline: 'Cross-platform native iOS and Android apps using Flutter, Dart, Kotlin, and offline SQLite sync.',
      timeline: '7 - 9 Months',
      prerequisites: ['Object Oriented Programming', 'REST APIs', 'UI Design Basics'],
      skills: ['Flutter & Dart', 'State Management (Bloc/Provider)', 'Kotlin', 'Offline Local Storage', 'Push Notifications'],
      roadmapNodes: [
        { step: 'Dart Language & Flutter Widget Tree', status: 'Ready' },
        { step: 'Clean State Management (Bloc / Riverpod)', status: 'Core' },
        { step: 'REST API Integration & Local SQLite Cache', status: 'Core' },
        { step: 'Native Device Hardware (Camera/Sensors/GPS)', status: 'Advanced' },
      ],
      capstoneProject: 'Campus Shuttle Live Bus Tracker & Student Attendance Mobile App',
      interviewPrep: ['Flutter Rendering Pipeline', 'Memory Management in Mobile', 'App Store Publishing'],
    },
    {
      code: '08',
      slug: 'devops-cloud',
      title: 'DEVOPS / CLOUD',
      tagline: 'Container orchestration with Kubernetes, CI/CD automation, Terraform IaC, and cloud infrastructure.',
      timeline: '9 - 11 Months',
      prerequisites: ['Linux Command Line', 'Networking', 'Git & GitHub'],
      skills: ['Docker', 'Kubernetes', 'GitHub Actions CI/CD', 'Terraform', 'AWS & Cloudflare', 'Prometheus & Grafana'],
      roadmapNodes: [
        { step: 'Linux Server Administration & Bash Automation', status: 'Ready' },
        { step: 'Docker Multi-Stage Builds & Compose', status: 'Ready' },
        { step: 'CI/CD Automated Testing & Build Pipelines', status: 'Core' },
        { step: 'Kubernetes Pods, Services & Ingress Controllers', status: 'Advanced' },
        { step: 'Infrastructure as Code (Terraform) on Cloud', status: 'Advanced' },
      ],
      capstoneProject: 'Zero-Downtime Multi-Region Auto-Scaling Kubernetes Cluster',
      interviewPrep: ['Kubernetes CrashLoopBackOff Troubleshooting', 'Blue-Green Deployments', 'Secrets Management'],
    },
    {
      code: '09',
      slug: 'ui-ux-engineering',
      title: 'UI/UX DESIGN & ENGINEERING',
      tagline: 'Figma design systems, accessibility (WCAG), micro-interactions, and component engineering.',
      timeline: '6 - 8 Months',
      prerequisites: ['Graphic Design Sense', 'Basic HTML/CSS', 'Human Psychology'],
      skills: ['Figma Prototyping', 'Design Systems', 'WCAG AAA Standards', 'Motion Design', 'Tailwind / React'],
      roadmapNodes: [
        { step: 'Visual Hierarchy, Typography & Spatial Grids', status: 'Ready' },
        { step: 'Figma Auto-Layout, Variables & Component Sets', status: 'Ready' },
        { step: 'Design Tokens & Tailwind CSS Synchronization', status: 'Core' },
        { step: 'Accessible UI Development & Screen Reader Audits', status: 'Core' },
      ],
      capstoneProject: 'Complete Design System & Component Library for Academic Applications',
      interviewPrep: ['Design System Token Architecture', 'Accessibility Compliance', 'Design-to-Code Handoff'],
    },
    {
      code: '10',
      slug: 'other-cse-careers',
      title: 'OTHER CSE SPECIALIZATIONS',
      tagline: 'Embedded IoT devices, Game Development, Quantum Computing, and QA Automation.',
      timeline: '6 - 10 Months',
      prerequisites: ['Digital Logic', 'C/C++ or C#', 'Hardware Basics'],
      skills: ['Microcontrollers (ESP32/Arduino)', 'Unity / Unreal Engine', 'Cypress / Playwright', 'Sensors & MQTT'],
      roadmapNodes: [
        { step: 'Embedded C & Hardware Interfacing', status: 'Ready' },
        { step: 'Sensor Protocols (I2C, SPI, UART, MQTT)', status: 'Core' },
        { step: 'Automated End-to-End Testing (Playwright)', status: 'Core' },
      ],
      capstoneProject: 'IoT Smart Campus Classroom Energy & Climate Automation Node',
      interviewPrep: ['Hardware Interrupt Handling', 'E2E Testing Flakiness Resolution', 'Memory Constraints'],
    },
  ];

  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const selectedTrack = tracks[activeTrackIndex];

  return (
    <section id="career" className="border-b border-[#143526] bg-[#07100C] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-[#143526] pb-6 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#39D98A] uppercase tracking-wider mb-2">
            <GitBranch className="h-4 w-4" />
            <span>CAREER ENGINE & ROADMAP OS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F2F5F3] uppercase">
            WHERE DO YOU WANT TO GO?
          </h2>
          <p className="text-sm text-[#8A9A92] mt-2 font-mono max-w-2xl">
            Choose your specialized engineering track. Complete topic-by-topic roadmaps, verify project milestones, build a competitive portfolio, and prepare for tier-1 engineering interviews.
          </p>
        </div>

        {/* Layout: Interactive Rows on the Left + Live Technical Roadmap Inspector on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Oversized Interactive Typography Rows (NOT cards!) */}
          <div className="lg:col-span-6 space-y-1.5">
            {tracks.map((track, idx) => {
              const isActive = activeTrackIndex === idx;
              return (
                <div
                  key={track.code}
                  onClick={() => setActiveTrackIndex(idx)}
                  className={`group cursor-pointer flex items-center justify-between p-4 sm:p-5 rounded transition-all border ${
                    isActive
                      ? 'bg-[#0B241A] border-[#39D98A] shadow-lg shadow-[#0B241A]/50 translate-x-1.5'
                      : 'bg-[#081A13]/60 border-[#143526] hover:border-[#1D533C] hover:bg-[#0B241A]/40'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className={`font-mono text-xl sm:text-2xl font-black ${
                      isActive ? 'text-[#39D98A]' : 'text-[#1D533C] group-hover:text-[#8A9A92]'
                    }`}>
                      {track.code}
                    </span>
                    <div>
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight uppercase ${
                        isActive ? 'text-[#F2F5F3]' : 'text-[#8A9A92] group-hover:text-[#F2F5F3]'
                      }`}>
                        {track.title}
                      </h3>
                      <p className="font-mono text-[11px] text-[#556B60] hidden sm:block">
                        {track.timeline} • {track.skills.slice(0, 3).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="hidden sm:inline-block font-mono text-[10px] text-[#39D98A] bg-[#0E2F22] px-2 py-0.5 rounded border border-[#1D533C]">
                        INSPECTING
                      </span>
                    )}
                    <ArrowRight className={`h-5 w-5 transition-transform ${
                      isActive 
                        ? 'text-[#39D98A] translate-x-1' 
                        : 'text-[#143526] group-hover:text-[#8A9A92] group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Technical Roadmap Canvas */}
          <div className="lg:col-span-6 sticky top-24 rounded border border-[#1D533C] bg-[#0B241A] p-6 lg:p-8 space-y-6 shadow-2xl">
            
            {/* Inspector Header */}
            <div className="flex items-start justify-between border-b border-[#143526] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#39D98A] tracking-wider uppercase">
                  ROADMAP BLUEPRINT // {selectedTrack.code}
                </span>
                <h3 className="text-2xl font-black text-[#F2F5F3] uppercase mt-1">
                  {selectedTrack.title}
                </h3>
                <p className="text-xs text-[#8A9A92] mt-1">
                  {selectedTrack.tagline}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-[11px] text-[#8A9A92]">ESTIMATED TIME</span>
                <div className="font-mono text-sm font-bold text-[#39D98A]">{selectedTrack.timeline}</div>
              </div>
            </div>

            {/* Prerequisites & Tech Stack Pills */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-[#556B60] uppercase tracking-wider">
                CORE SKILLS & TECHNOLOGIES:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTrack.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs bg-[#07100C] text-[#39D98A] px-2.5 py-1 rounded border border-[#143526]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Interactive Roadmap Nodes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#556B60] uppercase tracking-wider">
                <span>CURRICULUM MILESTONES:</span>
                <span>{selectedTrack.roadmapNodes.length} MODULES</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {selectedTrack.roadmapNodes.map((node, i) => (
                  <div
                    key={node.step}
                    className="flex items-center justify-between p-2.5 rounded bg-[#07100C]/70 border border-[#143526] hover:border-[#1D533C] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[#556B60] text-[10px]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-[#F2F5F3]">
                        {node.step}
                      </span>
                    </div>

                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                      node.status === 'Ready' 
                        ? 'bg-[#0E2F22] text-[#39D98A] border-[#1D533C]'
                        : node.status === 'Core'
                        ? 'bg-[#143526] text-[#F2F5F3] border-[#1D533C]'
                        : 'bg-[#07100C] text-[#8A9A92] border-[#143526]'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Capstone Project */}
            <div className="p-3.5 rounded bg-[#07100C] border border-[#143526] space-y-1">
              <span className="font-mono text-[10px] text-[#39D98A] font-bold uppercase tracking-wider">
                RECOMMENDED CAPSTONE PROJECT:
              </span>
              <p className="text-xs text-[#F2F5F3] font-medium">
                {selectedTrack.capstoneProject}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => alert(`Enrolling in track: ${selectedTrack.title}. Progress tracking activated!`)}
              className="w-full flex items-center justify-center gap-2 rounded bg-[#0F6B45] hover:bg-[#0A8F56] text-[#F2F5F3] py-3 font-mono text-xs font-bold tracking-wider uppercase border border-[#39D98A]/30 transition-all shadow-md"
            >
              <span>ENROLL IN THIS TRACK & START LEARNING</span>
              <ArrowRight className="h-4 w-4 text-[#39D98A]" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
