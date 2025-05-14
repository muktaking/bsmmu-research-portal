import { getAllArticleData } from '@/api/article';
import React from 'react';
import Article_snippet_shadcn from '../../components/article_snippet_shadcn';
import { ArticleType } from '@/types/article';

export default async function Articles() {
  const articles = await getAllArticleData();
  return (
    <div className="content-grid mx-auto mb-7">
      <p className="mb-3 text-xl font-bold">Articles</p>
      <hr className="mb-5" />
      <div className="flex flex-wrap gap-3">
        {articles?.map((article: ArticleType) => (
          <Article_snippet_shadcn key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
