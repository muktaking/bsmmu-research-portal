import Section_heading from './components/section_heading';
import { ResearcherType } from '@/types/researcher';
import Profile_snippet_shadcn from './components/profile_snippet_shadcn';
import Article_scale_section from './components/article_scale_section';
import { getAllResearcherData } from '@/api/researcher';
import Hero from './components/hero';
import Topicwise_nav from './components/topicwise_nav';
import QuickLinks from './components/quick_links';

export default async function Root() {
  const researchers = await getAllResearcherData();
  return (
    <>
      <div className="bg-custom-primary text-white">
        <Hero />
      </div>
      <Topicwise_nav />
      <div className="content-grid mx-5 mb-5 grid-cols-3 justify-center gap-x-7 md:mx-auto md:grid">
        <div className="col-span-2">
          <Section_heading heading="Researchers" />
          <div className="flex flex-wrap justify-around gap-3">
            {researchers?.map((researcher: ResearcherType) => (
              <Profile_snippet_shadcn
                key={researcher.id}
                researcher={researcher}
              />
            ))}
          </div>
          {/* Section Article_scale_section */}
          <div className="my-5">
            <Section_heading heading="Publications" />
            <Article_scale_section />
          </div>
        </div>
        <div className="col-span-1">
          <QuickLinks />
        </div>
      </div>
    </>
  );
}
