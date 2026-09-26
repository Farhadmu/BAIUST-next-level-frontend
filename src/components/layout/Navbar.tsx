'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Search, 
  Bell, 
  User, 
  Sparkles, 
  Menu, 
  X,
  Code2,
  BookOpen,
  Compass,
  Wrench,
  Users,
  GraduationCap,
  Calendar,
  Info
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  activeRole?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenAuth, activeRole = 'STUDENT' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navLinks = [
    { label: 'Academic', href: '#academic', icon: BookOpen },
    { label: 'Career', href: '#career', icon: Compass },
    { label: 'Learning', href: '#learning', icon: Code2 },
    { label: 'Tools', href: '#tools', icon: Wrench },
    { label: 'Community', href: '#community', icon: Users },
    { label: 'Alumni', href: '#alumni', icon: GraduationCap },
    { label: 'Events', href: '#events', icon: Calendar },
    { label: 'About', href: '#about', icon: Info },
  ];

  const notifications = [
    { id: '1', title: 'NCPC 2026 Registration Open', time: '10m ago', unread: true },
    { id: '2', title: 'New Course Resource: CSE-311 Slides', time: '1h ago', unread: true },
    { id: '3', title: 'Alumni Mentorship Request Accepted', time: '3h ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#143526] bg-[#07100C]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-[#0B241A] border border-[#1D533C] group-hover:border-[#39D98A] transition-colors">
            <Terminal className="h-5 w-5 text-[#39D98A]" />
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#39D98A] animate-ping" />
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#39D98A]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-lg font-bold tracking-tight text-[#F2F5F3] group-hover:text-[#39D98A] transition-colors">
                CSE<span className="text-[#39D98A]">HUB</span>
              </span>
              <span className="rounded bg-[#0B241A] px-1.5 py-0.5 font-mono text-[10px] text-[#39D98A] border border-[#143526]">
                v1.0
              </span>
            </div>
            <p className="font-mono text-[9px] tracking-wider text-[#8A9A92] uppercase">
              Digital Campus • Ecosystem
            </p>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#8A9A92] hover:text-[#39D98A] hover:bg-[#0B241A]/60 rounded transition-all"
              >
                <Icon className="h-3.5 w-3.5 opacity-70" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded border border-[#143526] bg-[#0B241A]/80 px-2.5 py-1.5 text-xs text-[#8A9A92] hover:border-[#39D98A]/50 hover:text-[#F2F5F3] transition-all"
            title="Global Search (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5 text-[#39D98A]" />
            <span className="hidden md:inline font-mono text-[11px]">Search...</span>
            <kbd className="hidden md:inline-block rounded bg-[#07100C] px-1 font-mono text-[9px] text-[#556B60] border border-[#143526]">
              Ctrl+K
            </kbd>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative flex h-8 w-8 items-center justify-center rounded border border-[#143526] bg-[#0B241A]/80 text-[#8A9A92] hover:text-[#39D98A] hover:border-[#39D98A]/40 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute 1 top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#39D98A]" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded border border-[#1D533C] bg-[#0B241A] p-3 shadow-2xl z-50">
                <div className="flex items-center justify-between border-b border-[#143526] pb-2 mb-2">
                  <span className="font-mono text-xs font-semibold text-[#F2F5F3]">
                    DISPATCH NOTIFICATIONS
                  </span>
                  <span className="text-[10px] text-[#39D98A] font-mono">2 NEW</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="group cursor-pointer rounded p-2 text-xs transition-colors hover:bg-[#0E2F22]"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-[#F2F5F3] group-hover:text-[#39D98A]">
                          {n.title}
                        </p>
                        {n.unread && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#39D98A]" />
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-[#8A9A92]">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth Button */}
          <button
            onClick={() => onOpenAuth('login')}
            className="flex items-center gap-2 rounded bg-[#0B241A] border border-[#1D533C] hover:border-[#39D98A] px-3 py-1.5 text-xs font-mono font-medium text-[#F2F5F3] transition-all"
          >
            <User className="h-3.5 w-3.5 text-[#39D98A]" />
            <span className="hidden sm:inline">LOGIN / PORTAL</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-8 w-8 items-center justify-center rounded border border-[#143526] text-[#8A9A92] hover:text-[#39D98A]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#143526] bg-[#07100C] px-4 py-4 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm text-[#8A9A92] hover:text-[#39D98A] hover:bg-[#0B241A] rounded"
              >
                <Icon className="h-4 w-4 text-[#39D98A]" />
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-3 border-t border-[#143526] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-1/2 py-2 text-xs font-mono border border-[#1D533C] text-center text-[#F2F5F3] rounded"
            >
              LOGIN
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('register');
              }}
              className="w-1/2 py-2 text-xs font-mono bg-[#0F6B45] text-[#F2F5F3] text-center rounded font-semibold"
            >
              REGISTER
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
