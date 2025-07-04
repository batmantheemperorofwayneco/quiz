export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  performance: {
    averageCompletion: number;
    totalAssignments: number;
    completedAssignments: number;
    strugglingAreas: string[];
    lastActivity: string;
  };
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Active' | 'Draft' | 'Completed';
  completionRate: number;
  submissions: StudentSubmission[];
}

export interface StudentSubmission {
  studentId: string;
  studentName: string;
  completedQuestions: number;
  totalQuestions: number;
  timeSpent: number; // in minutes
  strugglingQuestions: number[];
  lastAccessed: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  averagePerformance: number;
  assignments: Assignment[];
  students: Student[];
}

export interface RemediationSuggestion {
  studentId: string;
  studentName: string;
  issue: string;
  suggestion: string;
  resources: string[];
  priority: 'High' | 'Medium' | 'Low';
}