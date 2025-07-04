import React, { createContext, useContext, useState } from 'react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Draft' | 'Active' | 'Completed';
  completionRate: number;
  classId: string;
  createdBy: string;
  content: {
    text?: string;
    images?: string[];
    audio?: string[];
    video?: string[];
    drawings?: string[];
  };
  differentiation?: {
    enabled: boolean;
    tiers: Array<{
      name: string;
      scoreRange: { min: number; max: number };
      content: any;
    }>;
  };
  scheduling?: {
    releaseDate?: string;
    unlockCondition?: string;
  };
}

interface Student {
  id: string;
  name: string;
  email: string;
  classIds: string[];
  performance: {
    averageScore: number;
    completedAssignments: number;
    totalAssignments: number;
    strugglingAreas: string[];
    lastActivity: string;
  };
  gamification: {
    points: number;
    badges: string[];
    rank: number;
  };
}

interface Class {
  id: string;
  name: string;
  subject: string;
  grade: string;
  teacherId: string;
  studentIds: string[];
  classCode: string;
  settings: {
    peerLearningEnabled: boolean;
    gamificationEnabled: boolean;
  };
}

interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: {
    text?: string;
    files?: string[];
    audio?: string[];
    video?: string[];
    drawings?: string[];
  };
  submittedAt: string;
  status: 'Draft' | 'Submitted' | 'Graded';
  grade?: number;
  feedback?: {
    text?: string;
    audio?: string[];
    annotations?: any[];
  };
}

interface Doubt {
  id: string;
  studentId: string;
  assignmentId?: string;
  question: string;
  status: 'Open' | 'AI Resolved' | 'Peer Resolved' | 'Teacher Resolved';
  aiResponse?: string;
  peerResponses?: Array<{ response: string; helpful: boolean }>;
  teacherResponse?: string;
  createdAt: string;
}

interface DataContextType {
  assignments: Assignment[];
  students: Student[];
  classes: Class[];
  submissions: Submission[];
  doubts: Doubt[];
  createAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  createClass: (classData: Omit<Class, 'id' | 'classCode'>) => void;
  joinClass: (studentId: string, classCode: string) => boolean;
  submitAssignment: (submission: Omit<Submission, 'id'>) => void;
  submitDoubt: (doubt: Omit<Doubt, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Linear Equations Practice',
      description: 'Solve various linear equations and graph solutions',
      dueDate: '2024-02-20',
      subject: 'Mathematics',
      totalQuestions: 20,
      difficulty: 'Medium',
      status: 'Active',
      completionRate: 73,
      classId: '1',
      createdBy: '1',
      content: {
        text: 'Complete the following linear equation problems. Show all your work.',
        images: [],
        audio: [],
        video: [],
        drawings: []
      }
    }
  ]);

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@school.edu',
      classIds: ['1'],
      performance: {
        averageScore: 92,
        completedAssignments: 14,
        totalAssignments: 15,
        strugglingAreas: [],
        lastActivity: '2024-01-15T10:30:00Z'
      },
      gamification: {
        points: 1250,
        badges: ['First Assignment', 'Perfect Score', 'Helpful Peer'],
        rank: 1
      }
    }
  ]);

  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: 'Algebra I - Period 3',
      subject: 'Mathematics',
      grade: '9th Grade',
      teacherId: '1',
      studentIds: ['1'],
      classCode: 'MATH123',
      settings: {
        peerLearningEnabled: true,
        gamificationEnabled: true
      }
    }
  ]);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [doubts, setDoubts] = useState<Doubt[]>([]);

  const createAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newAssignment = {
      ...assignment,
      id: Date.now().toString()
    };
    setAssignments(prev => [...prev, newAssignment]);
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id ? { ...assignment, ...updates } : assignment
    ));
  };

  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
  };

  const createClass = (classData: Omit<Class, 'id' | 'classCode'>) => {
    const newClass = {
      ...classData,
      id: Date.now().toString(),
      classCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    };
    setClasses(prev => [...prev, newClass]);
  };

  const joinClass = (studentId: string, classCode: string): boolean => {
    const targetClass = classes.find(c => c.classCode === classCode);
    if (!targetClass) return false;

    setClasses(prev => prev.map(c => 
      c.id === targetClass.id 
        ? { ...c, studentIds: [...c.studentIds, studentId] }
        : c
    ));

    setStudents(prev => prev.map(s => 
      s.id === studentId 
        ? { ...s, classIds: [...s.classIds, targetClass.id] }
        : s
    ));

    return true;
  };

  const submitAssignment = (submission: Omit<Submission, 'id'>) => {
    const newSubmission = {
      ...submission,
      id: Date.now().toString()
    };
    setSubmissions(prev => [...prev, newSubmission]);
  };

  const submitDoubt = (doubt: Omit<Doubt, 'id'>) => {
    const newDoubt = {
      ...doubt,
      id: Date.now().toString()
    };
    setDoubts(prev => [...prev, newDoubt]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updates } : student
    ));
  };

  return (
    <DataContext.Provider value={{
      assignments,
      students,
      classes,
      submissions,
      doubts,
      createAssignment,
      updateAssignment,
      deleteAssignment,
      createClass,
      joinClass,
      submitAssignment,
      submitDoubt,
      updateStudent
    }}>
      {children}
    </DataContext.Provider>
  );
};