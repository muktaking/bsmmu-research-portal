import Profile_snippet_shadcn from '@/app/components/profile_snippet_shadcn';
import { ResearcherType } from '@/types/researcher';
import { getAllResearcherData } from '@/api/researcher';
import { GraduationCap } from 'lucide-react';

export default async function Researchers() {
  const researchers = await getAllResearcherData();

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      {/* Modern Header Section */}
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 shadow-inner">
          <GraduationCap size={32} />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          Our{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Researchers
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          Meet the dedicated professionals advancing psychiatric research and
          clinical practice in Bangladesh.
        </p>
      </div>

      {/* Main Content with Background Decoration */}
      <div className="relative">
        <div className="absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-blue-400/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-indigo-400/5 blur-[120px]" />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {researchers?.map((researcher: ResearcherType) => (
            <Profile_snippet_shadcn
              key={researcher.id}
              researcher={researcher}
            />
          ))}

          {researchers?.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 py-24 text-center dark:border-slate-800">
              <GraduationCap
                size={48}
                className="mb-4 text-slate-300 dark:text-slate-700"
              />
              <p className="text-xl font-medium text-slate-400">
                No researchers found in our database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
