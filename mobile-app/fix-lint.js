import fs from 'node:fs';

function replaceFile(path, replacements) {
  let content = fs.readFileSync(path, 'utf8');
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(path, content, 'utf8');
}

// 1. app/dashboard/page.tsx
replaceFile('app/dashboard/page.tsx', [
  { from: "import { motion } from 'framer-motion';\n", to: "" },
  { from: "Flame, CheckCircle2, Shield, Calendar, Award,", to: "CheckCircle2, Shield, Calendar, Award," },
  { from: "import { Github, Linkedin } from '@/components/Icons';\n", to: "" },
  { from: "currentStudent, day12Challenge, achievements,", to: "currentStudent, day12Challenge," },
  { from: "getGreeting, getAvatarColor, formatTime, getDayOfWeek", to: "getGreeting, getAvatarColor" },
  { from: "const [time, setTime] = useState(new Date());", to: "const [time] = useState(new Date());" },
  { from: "Today's Task", to: "Today&apos;s Task" },
  { from: "Open Today's Challenge", to: "Open Today&apos;s Challenge" },
  { from: "weeklyHeatmap.map((day, i) =>", to: "weeklyHeatmap.map((day) =>" },
  { from: "key={i}", to: "key={day.day}" }
]);

// 2. app/day/[day]/page.tsx
replaceFile('app/day/[day]/page.tsx', [
  { from: "useState, useEffect", to: "useState" },
  { from: "ArrowLeft, CheckCircle2, Circle,", to: "ArrowLeft, CheckCircle2," },
  { from: "import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';\n", to: "" },
  { from: "const params = useParams();", to: "" }
]);

// 3. app/page.tsx
replaceFile('app/page.tsx', [
  { from: "Palette, Copy, Check,", to: "Palette," },
  { from: "import { toast } from 'sonner';\n", to: "" },
  { from: "const [copiedFaq, setCopiedFaq] = useState<number | null>(null);", to: "" },
  { from: "setCopiedFaq(i);", to: "" },
  { from: "setTimeout(() => setCopiedFaq(null), 2000);", to: "" },
  { from: "const Icon = item.icon;", to: "" },
  { from: "<Icon className", to: "<item.icon className" },
  { from: "\"Built a habit\"", to: "&quot;Built a habit&quot;" },
  { from: "\"I actually shipped something\"", to: "&quot;I actually shipped something&quot;" },
  { from: "you'll have", to: "you&apos;ll have" },
  { from: "you're stuck", to: "you&apos;re stuck" },
  { from: "didn't", to: "didn&apos;t" },
  { from: "You'll know", to: "You&apos;ll know" },
  { from: "It's a", to: "It&apos;s a" },
  { from: "\"How to center a div\"", to: "&quot;How to center a div&quot;" }
]);

// 4. components/EnergyCheckin.tsx
replaceFile('components/EnergyCheckin.tsx', [
  { from: "Let's", to: "Let&apos;s" }
]);

// 5. components/MidnightRescue.tsx
replaceFile('components/MidnightRescue.tsx', [
  { from: "getMidnightCountdown, isAfterTenPM", to: "getMidnightCountdown" }
]);

// 6. components/MomentumCard.tsx
replaceFile('components/MomentumCard.tsx', [
  { from: "import { motion } from 'framer-motion';\n", to: "" },
  { from: "You're in the top", to: "You&apos;re in the top" }
]);

// 7. components/Confetti.tsx
replaceFile('components/Confetti.tsx', [
  { from: "borderRadius: Math.random() > 0.5 ? '50%' : '2px',", to: "" },
  { from: "size: number;", to: "size: number;\n  borderRadius: string;" },
  { from: "size: 4 + Math.random() * 6,", to: "size: 4 + Math.random() * 6,\n        borderRadius: Math.random() > 0.5 ? '50%' : '2px'," },
  { from: "borderRadius: Math.random() > 0.5 ? '50%' : '2px',", to: "borderRadius: p.borderRadius," }
]);

console.log('Linting issues fixed!');
