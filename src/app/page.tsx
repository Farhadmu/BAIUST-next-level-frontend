'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { AnnouncementTicker } from '@/components/layout/AnnouncementTicker';
import { HeroSection } from '@/components/landing/HeroSection';
import { EditorialAnnouncements } from '@/components/landing/EditorialAnnouncements';
import { InteractiveCareerTracks } from '@/components/landing/InteractiveCareerTracks';
import { AcademicPreview } from '@/components/landing/AcademicPreview';
import { ToolsPreview } from '@/components/landing/ToolsPreview';
import { CommunityAlumniPreview } from '@/components/landing/CommunityAlumniPreview';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/modals/SearchModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { StudentDashboardView } from '@/components/dashboard/StudentDashboardView';

import { FloatingAiCopilot } from '@/components/ai/FloatingAiCopilot';

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // User state (starts null; once logged in, can view personalized cockpit)
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [viewingDashboard, setViewingDashboard] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setViewingDashboard(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewingDashboard(false);
  };

  const handleNavigate = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If student is logged in and viewing personalized cockpit:
  if (viewingDashboard && currentUser) {
    return (
      <div className="relative">
        <StudentDashboardView
          user={currentUser}
          onLogout={handleLogout}
          onNavigateHome={() => setViewingDashboard(false)}
        />
        <FloatingAiCopilot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07100C] text-[#F2F5F3] font-sans selection:bg-[#39D98A] selection:text-[#07100C]">
      
      {/* 1. Futuristic Top Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={handleOpenAuth}
        activeRole={currentUser?.role || 'GUEST'}
      />

      {/* 2. Slim Announcement Ticker */}
      <AnnouncementTicker
        onSelect={(item) => {
          handleNavigate('#announcements');
        }}
      />

      {/* 3. Hero Section with Circuit Background & Telemetry */}
      <HeroSection
        onExplore={() => handleNavigate('#career')}
        onStart={() => handleOpenAuth('register')}
      />

      {/* 4. Latest Announcements (Editorial & News-Feed Style) */}
      <EditorialAnnouncements />

      {/* 5. Career Path Section ("WHERE DO YOU WANT TO GO?" - Interactive Rows) */}
      <InteractiveCareerTracks />

      {/* 6. Academic Hub Preview (Lectures, Question Papers, Lab Manuals) */}
      <AcademicPreview />

      {/* 7. Student Tools Platform (A4 Cover Page Generator, PDF Engine, Dev Suite) */}
      <ToolsPreview />

      {/* 8. Community & Alumni Mentorship Preview ("Ask a Senior") */}
      <CommunityAlumniPreview />

      {/* 9. Technical Engineering Footer */}
      <Footer />

      {/* Interactive Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Authentication Gateway Modal (Login / Register) */}
      <AuthModal
        isOpen={authOpen}
        initialMode={authMode}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* 10. Persistent Context-Aware AI Copilot */}
      <FloatingAiCopilot />

    </div>
  );
}
