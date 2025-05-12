import { getArticleDataById } from '@/api/article';
import { Badge } from '@/components/ui/badge';
import { ArticleType } from '@/types/article';
import React from 'react';

export default async function Article({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const article: ArticleType = await getArticleDataById(id);
  return (
    <div className="content-grid mx-auto my-7">
      <p className="text-xl font-semibold">{article.title}</p>
      <div className="ml-5 mt-3">
        <Badge className="mr-3 bg-slate-700 py-1">{'Article'}</Badge>
        <span className="yas-text-muted">{article.published_year}</span>
      </div>
      <div className="mt-5">
        <p className="text-lg font-semibold">Authors</p>
        <div className="mb-3 ml-5">
          {article.author?.map((authorName: string) => (
            <Badge key={authorName} className="mr-2">
              {authorName}
            </Badge>
          ))}
        </div>
        <p className="bg-zinc-300 py-5 pl-3 pr-7 text-black">
          {article.summary}
        </p>
        <div className="my-5 flex flex-wrap items-end gap-3">
          <div>
            <span className="font-semibold">Tages: </span>
            {article.tags?.map((tag) => (
              <Badge key={tag} className="mr-2 bg-zinc-600">
                {tag}
              </Badge>
            ))}
          </div>
          <p>
            <a
              href={article.publication_link}
              className="text-blue-700 underline"
            >
              Go to full publication
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
