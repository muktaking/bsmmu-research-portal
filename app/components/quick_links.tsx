import React from 'react';
import Section_heading from './section_heading';
import { University, Brain, Globe, ArrowRight } from 'lucide-react';

export default function QuickLinks() {
  return (
    <div>
      <Section_heading heading="Quick Links" />
      <div className="grid gap-4">
        {QLinks?.map((qlink) => (
          <QLink
            key={qlink.title}
            title={qlink.title}
            link={qlink.link}
            icon={qlink.icon}
          />
        ))}
      </div>
    </div>
  );
}

const QLinks = [
  {
    title: 'Bangladesh Medical University',
    link: 'http://bmu.ac.bd/',
    icon: <University size={20} />,
  },
  {
    title: 'National Institute of Mental Health',
    link: 'https://nimh.gov.bd/',
    icon: <Brain size={20} />,
  },
  {
    title: 'ResearchGate',
    link: 'https://www.researchgate.net/',
    icon: <Globe size={20} />,
  },
];

function QLink({
  title,
  link,
  icon,
}: {
  title: string;
  link: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
          {icon}
        </div>
        <span className="text-base font-medium text-slate-700 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">
          {title}
        </span>
      </div>
      <ArrowRight
        className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"
        size={16}
      />
    </a>
  );
}
