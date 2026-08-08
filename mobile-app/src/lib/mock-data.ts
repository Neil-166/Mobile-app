// ABTalks Mock Data

export interface Student {
  id: string;
  name: string;
  college: string;
  avatar: string;
  track: Track;
  currentDay: number;
  streak: number;
  shieldsRemaining: number;
  totalXP: number;
  githubUsername: string;
  linkedinUsername: string;
  joinedAt: string;
  state: 'active' | 'first-day' | 'missed-day' | 'empty-profile';
  submittedToday: boolean;
  lastSubmissionDate: string | null;
}

export type Track = 'Full Stack' | 'AI/ML' | 'Cybersecurity' | 'DSA' | 'UI/UX';

export interface DayChallenge {
  day: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  track: Track;
  objectives: string[];
  requirements: Requirement[];
  workflow: WorkflowStep[];
  resources: Resource[];
  buildPreview: string;
  reflection?: string;
}

export interface Requirement {
  id: string;
  label: string;
  completed: boolean;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'docs' | 'video' | 'article' | 'github';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  streak: number;
  day: number;
  avatar: string;
  track: Track;
  isCurrentUser?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export interface ActivityItem {
  id: string;
  type: 'commit' | 'linkedin' | 'submission' | 'streak' | 'achievement';
  title: string;
  description: string;
  time: string;
  icon: string;
}

// Mock Students
export const students: Record<string, Student> = {
  active: {
    id: 'active',
    name: 'Arjun Sharma',
    college: 'DTU Delhi',
    avatar: 'AS',
    track: 'Full Stack',
    currentDay: 12,
    streak: 12,
    shieldsRemaining: 1,
    totalXP: 2400,
    githubUsername: 'arjun-sharma-dev',
    linkedinUsername: 'arjunsharma-dev',
    joinedAt: '2024-07-28',
    state: 'active',
    submittedToday: false,
    lastSubmissionDate: '2024-08-07',
  },
  firstDay: {
    id: 'firstDay',
    name: 'Priya Nair',
    college: 'NITK Surathkal',
    avatar: 'PN',
    track: 'AI/ML',
    currentDay: 1,
    streak: 0,
    shieldsRemaining: 1,
    totalXP: 0,
    githubUsername: 'priya-nair-ml',
    linkedinUsername: 'priyanair-ml',
    joinedAt: '2024-08-08',
    state: 'first-day',
    submittedToday: false,
    lastSubmissionDate: null,
  },
  missedDay: {
    id: 'missedDay',
    name: 'Rohit Verma',
    college: 'VIT Vellore',
    avatar: 'RV',
    track: 'DSA',
    currentDay: 7,
    streak: 0,
    shieldsRemaining: 0,
    totalXP: 1200,
    githubUsername: 'rohit-verma-dsa',
    linkedinUsername: 'rohitverma-dsa',
    joinedAt: '2024-08-02',
    state: 'missed-day',
    submittedToday: false,
    lastSubmissionDate: '2024-08-06',
  },
  emptyProfile: {
    id: 'emptyProfile',
    name: 'Kavya Reddy',
    college: 'IIIT Hyderabad',
    avatar: 'KR',
    track: 'UI/UX',
    currentDay: 1,
    streak: 0,
    shieldsRemaining: 1,
    totalXP: 0,
    githubUsername: '',
    linkedinUsername: '',
    joinedAt: '2024-08-08',
    state: 'empty-profile',
    submittedToday: false,
    lastSubmissionDate: null,
  },
};

export const currentStudent = students.active;

// Day 12 Challenge
export const day12Challenge: DayChallenge = {
  day: 12,
  title: 'Build a Responsive Portfolio Card',
  description:
    'Create a polished, mobile-first developer portfolio card that showcases your skills, projects, and social links. Focus on clean typography, consistent spacing, and smooth hover interactions.',
  difficulty: 'Intermediate',
  estimatedTime: '2–3 hours',
  track: 'Full Stack',
  buildPreview: '/preview-day12.png',
  objectives: [
    'Understand CSS Grid and Flexbox in real contexts',
    'Practice responsive breakpoints with mobile-first approach',
    'Build interactive micro-animations with pure CSS',
    'Push a clean, well-documented commit to GitHub',
    'Write a concise LinkedIn post about what you learned',
  ],
  requirements: [
    { id: 'r1', label: 'Build the portfolio card HTML structure', completed: false },
    { id: 'r2', label: 'Style with mobile-first CSS (no frameworks)', completed: false },
    { id: 'r3', label: 'Add hover and focus interactions', completed: false },
    { id: 'r4', label: 'Make it fully responsive (320px–1440px)', completed: false },
    { id: 'r5', label: 'Push code to GitHub with a descriptive commit', completed: false },
    { id: 'r6', label: 'Post a 3-sentence LinkedIn update about today', completed: false },
  ],
  workflow: [
    {
      step: 1,
      title: 'Sketch the layout',
      description:
        'Before touching code, sketch the card on paper or in Excalidraw. Define the sections: avatar, name, bio, skills, projects, links.',
      tip: 'A 5-minute sketch saves 30 minutes of coding confusion.',
    },
    {
      step: 2,
      title: 'Write semantic HTML first',
      description:
        'Build the structure with proper semantic tags: <article>, <header>, <section>, <nav>, <ul>. No styling yet.',
    },
    {
      step: 3,
      title: 'Style mobile-first',
      description:
        'Add base styles at 320px. Use relative units (rem, %, clamp()). Avoid fixed pixel widths.',
      tip: 'Use clamp(1rem, 4vw, 1.5rem) for fluid font sizes.',
    },
    {
      step: 4,
      title: 'Add responsive breakpoints',
      description:
        'Enhance layout at 640px and 1024px. Use CSS Grid for multi-column layouts on larger screens.',
    },
    {
      step: 5,
      title: 'Implement interactions',
      description:
        'Add :hover, :focus-visible transitions. Keep animations under 300ms. Use transform, not position.',
    },
    {
      step: 6,
      title: 'Review and commit',
      description:
        'Test on Chrome DevTools at 390px width. Run Lighthouse. Commit with a message like: "Day 12: Add responsive portfolio card with hover animations"',
    },
  ],
  resources: [
    {
      title: 'CSS Grid Complete Guide',
      url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
      type: 'article',
    },
    {
      title: 'Clamp() for fluid typography',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp',
      type: 'docs',
    },
    {
      title: 'Kevin Powell: Mobile-first CSS',
      url: 'https://youtube.com/watch?v=0ohtVzCSHqs',
      type: 'video',
    },
    {
      title: 'Portfolio card starter template',
      url: 'https://github.com/abtalks/day12-starter',
      type: 'github',
    },
  ],
};

// Leaderboard
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Aditya Kumar', college: 'IIT Bombay', streak: 30, day: 30, avatar: 'AK', track: 'AI/ML' },
  { rank: 2, name: 'Sneha Iyer', college: 'NIT Trichy', streak: 28, day: 28, avatar: 'SI', track: 'Full Stack' },
  { rank: 3, name: 'Dhruv Patel', college: 'BITS Pilani', streak: 25, day: 25, avatar: 'DP', track: 'Cybersecurity' },
  { rank: 4, name: 'Meera Krishnan', college: 'IIIT Bangalore', streak: 20, day: 20, avatar: 'MK', track: 'UI/UX' },
  { rank: 5, name: 'Riya Joshi', college: 'Jadavpur University', streak: 18, day: 18, avatar: 'RJ', track: 'DSA' },
  { rank: 6, name: 'Aryan Singh', college: 'SRM Chennai', streak: 15, day: 15, avatar: 'AS2', track: 'Full Stack' },
  { rank: 7, name: 'Arjun Sharma', college: 'DTU Delhi', streak: 12, day: 12, avatar: 'AS', track: 'Full Stack', isCurrentUser: true },
  { rank: 8, name: 'Tanvi Mehta', college: 'Pune University', streak: 11, day: 11, avatar: 'TM', track: 'AI/ML' },
  { rank: 9, name: 'Karan Bose', college: 'Manipal Institute', streak: 9, day: 9, avatar: 'KB', track: 'DSA' },
  { rank: 10, name: 'Anjali Rao', college: 'BMS College', streak: 8, day: 8, avatar: 'AR', track: 'UI/UX' },
];

// Achievements
export const achievements: Achievement[] = [
  { id: 'a1', title: 'First Step', description: 'Completed Day 1', icon: '🌱', earned: true, earnedAt: 'Day 1' },
  { id: 'a2', title: 'Week One', description: '7-day streak', icon: '🔥', earned: true, earnedAt: 'Day 7' },
  { id: 'a3', title: 'Code Committer', description: '10 GitHub commits', icon: '💻', earned: true, earnedAt: 'Day 9' },
  { id: 'a4', title: 'Night Owl', description: 'Submitted after 11 PM', icon: '🦉', earned: true, earnedAt: 'Day 5' },
  { id: 'a5', title: 'Two Weeks Strong', description: '14-day streak', icon: '⚡', earned: false },
  { id: 'a6', title: 'LinkedIn Pro', description: '10 LinkedIn posts', icon: '📢', earned: false },
  { id: 'a7', title: 'Halfway Hero', description: 'Day 30 completed', icon: '🏆', earned: false },
  { id: 'a8', title: 'Full Circle', description: '60 days complete', icon: '🎖️', earned: false },
];

// Activity Timeline
export const recentActivity: ActivityItem[] = [
  { id: 'act1', type: 'submission', title: 'Day 11 submitted', description: 'CSS Grid layout builder', time: '11:42 PM', icon: '✅' },
  { id: 'act2', type: 'commit', title: 'GitHub commit pushed', description: 'Day 11: Add grid layout with responsive breakpoints', time: '11:38 PM', icon: '📦' },
  { id: 'act3', type: 'linkedin', title: 'LinkedIn post shared', description: 'Learned how CSS Grid changes everything...', time: '11:15 PM', icon: '📢' },
  { id: 'act4', type: 'streak', title: '11-day streak achieved!', description: 'Keep going — Day 12 unlocked', time: '11:42 PM', icon: '🔥' },
  { id: 'act5', type: 'submission', title: 'Day 10 submitted', description: 'Flexbox navigation component', time: 'Yesterday', icon: '✅' },
  { id: 'act6', type: 'achievement', title: 'Night Owl unlocked', description: 'Submitted after 11 PM', time: '2 days ago', icon: '🦉' },
];

// Weekly heatmap data (last 7 days)
export const weeklyHeatmap = [
  { day: 'Mon', completed: true, submittedAt: '11:30 PM' },
  { day: 'Tue', completed: true, submittedAt: '10:15 PM' },
  { day: 'Wed', completed: true, submittedAt: '11:55 PM' },
  { day: 'Thu', completed: true, submittedAt: '9:45 PM' },
  { day: 'Fri', completed: true, submittedAt: '10:30 PM' },
  { day: 'Sat', completed: true, submittedAt: '11:42 PM' },
  { day: 'Sun', completed: false, submittedAt: null },
];

export interface CommunityPost {
  id: string;
  name: string;
  college: string;
  avatar: string;
  day: number;
  action: string;
  time: string; // ISO timestamp → rendered as relative time
  track: Track;
}

// Live-feeling community feed (fresh timestamps relative to now)
function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

export const communityFeed: CommunityPost[] = [
  { id: 'c1', name: 'Priya Nair', college: 'NITK Surathkal', avatar: 'PN', day: 14, action: 'Built a responsive navbar', time: minutesAgo(8), track: 'AI/ML' },
  { id: 'c2', name: 'Sneha Iyer', college: 'NIT Trichy', avatar: 'SI', day: 28, action: 'Shipped a REST API with auth', time: minutesAgo(26), track: 'Full Stack' },
  { id: 'c3', name: 'Dhruv Patel', college: 'BITS Pilani', avatar: 'DP', day: 25, action: 'Completed a CTF challenge', time: minutesAgo(52), track: 'Cybersecurity' },
  { id: 'c4', name: 'Meera Krishnan', college: 'IIIT Bangalore', avatar: 'MK', day: 20, action: 'Posted their Day 20 reflection', time: minutesAgo(74), track: 'UI/UX' },
  { id: 'c5', name: 'Riya Joshi', college: 'Jadavpur University', avatar: 'RJ', day: 18, action: 'Solved 3 DSA problems', time: minutesAgo(110), track: 'DSA' },
  { id: 'c6', name: 'Aryan Singh', college: 'SRM Chennai', avatar: 'AS2', day: 15, action: 'Deployed a portfolio to Vercel', time: minutesAgo(160), track: 'Full Stack' },
  { id: 'c7', name: 'Tanvi Mehta', college: 'Pune University', avatar: 'TM', day: 11, action: 'Cleaned up old GitHub repos', time: minutesAgo(210), track: 'AI/ML' },
  { id: 'c8', name: 'Anjali Rao', college: 'BMS College', avatar: 'AR', day: 8, action: 'Built a CSS art piece', time: minutesAgo(300), track: 'UI/UX' },
];

// Mocked AI reflections
export const aiReflections = [
  "Today I learned how responsive spacing affects mobile readability more than I expected. Small changes in padding made the whole layout feel different on a phone screen.",
  "I realized that semantic HTML isn't just about accessibility — it actually makes your CSS easier to write because you're targeting meaningful elements.",
  "The biggest thing today was understanding that mobile-first means thinking about constraints first. Starting small and adding complexity is much easier than removing it.",
  "I spent 20 minutes debugging a layout issue that turned out to be a missing overflow: hidden. Now I always check parent containers first.",
  "Today's challenge taught me that good commit messages are almost as important as the code itself. Future-me will be grateful.",
];

// LinkedIn draft templates
export const linkedinDrafts = [
  `Day 12 of #ABTalks60 ✅

Today I built a responsive portfolio card using mobile-first CSS — no frameworks, pure fundamentals.

Key learnings:
→ CSS clamp() for fluid typography
→ Grid + Flexbox for adaptive layouts
→ :focus-visible for better accessibility

Still going, one day at a time. 💪

#100DaysOfCode #WebDev #CSS #BuildInPublic`,

  `12 days in, still shipping. 🚀

Built a portfolio card today as part of #ABTalks60 — focused on clean HTML structure and responsive design without relying on any framework.

What surprised me: how much difference proper spacing makes on mobile.

#WebDevelopment #CSS #LearningInPublic`,
];

// Social proof students
export const socialProofStudents = [
  {
    name: 'Aditya Kumar',
    college: 'IIT Bombay',
    track: 'AI/ML',
    avatar: 'AK',
    streak: 30,
    quote: 'ABTalks gave me the structure I was missing. Now I have 30 commits with real projects, not just tutorials.',
    day: 30,
  },
  {
    name: 'Sneha Iyer',
    college: 'NIT Trichy',
    track: 'Full Stack',
    avatar: 'SI',
    streak: 28,
    quote: 'I used to start projects and never finish them. This changed everything.',
    day: 28,
  },
  {
    name: 'Meera Krishnan',
    college: 'IIIT Bangalore',
    track: 'UI/UX',
    avatar: 'MK',
    streak: 20,
    quote: 'My LinkedIn got 3 DMs from recruiters after week 2. Not because of one post, but because of consistent ones.',
    day: 20,
  },
];

export const tracks = [
  {
    id: 'fullstack',
    name: 'Full Stack',
    description: 'Build complete web apps from scratch — React, Node, databases, and deployment.',
    icon: '🌐',
    color: '#6F7EF7',
    projects: ['Portfolio site', 'Task manager', 'Real-time chat', 'REST API'],
    level: 'Intermediate',
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    description: 'Work with Python, data science, and machine learning fundamentals through real datasets.',
    icon: '🤖',
    color: '#6A82D0',
    projects: ['Sentiment analyzer', 'Image classifier', 'Price predictor', 'Chatbot'],
    level: 'Intermediate',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Learn ethical hacking, network security, and build secure applications.',
    icon: '🔐',
    color: '#38B46A',
    projects: ['Password checker', 'Vulnerability scanner', 'Secure login system', 'CTF challenges'],
    level: 'Advanced',
  },
  {
    id: 'dsa',
    name: 'DSA',
    description: 'Master data structures and algorithms with daily problem-solving in your preferred language.',
    icon: '⚡',
    color: '#E7A53A',
    projects: ['Algorithm visualizer', 'LeetCode streaks', 'System design notes', 'Pattern library'],
    level: 'Beginner–Advanced',
  },
  {
    id: 'uiux',
    name: 'UI/UX',
    description: 'Design real product interfaces and build them with code. Figma to browser.',
    icon: '🎨',
    color: '#8B97D8',
    projects: ['Design system', 'App redesign', 'Prototype flows', 'Component library'],
    level: 'Beginner',
  },
];

export const faqs = [
  {
    question: "What if I miss a day?",
    answer: "You get one Streak Shield every 14 days — a protected miss that won't break your streak. Beyond that, your streak resets, but your progress doesn't. You can always resume from your current day.",
  },
  {
    question: "Do I need prior coding experience?",
    answer: "It depends on the track. DSA and UI/UX have beginner-friendly paths. Full Stack expects basic HTML/CSS/JS. AI/ML works best if you know Python. We're honest about prerequisites — no false promises.",
  },
  {
    question: "Can I do this during college?",
    answer: "That's exactly who this is for. Most participants are in their 2nd or 3rd year. The daily commitment is 2–4 hours, usually done late evenings. The pace is designed around a college schedule.",
  },
  {
    question: "Is the content free?",
    answer: "Yes — all challenges, resources, and the community are free. Your only investment is time and consistency.",
  },
  {
    question: "What do I get after 60 days?",
    answer: "60 GitHub commits, a public learning record, a streak on your profile, and the habit of building daily. These are real, concrete things. No certificates that nobody asks for.",
  },
  {
    question: "Is there a community?",
    answer: "Yes — we have a Discord where participants share progress, ask questions, and review each other's work. It's where most of the learning happens.",
  },
];
