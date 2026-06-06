import Link from 'next/link';
import React from 'react';
import { GraduationCap, FileText, Activity, Landmark } from 'lucide-react';

export default function Topicwise_nav() {
  return (
    <div className="mx-auto mb-16 mt-12 max-w-5xl px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Explore Archives
        </h2>
        <p className="mt-2 text-slate-500">
          Quick access to our research modules
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
        <Topic
          title="Researchers"
          link="/researcher"
          icon={<GraduationCap className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <Topic
          title="Articles"
          link="/article"
          icon={<FileText className="h-6 w-6" />}
          color="bg-emerald-500"
        />
        <Topic
          title="Scales"
          link="/scale"
          icon={<Activity className="h-6 w-6" />}
          color="bg-orange-500"
        />
        <Topic
          title="Institutes"
          link="/institute"
          icon={<Landmark className="h-6 w-6" />}
          color="bg-indigo-500"
        />
      </div>
    </div>
  );
}

function Topic({
  title,
  link,
  icon,
  color,
}: {
  title: string;
  link: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Link href={link} className="group">
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:bg-slate-900 dark:ring-slate-800">
        <div
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${color} bg-opacity-10 text-slate-900 transition-colors group-hover:bg-opacity-100 group-hover:text-white dark:text-white`}
        >
          {icon}
        </div>
        <p className="font-bold tracking-tight text-slate-700 dark:text-slate-300">
          {title}
        </p>

        {/* Subtle Decorative element */}
        <div
          className={`absolute -bottom-4 -right-4 h-12 w-12 rounded-full ${color} opacity-[0.03] transition-transform group-hover:scale-[3]`}
        ></div>
      </div>
    </Link>
  );
}
