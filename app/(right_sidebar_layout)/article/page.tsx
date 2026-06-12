import { getAllArticleData } from '@/api/article';
import React from 'react';
import Article_snippet_shadcn from '../../components/article_snippet_shadcn';
import { ArticleType } from '@/types/article';
import { getPaginatedData } from '@/lib/utils';
import PaginationControls from '@/app/components/pagination_controls';
import { FileText, Sparkles } from 'lucide-react';

export default async function Articles(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const articles: ArticleType[] = await getAllArticleData();

  const {
    currentPageData: currentArticles,
    page,
    totalPages,
  } = getPaginatedData({
    searchParams,
    data: articles,
    limit: 10,
  });

  return (
    <div className="mx-auto mb-16 max-w-5xl px-4 py-12">
      {/* Page Header */}
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <Sparkles size={14} />
          Knowledge Base
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl">
          Research <span className="text-blue-600">Articles</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          Browse our extensive collection of validated psychiatry research and
          scholarly publications contributing to the clinical landscape of
          Bangladesh.
        </p>
      </div>

      {/* Articles Container */}
      <div className="space-y-6">
        <div className="flex flex-col gap-6">
          {currentArticles?.map((article: ArticleType) => (
            <Article_snippet_shadcn key={article.id} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 py-24 text-slate-400 dark:border-slate-800">
            <FileText size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">
              The archive is currently empty.
            </p>
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-center border-t border-slate-100 pt-10 dark:border-slate-800">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          basePath="/article"
        />
      </div>
    </div>
  );
}
