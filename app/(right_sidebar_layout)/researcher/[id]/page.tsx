import Profile_top_section from '@/app/components/profile/profile_top_section';
import Profile_navbar from '@/app/components/profile/profile_navbar';
import Profile_about_block from '@/app/components/profile/profile_about_block';
import Article_snippet_shadcn from '@/app/components/article_snippet_shadcn';
import { getResearcherDataById } from '@/api/researcher';
import { ResearcherType } from '@/types/researcher';
import { ArticleType } from '@/types/article';
import { getArticleDataByResearcherId } from '@/api/article';
import { BookOpen, User, FileText } from 'lucide-react';

export default async function Researcher({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const researcher: ResearcherType = await getResearcherDataById(id);
  const articlesByResearcherId: ArticleType[] =
    await getArticleDataByResearcherId(id);

  return (
    <div className="relative min-h-screen bg-slate-50/50 pb-20 dark:bg-slate-950">
      {/* Background Decorations */}
      <div className="absolute top-0 -z-10 h-[500px] w-full bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20" />
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-indigo-400/5 blur-[100px]" />

      <Profile_top_section researcher={researcher} />
      <Profile_navbar />

      <main className="container mx-auto mt-12 max-w-5xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12">
          {/* About Section */}
          <section id="about" className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              <User size={28} className="text-blue-600" />
              <h2>Biography & Summary</h2>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <Profile_about_block researcher={researcher} />
            </div>
          </section>

          {/* Publications Section */}
          <section id="publications" className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                <BookOpen size={28} className="text-blue-600" />
                <h2>Research Publications</h2>
              </div>
              <div className="rounded-full bg-blue-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                {articlesByResearcherId.length} Articles
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {articlesByResearcherId?.map((article: ArticleType) => (
                <Article_snippet_shadcn key={article.id} article={article} />
              ))}

              {articlesByResearcherId?.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 bg-white py-24 text-slate-400 dark:border-slate-800 dark:bg-transparent">
                  <FileText size={48} className="mb-4 opacity-20" />
                  <p className="text-lg font-medium">
                    No publications registered yet.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
