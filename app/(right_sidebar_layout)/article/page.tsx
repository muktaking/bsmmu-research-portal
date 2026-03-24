import { getAllArticleData } from '@/api/article';
import React from 'react';
import Article_snippet_shadcn from '../../components/article_snippet_shadcn';
import { ArticleType } from '@/types/article';
import { getPaginatedData } from '@/lib/utils';
import PaginationControls from '@/app/components/pagination_controls';

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
    <div className="content-grid mx-auto mb-7">
      <p className="mb-3 text-xl font-bold">Articles</p>
      <hr className="mb-5" />
      <div className="flex flex-wrap gap-3">
        {currentArticles?.map((article: ArticleType) => (
          <Article_snippet_shadcn key={article.id} article={article} />
        ))}
      </div>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        basePath="/article"
      />
    </div>
  );
}
