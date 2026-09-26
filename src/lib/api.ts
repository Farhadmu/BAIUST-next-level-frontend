const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('baiust_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('baiust_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('baiust_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }

      return await res.json();
    } catch (err: any) {
      console.warn(`[API] Network or server issue on ${endpoint}:`, err.message);
      throw err;
    }
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.accessToken) {
      this.setToken(data.accessToken);
    }
    return data;
  }

  async register(payload: { email: string; password: string; fullName: string; studentId?: string }) {
    const data = await this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (data.accessToken) {
      this.setToken(data.accessToken);
    }
    return data;
  }

  // Diagnostic
  async getDiagnosticQuestions(category?: string) {
    return this.request<any[]>(`/diagnostic/questions${category ? `?category=${category}` : ''}`);
  }

  async startDiagnostic(targetRole?: string) {
    return this.request<any>('/diagnostic/start', {
      method: 'POST',
      body: JSON.stringify({ targetRole }),
    });
  }

  async submitDiagnosticAnswer(attemptId: string, questionId: string, selectedAnswer: string) {
    return this.request<any>('/diagnostic/answer', {
      method: 'POST',
      body: JSON.stringify({ attemptId, questionId, selectedAnswer }),
    });
  }

  async completeDiagnostic(attemptId: string) {
    return this.request<any>(`/diagnostic/complete/${attemptId}`, {
      method: 'POST',
    });
  }

  // Skills
  async getSkillProfile() {
    return this.request<any>('/skills/profile');
  }

  async getSkillGaps(targetRole?: string) {
    return this.request<any>(`/skills/gaps${targetRole ? `?targetRole=${targetRole}` : ''}`);
  }

  // Career Intelligence & Twin
  async getCareerTwin() {
    return this.request<any>('/career-intelligence/twin');
  }

  async updateCareerProfile(dto: any) {
    return this.request<any>('/career-intelligence/profile', {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  }

  // Roadmap
  async getActiveRoadmap() {
    return this.request<any>('/roadmap/active');
  }

  async toggleMilestone(milestoneId: string) {
    return this.request<any>(`/roadmap/milestone/${milestoneId}/toggle`, {
      method: 'POST',
    });
  }

  // AI Copilot
  async chatWithCopilot(messages: Array<{ role: string; content: string }>) {
    return this.request<any>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    });
  }

  // Projects & Proof
  async getMyProjects() {
    return this.request<any[]>('/projects/my-projects');
  }

  async generateProjectSpec(dto: any) {
    return this.request<any>('/projects/generate-spec', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }

  async importGithubProject(dto: any) {
    return this.request<any>('/projects/import-github', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }

  async verifyProofToken(token: string) {
    return this.request<any>(`/projects/verify/${token}`);
  }

  // CP
  async getCpProblems(topic?: string, difficulty?: string) {
    return this.request<any[]>(`/cp/problems${topic ? `?topic=${topic}` : ''}`);
  }

  async getCpProgress() {
    return this.request<any>('/cp/my-progress');
  }

  async recordCpSolve(problemId: string) {
    return this.request<any>(`/cp/solve/${problemId}`, {
      method: 'POST',
    });
  }

  // Interview
  async startInterview(category?: string, targetRole?: string) {
    return this.request<any>('/interview/start', {
      method: 'POST',
      body: JSON.stringify({ category, targetRole }),
    });
  }

  async submitInterviewAnswer(sessionId: string, questionId: string, answerText: string) {
    return this.request<any>('/interview/answer', {
      method: 'POST',
      body: JSON.stringify({ sessionId, questionId, answerText }),
    });
  }

  async completeInterview(sessionId: string) {
    return this.request<any>(`/interview/complete/${sessionId}`, {
      method: 'POST',
    });
  }

  // Resume
  async getMyResume() {
    return this.request<any>('/resume/my-resume');
  }

  async updateResume(dto: any) {
    return this.request<any>('/resume/my-resume', {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  }

  async analyzeResumeAts() {
    return this.request<any>('/resume/analyze-ats', {
      method: 'POST',
    });
  }

  // Jobs
  async getJobsWithReadiness() {
    return this.request<any[]>('/readiness/jobs');
  }

  // Recovery
  async getRecoveryPlan() {
    return this.request<any>('/recovery/plan');
  }

  // Gamification
  async getGamificationSummary() {
    return this.request<any>('/gamification/summary');
  }

  // Admin
  async getAdminOverview() {
    return this.request<any>('/admin/overview');
  }

  async getAdminAiUsage() {
    return this.request<any>('/admin/ai-usage');
  }

  async getAdminSystemHealth() {
    return this.request<any>('/admin/system-health');
  }
}

export const api = new ApiClient();
