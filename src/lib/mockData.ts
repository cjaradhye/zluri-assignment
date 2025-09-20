export interface App {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  logo: string;
  category: string;
  department: string[];
  rating: number;
  usageCount: number;
  reviews: Review[];
  features: string[];
  accessStatus: 'available' | 'request_required';
  popularity: 'high' | 'medium' | 'low';
  dateAdded: string;
  tags: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AccessRequest {
  id: string;
  appId: string;
  appName: string;
  reason: string;
  department: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  approvedDate?: string;
}

export const departments = [
  'Engineering',
  'HR',
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
  'Design'
];

export const mockApps: App[] = [
  {
    id: '1',
    name: 'Slack',
    description: 'Team communication and collaboration platform',
    longDescription: 'Slack is a powerful team communication platform that brings all your team communications together in one place. It offers real-time messaging, file sharing, and integrations with hundreds of tools to streamline your workflow.',
    logo: '💬',
    category: 'Communication',
    department: ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations', 'Design'],
    rating: 4.8,
    usageCount: 1200,
    reviews: [
      { id: '1', user: 'Sarah Chen', rating: 5, comment: 'Easy to use for collaboration across teams', date: '2024-01-15' },
      { id: '2', user: 'Mike Johnson', rating: 4, comment: 'Great for staying connected with remote team', date: '2024-01-10' }
    ],
    features: ['Real-time messaging', 'File sharing', 'App integrations', 'Video calls'],
    accessStatus: 'available',
    popularity: 'high',
    dateAdded: '2023-01-15',
    tags: ['communication', 'collaboration', 'essential']
  },
  {
    id: '2',
    name: 'GitHub',
    description: 'Code repository and version control system',
    longDescription: 'GitHub is the world\'s leading software development platform. It provides Git repository hosting, code review, project management, and CI/CD capabilities for development teams.',
    logo: '🐙',
    category: 'Development',
    department: ['Engineering'],
    rating: 4.9,
    usageCount: 1500,
    reviews: [
      { id: '3', user: 'Alex Kumar', rating: 5, comment: 'Essential for our development workflow', date: '2024-01-20' },
      { id: '4', user: 'Emily Rodriguez', rating: 5, comment: 'Perfect for code collaboration and reviews', date: '2024-01-18' }
    ],
    features: ['Git repositories', 'Code review', 'Issue tracking', 'CI/CD pipelines'],
    accessStatus: 'available',
    popularity: 'high',
    dateAdded: '2022-06-01',
    tags: ['development', 'version-control', 'essential']
  },
  {
    id: '3',
    name: 'Jira',
    description: 'Project management and issue tracking tool',
    longDescription: 'Jira is a powerful project management tool designed for agile teams. It helps track issues, manage projects, and streamline workflows with customizable boards and reporting.',
    logo: '📋',
    category: 'Project Management',
    department: ['Engineering', 'Operations'],
    rating: 4.1,
    usageCount: 850,
    reviews: [
      { id: '5', user: 'David Park', rating: 4, comment: 'Helpful for project tracking and sprint planning', date: '2024-01-12' },
      { id: '6', user: 'Lisa Thompson', rating: 4, comment: 'Good for managing complex projects', date: '2024-01-08' }
    ],
    features: ['Agile boards', 'Issue tracking', 'Sprint planning', 'Custom workflows'],
    accessStatus: 'available',
    popularity: 'high',
    dateAdded: '2022-08-15',
    tags: ['project-management', 'agile', 'tracking']
  },
  {
    id: '4',
    name: 'Salesforce',
    description: 'Customer relationship management platform',
    longDescription: 'Salesforce is the world\'s #1 CRM platform that helps sales teams close more deals, marketing teams generate better leads, and service teams deliver exceptional customer support.',
    logo: '☁️',
    category: 'CRM',
    department: ['Sales', 'Marketing'],
    rating: 4.3,
    usageCount: 600,
    reviews: [
      { id: '7', user: 'Jennifer Wu', rating: 4, comment: 'Great for managing customer relationships', date: '2024-01-14' },
      { id: '8', user: 'Robert Kim', rating: 4, comment: 'Powerful automation features', date: '2024-01-11' }
    ],
    features: ['Lead management', 'Sales automation', 'Analytics', 'Customer support'],
    accessStatus: 'request_required',
    popularity: 'medium',
    dateAdded: '2023-03-10',
    tags: ['crm', 'sales', 'marketing']
  },
  {
    id: '5',
    name: 'BambooHR',
    description: 'Human resources management system',
    longDescription: 'BambooHR is an all-in-one HR software designed for small to medium businesses. It streamlines HR processes from hiring to performance management.',
    logo: '🎋',
    category: 'HR',
    department: ['HR'],
    rating: 4.6,
    usageCount: 300,
    reviews: [
      { id: '9', user: 'Amanda Foster', rating: 5, comment: 'Makes HR processes much more efficient', date: '2024-01-16' },
      { id: '10', user: 'Chris Martinez', rating: 4, comment: 'Great for employee onboarding', date: '2024-01-13' }
    ],
    features: ['Employee records', 'Time tracking', 'Performance reviews', 'Recruiting'],
    accessStatus: 'request_required',
    popularity: 'medium',
    dateAdded: '2023-05-20',
    tags: ['hr', 'management', 'recruiting']
  },
  {
    id: '6',
    name: 'Figma',
    description: 'Collaborative design and prototyping tool',
    longDescription: 'Figma is a collaborative interface design tool that runs in the browser. Teams can design, prototype, and collaborate in real-time from anywhere.',
    logo: '🎨',
    category: 'Design',
    department: ['Design', 'Engineering'],
    rating: 4.7,
    usageCount: 450,
    reviews: [
      { id: '11', user: 'Maya Patel', rating: 5, comment: 'Best design tool for team collaboration', date: '2024-01-17' },
      { id: '12', user: 'Tom Wilson', rating: 4, comment: 'Great for prototyping and design systems', date: '2024-01-09' }
    ],
    features: ['Design collaboration', 'Prototyping', 'Design systems', 'Real-time editing'],
    accessStatus: 'available',
    popularity: 'high',
    dateAdded: '2022-11-30',
    tags: ['design', 'prototype', 'collaboration']
  },
  {
    id: '7',
    name: 'Zoom',
    description: 'Video conferencing and virtual meetings',
    longDescription: 'Zoom is a leading video communications platform that provides video meetings, webinars, and phone services in a unified platform.',
    logo: '📹',
    category: 'Communication',
    department: ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'],
    rating: 4.4,
    usageCount: 980,
    reviews: [
      { id: '13', user: 'Rachel Green', rating: 4, comment: 'Reliable for video meetings and webinars', date: '2024-01-19' },
      { id: '14', user: 'Mark Davis', rating: 4, comment: 'Good quality video and easy to use', date: '2024-01-07' }
    ],
    features: ['Video meetings', 'Screen sharing', 'Webinars', 'Recording'],
    accessStatus: 'available',
    popularity: 'high',
    dateAdded: '2021-12-01',
    tags: ['video', 'meetings', 'communication']
  },
  {
    id: '8',
    name: 'Confluence',
    description: 'Team workspace and knowledge management',
    longDescription: 'Confluence is a team workspace where knowledge and collaboration meet. Create, share, and organize your work in one place to move projects forward.',
    logo: '📚',
    category: 'Documentation',
    department: ['Engineering', 'Operations', 'HR'],
    rating: 4.2,
    usageCount: 720,
    reviews: [
      { id: '15', user: 'Kevin Liu', rating: 4, comment: 'Great for team documentation and wikis', date: '2024-01-21' },
      { id: '16', user: 'Sophie Anderson', rating: 4, comment: 'Useful for knowledge sharing', date: '2024-01-06' }
    ],
    features: ['Team spaces', 'Page templates', 'Collaboration', 'Integration with Jira'],
    accessStatus: 'request_required',
    popularity: 'medium',
    dateAdded: '2023-02-28',
    tags: ['documentation', 'wiki', 'knowledge']
  }
];

export const mockRequests: AccessRequest[] = [
  {
    id: '1',
    appId: '4',
    appName: 'Salesforce',
    reason: 'Need access for managing sales leads',
    department: 'Sales',
    status: 'pending',
    requestDate: '2024-01-22'
  },
  {
    id: '2',
    appId: '5',
    appName: 'BambooHR',
    reason: 'HR onboarding process management',
    department: 'HR',
    status: 'approved',
    requestDate: '2024-01-20',
    approvedDate: '2024-01-21'
  },
  {
    id: '3',
    appId: '8',
    appName: 'Confluence',
    reason: 'Team documentation and knowledge sharing',
    department: 'Engineering',
    status: 'rejected',
    requestDate: '2024-01-18'
  }
];

export const myApps = mockApps.filter(app => app.accessStatus === 'available').slice(0, 4);

export const getRecommendedApps = (userDepartment: string): App[] => {
  const recommendations = mockApps.filter(app => 
    app.department.includes(userDepartment) && app.popularity === 'high'
  );
  return recommendations.slice(0, 3);
};