import { getArticleDataById } from '@/api/article';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleType } from '@/types/article';
import {
  Calendar,
  ChevronLeft,
  ExternalLink,
  FileText,
  Tag,
  Users,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function Article({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const article: ArticleType = await getArticleDataById(id);

  return (
    <div className="mx-auto mb-16 max-w-4xl px-4 py-8">
      {/* Navigation */}
      <Link
        href="/article"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        <ChevronLeft size={16} />
        Back to Research Archive
      </Link>

      <div className="space-y-10">
        {/* Header Section */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Badge className="bg-blue-600/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:bg-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400">
              Journal Article
            </Badge>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
              <Calendar size={16} className="text-slate-400" />
              <span>Published in {article.published_year}</span>
            </div>
          </div>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          {/* Authors */}
          <div className="flex flex-wrap items-center gap-3 border-y border-slate-100 py-6 dark:border-slate-800/50">
            <Users size={20} className="shrink-0 text-slate-400" />
            <div className="flex flex-wrap gap-2">
              {article.author_name?.map((authorName: string, index: number) => {
                const authorId = article.author_id[index];
                if (authorId) {
                  return (
                    <Link
                      key={authorId}
                      href={`/researcher/${authorId}`}
                      className="rounded-full bg-slate-100 px-4 py-1 text-sm font-bold text-slate-700 transition-all hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white"
                    >
                      {authorName}
                    </Link>
                  );
                }
                return (
                  <span
                    key={index}
                    className="rounded-full bg-slate-50 px-4 py-1 text-sm font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400"
                  >
                    {authorName}
                  </span>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <BookOpen size={20} className="text-blue-600" />
            <h2>Abstract & Description</h2>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
            <p className="whitespace-pre-line text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {article.description}
            </p>
          </div>
        </section>

        {/* Footer Metadata & Links */}
        <footer className="flex flex-col gap-8 rounded-[2rem] bg-slate-50 p-8 dark:bg-slate-900/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
              <Tag size={14} />
              <span>Research Keywords</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-lg border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                  {tag}
                </Badge>
              ))}
              {!article.tags?.length && (
                <span className="text-sm italic text-slate-400">
                  No keywords provided
                </span>
              )}
            </div>
          </div>

          {article.publication_link && (
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-blue-600 px-8 font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
            >
              <a
                href={
                  article.publication_link.startsWith('http')
                    ? article.publication_link
                    : `${process.env.NEXT_PUBLIC_API_URL}${article.publication_link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FileText size={18} />
                Full Publication
                <ExternalLink size={16} />
              </a>
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
}
