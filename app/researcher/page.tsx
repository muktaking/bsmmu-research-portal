import Section_heading from '@/app/components/section_heading';
import Profile_snippet_shadcn from '@/app/components/profile_snippet_shadcn';
import { ResearcherType } from '@/types/researchers';

async function getData() {
  const res = await fetch('http://localhost:8888/researchers', {
    cache: 'no-store', // important if you want *true* server-side fetching every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Researchers() {
  const researchers = await getData();

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
