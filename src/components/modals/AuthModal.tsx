'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Terminal } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  initialMode = 'login', 
  onClose,
  onSuccess 
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'STUDENT' | 'FACULTY' | 'ALUMNI'>('STUDENT');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [batchNumber, setBatchNumber] = useState('40');
  const [semester, setSemester] = useState('3');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Simulate backend auth check
    setTimeout(() => {
      setLoading(false);
      const mockUser = {
        id: 'usr-' + Date.now(),
        fullName: fullName || (role === 'STUDENT' ? 'Farhadul Islam' : 'Faculty Member'),
        email: email || `${role.toLowerCase()}@university.edu`,
        role,
        studentId: role === 'STUDENT' ? (studentId || '1108019') : undefined,
      };
      onSuccess(mockUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded border border-[#1D533C] bg-[#0B241A] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#143526]">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#39D98A]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2F5F3]">
              CSE HUB // SECURE GATEWAY
            </span>
          </div>
          <button onClick={onClose} className="text-[#8A9A92] hover:text-[#F2F5F3]">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-[#143526]">
          <button
            onClick={() => setMode('login')}
            className={`py-2.5 font-mono text-xs font-bold transition-colors ${
              mode === 'login'
                ? 'bg-[#0E2F22] text-[#39D98A] border-b-2 border-[#39D98A]'
                : 'text-[#8A9A92] hover:text-[#F2F5F3]'
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2.5 font-mono text-xs font-bold transition-colors ${
              mode === 'register'
                ? 'bg-[#0E2F22] text-[#39D98A] border-b-2 border-[#39D98A]'
                : 'text-[#8A9A92] hover:text-[#F2F5F3]'
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Role Selector */}
          <div>
            <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1.5">
              Select Campus Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['STUDENT', 'FACULTY', 'ALUMNI'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-1.5 font-mono text-[11px] rounded transition-all border ${
                    role === r
                      ? 'bg-[#39D98A] text-[#07100C] font-bold border-[#39D98A]'
                      : 'bg-[#07100C] text-[#8A9A92] hover:text-[#F2F5F3] border-[#143526]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-[#556B60]" />
                <input
                  type="text"
                  required
                  placeholder="Farhadul Islam"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded border border-[#143526] bg-[#07100C] pl-9 pr-3 py-2 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                />
              </div>
            </div>
          )}

          {mode === 'register' && role === 'STUDENT' && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-mono text-[9px] text-[#8A9A92] uppercase mb-1">Student ID</label>
                <input
                  type="text"
                  placeholder="1108019"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full rounded border border-[#143526] bg-[#07100C] px-2.5 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] text-[#8A9A92] uppercase mb-1">Batch</label>
                <input
                  type="number"
                  placeholder="40"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  className="w-full rounded border border-[#143526] bg-[#07100C] px-2.5 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] text-[#8A9A92] uppercase mb-1">Semester</label>
                <input
                  type="number"
                  placeholder="3"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded border border-[#143526] bg-[#07100C] px-2.5 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">
              Institutional Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#556B60]" />
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-[#143526] bg-[#07100C] pl-9 pr-3 py-2 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">
              Master Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#556B60]" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-[#143526] bg-[#07100C] pl-9 pr-3 py-2 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded bg-[#0F6B45] hover:bg-[#0A8F56] text-[#F2F5F3] py-2.5 font-mono text-xs font-bold uppercase tracking-wider border border-[#39D98A]/30 transition-all"
          >
            {loading ? (
              <span>AUTHENTICATING SECURE TOKENS...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'ACCESS CSE HUB PORTAL' : 'INITIALIZE REGISTRATION'}</span>
                <ArrowRight className="h-4 w-4 text-[#39D98A]" />
              </>
            )}
          </button>

          <p className="font-mono text-[10px] text-center text-[#556B60] pt-1">
            Protected by Dual-Token JWT & Granular RBAC authorization.
          </p>
        </form>

      </div>
    </div>
  );
};
