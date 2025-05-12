import React from 'react';
import Article_snippet_shadcn from './article_snippet_shadcn';
import Scale_snippet_shadcn from './scale_snippet_shadcn';
import { getAllScaleData } from '@/api/scale';
import { getAllArticleData } from '@/api/article';
import { ArticleType } from '@/types/article';

export default async function Article_scale_section() {
  const scales = await getAllScaleData();
  const articles = await getAllArticleData();
  return (
    <div className="content-grid grid-cols-2 md:grid">
      <div className="col-span-1 mb-5 mr-3">
        <p className="mb-3 text-xl font-bold">Trending Articles</p>
        <hr className="mb-5" />
        <div className="">
          {articles?.map((article: ArticleType) => (
            <Article_snippet_shadcn key={article.id} article={article} />
          ))}
        </div>
      </div>
      <div className="col-span-1 border-t-2 border-stone-400 pt-5 md:border-l-2 md:border-t-0 md:pl-7 md:pt-0">
        <p className="mb-3 text-xl font-bold">Latest Scales</p>
        <hr className="mb-5" />
        <div className="">
          {scales?.map((scale: ScaleType) => (
            <Scale_snippet_shadcn key={scale.id} scale={scale} />
          ))}
        </div>
      </div>
    </div>
  );
}
