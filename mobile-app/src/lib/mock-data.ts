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
  /** One-sentence outcome — shown as the Goal card at the top of the day. */
  goal: string;
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
  /** Groups resources into the three shortcut buttons on the day page. */
  kind?: 'starter' | 'inspiration' | 'guide';
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
  goal:
    'By the end of today, you’ll have a responsive portfolio card you can reuse in your own site and share on LinkedIn.',
  difficulty: 'Intermediate',
  estimatedTime: '60–90 min',
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
    { id: 'r4', label: 'Make it responsive across 320px–1440px', completed: false },
    { id: 'r5', label: 'Push code to GitHub with a clear commit message', completed: false },
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
      title: 'Portfolio card starter template',
      url: 'https://github.com/abtalks/day12-starter',
      type: 'github',
      kind: 'starter',
    },
    {
      title: 'CSS Grid Complete Guide',
      url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
      type: 'article',
      kind: 'inspiration',
    },
    {
      title: 'How to submit: commit + LinkedIn post',
      url: 'https://github.com/abtalks/submission-guide',
      type: 'article',
      kind: 'guide',
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
  { id: 'a1', title: '7-Day Streak', description: 'Seven days in a row', icon: '🔥', earned: true, earnedAt: 'Day 7' },
  { id: 'a2', title: 'First GitHub Commit', description: 'Pushed your first proof', icon: '💻', earned: true, earnedAt: 'Day 1' },
  { id: 'a3', title: 'First LinkedIn Post', description: 'Documented a build publicly', icon: '📢', earned: true, earnedAt: 'Day 1' },
  { id: 'a4', title: '10-Day Consistency', description: 'Ten days of showing up', icon: '⚡', earned: true, earnedAt: 'Day 10' },
  { id: 'a5', title: 'Two Weeks Strong', description: '14-day streak', icon: '🔥', earned: false },
  { id: 'a6', title: 'Halfway Hero', description: 'Day 30 completed', icon: '🏆', earned: false },
  { id: 'a7', title: 'LinkedIn Pro', description: '10 LinkedIn posts', icon: '📢', earned: false },
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
    color: '#F59E0B',
    projects: ['Portfolio site', 'Task manager', 'Real-time chat', 'REST API'],
    level: 'Intermediate',
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    description: 'Work with Python, data science, and machine learning fundamentals through real datasets.',
    icon: '🤖',
    color: '#F97316',
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
    color: '#F97316',
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

// ─── Home Screen Mock Data ───

export const homeFocusTask = {
  title: 'Build a Responsive Portfolio Card',
  description: 'Create a polished, mobile-first developer portfolio card with CSS Grid.',
  progress: 35,
  estimatedMinutes: 45,
  track: 'Full Stack',
  day: 12,
};

export const homeQuickActions = [
  { id: 'plan', label: 'Generate Study Plan', icon: '📋', color: '#F59E0B' },
  { id: 'ai', label: 'Ask AI Assistant', icon: '🤖', color: '#7C8CFF' },
  { id: 'task', label: 'Add Task', icon: '✅', color: '#22C55E' },
  { id: 'focus', label: 'Start Focus', icon: '⏱️', color: '#F97316' },
  { id: 'analytics', label: 'View Analytics', icon: '📊', color: '#8B5CF6' },
  { id: 'voice', label: 'Voice Note', icon: '🎙️', color: '#EC4899' },
];

export const homeSchedule = [
  { time: '9:00 AM', title: 'CSS Grid Fundamentals', priority: 'high' as const, done: true },
  { time: '2:00 PM', title: 'Portfolio Card Build', priority: 'high' as const, done: false },
  { time: '5:00 PM', title: 'GitHub Commit + LinkedIn Post', priority: 'medium' as const, done: false },
];

export const homeAiInsights = [
  'You study best between 7–9 PM. Schedule complex tasks then.',
  'You missed your OS revision yesterday. Pick it up today.',
  'Complete 2 DSA problems today to maintain your streak.',
  'Your focus score has improved 15% this week. Keep it up.',
  'You tend to skip weekends. Even 30 minutes counts.',
];

export const homeStats = {
  weeklyHours: 18.5,
  tasksToday: 3,
  focusScore: 87,
  productivityTrend: '+12%',
};

export const homeAchievements = [
  { id: 'streak7', title: '7-Day Streak', icon: '🔥', earned: true },
  { id: 'early', title: 'Early Starter', icon: '🌅', earned: true },
  { id: 'consistent', title: 'Consistency', icon: '⚡', earned: false },
  { id: 'deep', title: 'Deep Work', icon: '🧠', earned: false },
];

export const homeNotifications = [
  { id: 'n1', title: 'Day 12 challenge is waiting', time: '2h ago', type: 'reminder' as const },
  { id: 'n2', title: 'Sneha completed Day 28', time: '4h ago', type: 'social' as const },
  { id: 'n3', title: 'Focus session goal reached!', time: 'Yesterday', type: 'achievement' as const },
];

export const homeRecentActivity = [
  { action: 'Completed CSS Grid lesson', time: '9:15 AM', icon: '✅' },
  { action: 'Pushed commit to GitHub', time: 'Yesterday', icon: '📦' },
  { action: '25-min focus sprint done', time: 'Yesterday', icon: '⏱️' },
  { action: 'LinkedIn post shared', time: '2 days ago', icon: '📢' },
];

// ─── Landing Page Sections ───

export interface TrustStat {
  id: string;
  icon: string;
  value: number | null;
  /** Static display text used instead of a counted number (e.g. phrase cards). */
  display?: string;
  suffix?: string;
  label: string;
}

export const trustStats: TrustStat[] = [
  { id: 'students', icon: '👩‍🎓', value: 5200, suffix: '+', label: 'students joined' },
  { id: 'commits', icon: '💾', value: 180000, suffix: '+', label: 'commits submitted' },
  { id: 'certificate', icon: '🏆', value: 60, suffix: '-day', label: 'completion certificate' },
  { id: 'portfolio', icon: '💼', value: null, display: 'Recruiter-ready', label: 'portfolio building' },
];

export const howItWorksSteps = [
  {
    step: 1,
    icon: '🎯',
    title: 'Pick a track',
    desc: 'Choose Full Stack, AI/ML, DSA, Cybersecurity, or UI/UX — a 60-day path matched to your level.',
  },
  {
    step: 2,
    icon: '🔨',
    title: 'Build every day',
    desc: 'Spend 60–90 minutes shipping one real thing. Commit it to GitHub and post a short LinkedIn update.',
  },
  {
    step: 3,
    icon: '✅',
    title: 'Submit proof of work',
    desc: 'Paste your links into the day page, lock in your streak, and watch your public record grow.',
  },
];

export const motivationStudents = [
  {
    name: 'Aditya Kumar',
    college: 'IIT Bombay',
    track: 'AI/ML',
    avatar: 'AK',
    streak: 30,
    day: 30,
    quote: 'ABTalks gave me the structure I was missing. Now I have 30 commits with real projects, not just tutorials.',
  },
  {
    name: 'Sneha Iyer',
    college: 'NIT Trichy',
    track: 'Full Stack',
    avatar: 'SI',
    streak: 28,
    day: 28,
    quote: 'I used to start projects and never finish them. The daily proof changed everything.',
  },
  {
    name: 'Meera Krishnan',
    college: 'IIIT Bangalore',
    track: 'UI/UX',
    avatar: 'MK',
    streak: 20,
    day: 20,
    quote: 'My LinkedIn got 3 recruiter DMs after week 2. Not because of one post — because of consistent ones.',
  },
  {
    name: 'Dhruv Patel',
    college: 'BITS Pilani',
    track: 'Cybersecurity',
    avatar: 'DP',
    streak: 25,
    day: 25,
    quote: '25 straight days of shipping. My GitHub graph finally looks like a real developer’s.',
  },
  {
    name: 'Priya Nair',
    college: 'NITK Surathkal',
    track: 'AI/ML',
    avatar: 'PN',
    streak: 14,
    day: 14,
    quote: 'Two weeks in and the habit finally feels automatic. The streak keeps me honest.',
  },
  {
    name: 'Riya Joshi',
    college: 'Jadavpur University',
    track: 'DSA',
    avatar: 'RJ',
    streak: 18,
    day: 18,
    quote: 'I stopped doomscrolling. Now I solve and I ship — and I actually look forward to it.',
  },
];

export const faqItems = [
  {
    question: 'Do I need prior experience?',
    answer:
      'No. Tracks range from beginner to advanced — UI/UX and DSA start from zero. We’re honest about prerequisites so you pick a path you can actually finish.',
  },
  {
    question: 'How much time per day?',
    answer:
      'About 60–90 minutes a day. Some days are shorter, some run longer when you’re in the flow. It’s designed around a college schedule, usually evenings.',
  },
  {
    question: 'What happens if I miss a day?',
    answer:
      'Your streak resets but your progress never does — you can resume from your current day anytime. You also earn a Streak Shield every 14 days to protect one miss.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. All challenges, resources, and the community are completely free for students. Your only investment is time and consistency.',
  },
];

// ─── Dashboard timeline ───

export type DayStatus = 'completed' | 'today' | 'missed';

/** Last 7 days of the challenge — "today" is the live end of the array. */
export const weeklyTimeline: { day: string; status: DayStatus }[] = [
  { day: 'Mon', status: 'completed' },
  { day: 'Tue', status: 'completed' },
  { day: 'Wed', status: 'completed' },
  { day: 'Thu', status: 'completed' },
  { day: 'Fri', status: 'completed' },
  { day: 'Sat', status: 'missed' },
  { day: 'Sun', status: 'today' },
];

/** Mocked percentile rank — used for the "Standing" stat. */
export const standingPercentile = 18;
