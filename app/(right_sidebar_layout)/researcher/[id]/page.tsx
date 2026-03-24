import Profile_top_section from '@/app/components/profile/profile_top_section';
import Profile_navbar from '@/app/components/profile/profile_navbar';
import Section_block from '@/app/components/profile/section_block';

import Profile_about_block from '@/app/components/profile/profile_about_block';
import Article_snippet_shadcn from '@/app/components/article_snippet_shadcn';
import { getResearcherDataById } from '@/api/researcher';
import { ResearcherType } from '@/types/researcher';
import { ArticleType } from '@/types/article';
import { getArticleDataByResearcherId } from '@/api/article';

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
    <div className="">
      <Profile_top_section researcher={researcher} />
      <Profile_navbar />
      <div className="bg-gray-100 px-5 pb-5">
        <Section_block header="About">
          <Profile_about_block researcher={researcher} />
        </Section_block>
        <Section_block header="Publications">
          <div className="">
            {articlesByResearcherId?.map((article: ArticleType) => (
              <Article_snippet_shadcn key={article.id} article={article} />
            ))}
          </div>
        </Section_block>
      </div>
    </div>
  );
}
