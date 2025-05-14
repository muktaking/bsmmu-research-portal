import { Badge } from '@/components/ui/badge';
import { ArticleType } from '@/types/article';
import Link from 'next/link';

export default function Article_snippet_shadcn({
  article,
}: {
  article: ArticleType;
}) {
  return (
    <div className="mb-3 border-b-2 border-stone-300 pb-3" id="publication">
      <div>
        <Link href={`/article/${article.id}`} className="link font-bold">
          {article.title}
        </Link>
        <div className="my-2">
          <Badge className="mr-3 bg-slate-700 py-1">Article</Badge>
          <span className="yas-text-muted">{article.published_year}</span>
        </div>

        <p className="text-sm">
          <span className="">{article.author.join(',')}</span>
        </p>
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
