'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Bookmark, 
  Search, 
  SlidersHorizontal,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';

interface AcademicResource {
  id: string;
  courseCode: string;
  courseTitle: string;
  category: string;
  title: string;
  fileFormat: string;
  fileSize: string;
  downloads: number;
  uploadedBy: string;
  semester: number;
}

export const AcademicPreview: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<number>(0); // 0 = all
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['r-1']);

  const resources: AcademicResource[] = [
    { id: 'r-1', courseCode: 'CSE-211', courseTitle: 'Data Structures and Algorithms', category: 'LECTURE NOTE', title: 'Complete Graph Algorithms & Dijkstra Implementation Guide', fileFormat: 'PDF', fileSize: '4.2 MB', downloads: 248, uploadedBy: 'Prof. K. M. Hossain', semester: 3 },
    { id: 'r-2', courseCode: 'CSE-211', courseTitle: 'Data Structures and Algorithms', category: 'PREVIOUS QUESTION', title: 'Midterm Examination Question Papers (Fall 2024 - Spring 2026)', fileFormat: 'PDF', fileSize: '2.8 MB', downloads: 412, uploadedBy: 'Academic Cell', semester: 3 },
    { id: 'r-3', courseCode: 'CSE-311', courseTitle: 'Database Management Systems', category: 'SLIDES', title: 'Lecture 07 - B+ Tree Indexing & Query Plans', fileFormat: 'PPTX', fileSize: '6.1 MB', downloads: 184, uploadedBy: 'Asst. Prof. Tanvir Ahmed', semester: 5 },
    { id: 'r-4', courseCode: 'CSE-311', courseTitle: 'Database Management Systems', category: 'LAB MANUAL', title: 'PostgreSQL Advanced Triggers & Stored Procedures Lab Manual', fileFormat: 'PDF', fileSize: '1.9 MB', downloads: 290, uploadedBy: 'Lab Instructor', semester: 5 },
    { id: 'r-5', courseCode: 'CSE-321', courseTitle: 'Operating Systems & Systems Programming', category: 'EXAM SUGGESTION', title: 'Final Exam Preparation Guide: Deadlock, Virtual Memory & Schedulers', fileFormat: 'PDF', fileSize: '1.4 MB', downloads: 356, uploadedBy: 'Dr. Farhana Yasmin', semester: 5 },
    { id: 'r-6', courseCode: 'CSE-111', courseTitle: 'Structured Programming Language', category: 'ASSIGNMENT SPEC', title: 'Pointers & Dynamic Memory Allocation Practical Problem Set', fileFormat: 'PDF', fileSize: '980 KB', downloads: 195, uploadedBy: 'Dr. Shahriar Rahman', semester: 1 },
    { id: 'r-7', courseCode: 'CSE-411', courseTitle: 'Software Engineering & Architecture', category: 'LECTURE NOTE', title: 'Microservices & Event Sourcing Architecture Blueprint Guide', fileFormat: 'PDF', fileSize: '3.8 MB', downloads: 160, uploadedBy: 'Dr. Zulfikar Ali', semester: 7 },
  ];

  const categories = ['ALL', 'LECTURE NOTE', 'PREVIOUS QUESTION', 'SLIDES', 'LAB MANUAL', 'EXAM SUGGESTION'];

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered = resources.filter((res) => {
    const matchesSemester = selectedSemester === 0 || res.semester === selectedSemester;
    const matchesCategory = selectedCategory === 'ALL' || res.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      res.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesCategory && matchesQuery;
  });

  return (
    <section id="academic" className="border-b border-[#143526] bg-[#07100C] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#143526] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#39D98A] uppercase tracking-wider mb-2">
              <GraduationCap className="h-4 w-4" />
              <span>ACADEMIC HUB // COURSE REPOSITORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F2F5F3] uppercase">
              LECTURES, NOTES & ARCHIVES
            </h2>
            <p className="text-sm text-[#8A9A92] mt-1 font-mono">
              Direct access to verified course materials, previous exam questions, lab manuals, and syllabus guidelines.
            </p>
          </div>

          {/* Quick Academic Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#556B60]" />
            <input
              type="text"
              placeholder="Search course code or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-[#143526] bg-[#0B241A] pl-9 pr-4 py-2 font-mono text-xs text-[#F2F5F3] placeholder-[#556B60] focus:border-[#39D98A] focus:outline-none"
            />
          </div>
        </div>

        {/* Semester Selector Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <span className="font-mono text-xs text-[#556B60] uppercase pr-2 shrink-0">
            SEMESTER:
          </span>
          <button
            onClick={() => setSelectedSemester(0)}
            className={`px-3 py-1 font-mono text-xs rounded shrink-0 transition-colors ${
              selectedSemester === 0
                ? 'bg-[#39D98A] text-[#07100C] font-bold'
                : 'bg-[#0B241A] text-[#8A9A92] hover:text-[#F2F5F3] border border-[#143526]'
            }`}
          >
            ALL SEMESTERS
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 py-1 font-mono text-xs rounded shrink-0 transition-colors ${
                selectedSemester === sem
                  ? 'bg-[#39D98A] text-[#07100C] font-bold'
                  : 'bg-[#0B241A] text-[#8A9A92] hover:text-[#F2F5F3] border border-[#143526]'
              }`}
            >
              SEM {sem}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded font-mono text-[11px] transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#0E2F22] border-[#39D98A] text-[#39D98A] font-semibold'
                  : 'bg-[#081A13] border-[#143526] text-[#8A9A92] hover:text-[#F2F5F3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Items Editorial Table Layout (Clean, Minimal, Technical) */}
        <div className="rounded border border-[#143526] bg-[#0B241A]/50 overflow-hidden divide-y divide-[#143526]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm font-mono text-[#8A9A92]">
              No academic materials found matching the selected filters.
            </div>
          ) : (
            filtered.map((res) => {
              const isBookmarked = bookmarkedIds.includes(res.id);
              return (
                <div
                  key={res.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#0B241A] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded bg-[#07100C] border border-[#143526] shrink-0">
                      <FileText className="h-5 w-5 text-[#39D98A]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#39D98A] bg-[#07100C] px-2 py-0.5 rounded border border-[#143526]">
                          {res.courseCode}
                        </span>
                        <span className="font-mono text-[10px] text-[#8A9A92] bg-[#0E2F22] px-2 py-0.5 rounded">
                          {res.category}
                        </span>
                        <span className="font-mono text-[10px] text-[#556B60]">
                          SEM {res.semester}
                        </span>
                      </div>

                      <h4 className="text-base font-semibold text-[#F2F5F3] hover:text-[#39D98A] transition-colors">
                        {res.title}
                      </h4>

                      <div className="flex items-center gap-3 font-mono text-[11px] text-[#8A9A92]">
                        <span>{res.courseTitle}</span>
                        <span>•</span>
                        <span>{res.fileFormat} ({res.fileSize})</span>
                        <span>•</span>
                        <span>Uploaded by {res.uploadedBy}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => toggleBookmark(res.id)}
                      className={`p-2 rounded border transition-colors ${
                        isBookmarked
                          ? 'bg-[#0E2F22] border-[#39D98A] text-[#39D98A]'
                          : 'bg-[#07100C] border-[#143526] text-[#8A9A92] hover:text-[#F2F5F3]'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Resource'}
                    >
                      <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>

                    <button
                      onClick={() => alert(`Downloading verified academic resource: ${res.title}`)}
                      className="flex items-center gap-2 rounded bg-[#0F6B45] hover:bg-[#0A8F56] text-[#F2F5F3] px-3.5 py-2 font-mono text-xs font-semibold border border-[#39D98A]/30 transition-all"
                    >
                      <Download className="h-3.5 w-3.5 text-[#39D98A]" />
                      <span>DOWNLOAD</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
