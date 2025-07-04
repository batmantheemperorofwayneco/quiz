import { Student, Assignment, Class, RemediationSuggestion } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@school.edu',
    performance: {
      averageCompletion: 92,
      totalAssignments: 15,
      completedAssignments: 14,
      strugglingAreas: [],
      lastActivity: '2024-01-15T10:30:00Z'
    }
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@school.edu',
    performance: {
      averageCompletion: 67,
      totalAssignments: 15,
      completedAssignments: 10,
      strugglingAreas: ['Algebra', 'Word Problems'],
      lastActivity: '2024-01-14T15:45:00Z'
    }
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@school.edu',
    performance: {
      averageCompletion: 85,
      totalAssignments: 15,
      completedAssignments: 13,
      strugglingAreas: ['Geometry'],
      lastActivity: '2024-01-15T09:15:00Z'
    }
  },
  {
    id: '4',
    name: 'Emma Thompson',
    email: 'emma.thompson@school.edu',
    performance: {
      averageCompletion: 45,
      totalAssignments: 15,
      completedAssignments: 7,
      strugglingAreas: ['Basic Operations', 'Fractions', 'Word Problems'],
      lastActivity: '2024-01-13T14:20:00Z'
    }
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@school.edu',
    performance: {
      averageCompletion: 78,
      totalAssignments: 15,
      completedAssignments: 12,
      strugglingAreas: ['Statistics'],
      lastActivity: '2024-01-15T11:00:00Z'
    }
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Linear Equations Practice',
    description: 'Solve various linear equations and graph solutions',
    dueDate: '2024-01-20',
    subject: 'Mathematics',
    totalQuestions: 20,
    difficulty: 'Medium',
    status: 'Active',
    completionRate: 73,
    submissions: [
      {
        studentId: '1',
        studentName: 'Alex Johnson',
        completedQuestions: 20,
        totalQuestions: 20,
        timeSpent: 45,
        strugglingQuestions: [],
        lastAccessed: '2024-01-15T10:30:00Z',
        status: 'Completed'
      },
      {
        studentId: '2',
        studentName: 'Sarah Chen',
        completedQuestions: 12,
        totalQuestions: 20,
        timeSpent: 67,
        strugglingQuestions: [5, 8, 12, 15, 18],
        lastAccessed: '2024-01-14T15:45:00Z',
        status: 'In Progress'
      },
      {
        studentId: '3',
        studentName: 'Michael Rodriguez',
        completedQuestions: 18,
        totalQuestions: 20,
        timeSpent: 52,
        strugglingQuestions: [16, 19],
        lastAccessed: '2024-01-15T09:15:00Z',
        status: 'In Progress'
      },
      {
        studentId: '4',
        studentName: 'Emma Thompson',
        completedQuestions: 6,
        totalQuestions: 20,
        timeSpent: 89,
        strugglingQuestions: [3, 5, 7, 9, 11, 13, 15, 17, 19],
        lastAccessed: '2024-01-13T14:20:00Z',
        status: 'In Progress'
      },
      {
        studentId: '5',
        studentName: 'David Kim',
        completedQuestions: 17,
        totalQuestions: 20,
        timeSpent: 41,
        strugglingQuestions: [12, 18, 20],
        lastAccessed: '2024-01-15T11:00:00Z',
        status: 'In Progress'
      }
    ]
  },
  {
    id: '2',
    title: 'Quadratic Functions Review',
    description: 'Practice identifying and solving quadratic functions',
    dueDate: '2024-01-25',
    subject: 'Mathematics',
    totalQuestions: 15,
    difficulty: 'Hard',
    status: 'Active',
    completionRate: 40,
    submissions: [
      {
        studentId: '1',
        studentName: 'Alex Johnson',
        completedQuestions: 13,
        totalQuestions: 15,
        timeSpent: 62,
        strugglingQuestions: [11, 14],
        lastAccessed: '2024-01-15T16:20:00Z',
        status: 'In Progress'
      },
      {
        studentId: '2',
        studentName: 'Sarah Chen',
        completedQuestions: 4,
        totalQuestions: 15,
        timeSpent: 35,
        strugglingQuestions: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        lastAccessed: '2024-01-14T13:30:00Z',
        status: 'In Progress'
      },
      {
        studentId: '3',
        studentName: 'Michael Rodriguez',
        completedQuestions: 8,
        totalQuestions: 15,
        timeSpent: 48,
        strugglingQuestions: [9, 10, 11, 13, 14, 15],
        lastAccessed: '2024-01-15T14:45:00Z',
        status: 'In Progress'
      },
      {
        studentId: '4',
        studentName: 'Emma Thompson',
        completedQuestions: 2,
        totalQuestions: 15,
        timeSpent: 25,
        strugglingQuestions: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        lastAccessed: '2024-01-12T10:15:00Z',
        status: 'In Progress'
      },
      {
        studentId: '5',
        studentName: 'David Kim',
        completedQuestions: 3,
        totalQuestions: 15,
        timeSpent: 28,
        strugglingQuestions: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        lastAccessed: '2024-01-14T17:10:00Z',
        status: 'Not Started'
      }
    ]
  }
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Algebra I - Period 3',
    subject: 'Mathematics',
    studentCount: 5,
    averagePerformance: 73.4,
    assignments: mockAssignments,
    students: mockStudents
  }
];

export const mockRemediationSuggestions: RemediationSuggestion[] = [
  {
    studentId: '4',
    studentName: 'Emma Thompson',
    issue: 'Struggling with basic algebraic operations and word problems',
    suggestion: 'Provide additional practice with foundational concepts. Consider one-on-one tutoring sessions.',
    resources: [
      'Khan Academy - Basic Algebra',
      'Worksheet: Basic Operations Review',
      'Video: Introduction to Word Problems'
    ],
    priority: 'High'
  },
  {
    studentId: '2',
    studentName: 'Sarah Chen',
    issue: 'Difficulty with complex word problems and time management',
    suggestion: 'Break down word problems into smaller steps. Provide time management strategies.',
    resources: [
      'Word Problem Strategy Guide',
      'Practice: Step-by-Step Problem Solving',
      'Time Management Tips for Math'
    ],
    priority: 'Medium'
  },
  {
    studentId: '5',
    studentName: 'David Kim',
    issue: 'Inconsistent performance on statistical concepts',
    suggestion: 'Additional practice with data interpretation and statistical reasoning.',
    resources: [
      'Statistics Practice Problems',
      'Data Analysis Worksheets',
      'Interactive Statistics Games'
    ],
    priority: 'Low'
  }
];