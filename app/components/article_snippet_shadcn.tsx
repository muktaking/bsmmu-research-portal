import { Badge } from '@/components/ui/badge';
import { ArticleType } from '@/types/article';
import Link from 'next/link';
import { Calendar, User, FileText, ArrowRight } from 'lucide-react';

export default function Article_snippet_shadcn({
  article,
}: {
  article: ArticleType;
}) {
  return (
    <div className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600/10 text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:bg-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400">
              Journal Article
            </Badge>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Calendar size={14} className="text-slate-400" />
              <span>{article.published_year}</span>
            </div>
          </div>

          <Link
            href={`/article/${article.id}`}
            className="block text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
          >
            {article.title}
          </Link>
        </div>
        <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-900 dark:group-hover:bg-blue-900/20 sm:flex">
          <FileText size={24} />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <User size={16} className="text-slate-400" />
        <p className="font-medium italic">{article.author_name.join(', ')}</p>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800/50">
        <Link
          href={`/article/${article.id}`}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 transition-all hover:gap-3 dark:text-blue-400"
        >
          View Full Article <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

/*
title
author
journal
PMID
*/
