'use client';

import React, { useState } from 'react';
import { 
  Wrench, 
  FileCheck, 
  FileStack, 
  FileCode, 
  Scissors, 
  QrCode, 
  Download, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ToolsPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cover' | 'pdf' | 'developer'>('cover');

  // Cover Page Generator State
  const [courseCode, setCourseCode] = useState('CSE-311');
  const [courseTitle, setCourseTitle] = useState('Database Management Systems');
  const [assignmentTitle, setAssignmentTitle] = useState('Lab Report 04: B+ Tree Indexing & Transaction Isolation');
  const [studentName, setStudentName] = useState('Farhadul Islam');
  const [studentId, setStudentId] = useState('1108019');
  const [teacherName, setTeacherName] = useState('Asst. Prof. Tanvir Ahmed');
  const [submissionDate, setSubmissionDate] = useState('2026-09-28');

  // Developer JSON / String Utility
  const [devInput, setDevInput] = useState('{"university": "CSE HUB", "status": "online", "modules": 10}');
  const [jsonValid, setJsonValid] = useState(true);

  const handleValidateJson = (val: string) => {
    setDevInput(val);
    try {
      JSON.parse(val);
      setJsonValid(true);
    } catch {
      setJsonValid(false);
    }
  };

  return (
    <section id="tools" className="border-b border-[#143526] bg-[#07100C] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#143526] pb-6 mb-10">
          <div className="flex items-center gap-2 font-mono text-xs text-[#39D98A] uppercase tracking-wider mb-2">
            <Wrench className="h-4 w-4" />
            <span>STUDENT PRODUCTIVITY SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F2F5F3] uppercase">
            STUDENT UTILITIES & WORKBENCH
          </h2>
          <p className="text-sm text-[#8A9A92] mt-1 font-mono">
            Modular engineering utilities: Official Assignment Cover Page Generators, client-side PDF processors, CV builders, and developer toolkits.
          </p>
        </div>

        {/* Modular Navigation Tabs */}
        <div className="flex gap-2 border-b border-[#143526] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('cover')}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs rounded transition-all ${
              activeTab === 'cover'
                ? 'bg-[#39D98A] text-[#07100C] font-bold'
                : 'bg-[#0B241A] text-[#8A9A92] hover:text-[#F2F5F3] border border-[#143526]'
            }`}
          >
            <FileCheck className="h-3.5 w-3.5" />
            <span>COVER PAGE GENERATOR</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs rounded transition-all ${
              activeTab === 'pdf'
                ? 'bg-[#39D98A] text-[#07100C] font-bold'
                : 'bg-[#0B241A] text-[#8A9A92] hover:text-[#F2F5F3] border border-[#143526]'
            }`}
          >
            <FileStack className="h-3.5 w-3.5" />
            <span>PDF ENGINE</span>
          </button>

          <button
            onClick={() => setActiveTab('developer')}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs rounded transition-all ${
              activeTab === 'developer'
                ? 'bg-[#39D98A] text-[#07100C] font-bold'
                : 'bg-[#0B241A] text-[#8A9A92] hover:text-[#F2F5F3] border border-[#143526]'
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>DEV UTILITIES</span>
          </button>
        </div>

        {/* Tab 1: Interactive University Cover Page Generator */}
        {activeTab === 'cover' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Controls */}
            <div className="lg:col-span-6 rounded border border-[#143526] bg-[#0B241A] p-6 space-y-4">
              <div className="border-b border-[#143526] pb-3">
                <h3 className="font-mono text-xs font-bold text-[#39D98A] uppercase tracking-wider">
                  STANDARD DEPARTMENT TEMPLATE CONFIGURATOR
                </h3>
                <p className="text-xs text-[#8A9A92] mt-0.5">
                  Input course and submission credentials to generate an official print-ready cover page.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">Course Code</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full rounded border border-[#143526] bg-[#07100C] px-3 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">Course Title</label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full rounded border border-[#143526] bg-[#07100C] px-3 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">Assignment / Report Title</label>
                <input
                  type="text"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  className="w-full rounded border border-[#143526] bg-[#07100C] px-3 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">Student Full Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full rounded border border-[#143526] bg-[#07100C] px-3 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full rounded border border-[#143526] bg-[#07100C] px-3 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">Submitted To (Teacher)</label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full rounded border border-[#143526] bg-[#07100C] px-3 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[#8A9A92] uppercase mb-1">Date of Submission</label>
                  <input
                    type="date"
                    value={submissionDate}
                    onChange={(e) => setSubmissionDate(e.target.value)}
                    className="w-full rounded border border-[#143526] bg-[#07100C] px-3 py-1.5 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-2 rounded bg-[#0F6B45] hover:bg-[#0A8F56] text-[#F2F5F3] py-2.5 font-mono text-xs font-bold uppercase tracking-wider border border-[#39D98A]/30 transition-all"
              >
                <Download className="h-4 w-4 text-[#39D98A]" />
                <span>PRINT / EXPORT VECTOR A4 PDF</span>
              </button>
            </div>

            {/* Live A4 Sheet Preview */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-white text-black p-8 rounded shadow-2xl border-4 border-double border-[#0F6B45] font-serif text-center space-y-6">
                <div>
                  <div className="font-bold text-xs uppercase tracking-widest text-[#0F6B45]">
                    DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                    FACULTY OF ELECTRICAL & COMPUTER ENGINEERING
                  </div>
                  <div className="mt-4 border-t-2 border-b-2 border-black py-2">
                    <span className="font-sans font-bold text-sm tracking-wider uppercase">
                      ASSIGNMENT & LAB REPORT COVER
                    </span>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <div className="text-xs text-gray-600 uppercase font-sans">COURSE TITLE</div>
                  <div className="font-bold text-sm text-gray-900">{courseCode}: {courseTitle}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="text-[11px] text-gray-500 uppercase font-sans">TOPIC / EXPERIMENT TITLE</div>
                  <div className="font-semibold text-xs text-gray-900 mt-1">{assignmentTitle}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left border-t border-gray-200 pt-4 text-[11px]">
                  <div>
                    <span className="font-sans font-bold text-gray-600 block text-[9px] uppercase">SUBMITTED BY</span>
                    <div className="font-bold text-gray-900">{studentName}</div>
                    <div className="text-gray-700 font-mono text-[10px]">ID: {studentId}</div>
                    <div className="text-gray-500 text-[10px]">Department of CSE</div>
                  </div>

                  <div>
                    <span className="font-sans font-bold text-gray-600 block text-[9px] uppercase">SUBMITTED TO</span>
                    <div className="font-bold text-gray-900">{teacherName}</div>
                    <div className="text-gray-500 text-[10px]">Department of CSE</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 text-[10px] text-gray-400 font-sans">
                  Date of Submission: <span className="text-gray-700 font-semibold">{submissionDate}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: PDF Suite */}
        {activeTab === 'pdf' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded border border-[#143526] bg-[#0B241A] space-y-3">
              <FileStack className="h-8 w-8 text-[#39D98A]" />
              <h4 className="font-bold text-[#F2F5F3] text-base">PDF Merge</h4>
              <p className="text-xs text-[#8A9A92]">
                Combine lecture slide sets, lab assignments, and research papers into one document.
              </p>
              <button 
                onClick={() => alert('PDF Merge utility selected. Select files to merge.')}
                className="font-mono text-xs text-[#39D98A] hover:underline flex items-center gap-1 pt-2"
              >
                <span>OPEN TOOL</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="p-6 rounded border border-[#143526] bg-[#0B241A] space-y-3">
              <Scissors className="h-8 w-8 text-[#39D98A]" />
              <h4 className="font-bold text-[#F2F5F3] text-base">PDF Split & Extract</h4>
              <p className="text-xs text-[#8A9A92]">
                Extract specific question papers or syllabus pages from large departmental archives.
              </p>
              <button 
                onClick={() => alert('PDF Split utility selected.')}
                className="font-mono text-xs text-[#39D98A] hover:underline flex items-center gap-1 pt-2"
              >
                <span>OPEN TOOL</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="p-6 rounded border border-[#143526] bg-[#0B241A] space-y-3">
              <Sparkles className="h-8 w-8 text-[#39D98A]" />
              <h4 className="font-bold text-[#F2F5F3] text-base">PDF Compress</h4>
              <p className="text-xs text-[#8A9A92]">
                Compress heavy scan files to under 10MB for university portal and Google Classroom submissions.
              </p>
              <button 
                onClick={() => alert('PDF Compress utility selected.')}
                className="font-mono text-xs text-[#39D98A] hover:underline flex items-center gap-1 pt-2"
              >
                <span>OPEN TOOL</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Dev Utilities */}
        {activeTab === 'developer' && (
          <div className="rounded border border-[#143526] bg-[#0B241A] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#143526] pb-3">
              <div className="font-mono text-xs font-bold text-[#39D98A] uppercase">
                JSON FORMATTER & SYNTAX VALIDATOR
              </div>
              <span className={`font-mono text-xs px-2 py-0.5 rounded border ${
                jsonValid 
                  ? 'bg-[#0E2F22] text-[#39D98A] border-[#1D533C]' 
                  : 'bg-red-950 text-red-400 border-red-800'
              }`}>
                {jsonValid ? 'VALID JSON' : 'SYNTAX ERROR'}
              </span>
            </div>

            <textarea
              rows={5}
              value={devInput}
              onChange={(e) => handleValidateJson(e.target.value)}
              className="w-full rounded border border-[#143526] bg-[#07100C] p-3 font-mono text-xs text-[#F2F5F3] focus:border-[#39D98A] focus:outline-none"
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  try {
                    setDevInput(JSON.stringify(JSON.parse(devInput), null, 2));
                    setJsonValid(true);
                  } catch {}
                }}
                className="px-3 py-1.5 rounded bg-[#0F6B45] text-xs font-mono text-[#F2F5F3]"
              >
                FORMAT JSON
              </button>
              <button
                onClick={() => {
                  try {
                    setDevInput(JSON.stringify(JSON.parse(devInput)));
                    setJsonValid(true);
                  } catch {}
                }}
                className="px-3 py-1.5 rounded bg-[#07100C] border border-[#143526] text-xs font-mono text-[#8A9A92]"
              >
                MINIFY JSON
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
