import { getAllResearcherData } from '@/api/researcher';
import Section_heading from '../components/section_heading';
import { ResearcherType } from '@/types/researcher';
import Profile_snippet_shadcn from '../components/profile_snippet_shadcn';

export default async function Institutes() {
  const researchers = await getAllResearcherData();
  return (
    <div className="mx-10 mb-10">
      <Section_heading heading="Researchers" />
      <div className="flex flex-wrap justify-around gap-3">
        {researchers?.map((researcher: ResearcherType) => (
          <Profile_snippet_shadcn key={researcher.id} researcher={researcher} />
        ))}
      </div>
    </div>
  );
}
