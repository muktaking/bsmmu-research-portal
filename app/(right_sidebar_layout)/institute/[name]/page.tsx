import { getResearcherDataByInstituteID } from '@/api/researcher';
import Profile_snippet_shadcn from '@/app/components/profile_snippet_shadcn';
import Section_heading from '@/app/components/section_heading';
import { instituteCode, ResearcherType } from '@/types/researcher';
import React from 'react';
import { FaRegSadCry } from 'react-icons/fa';

export default async function Institute({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const researchers = await getResearcherDataByInstituteID(instituteCode(name));
  return (
    <div className="content-grid mx-auto mb-7">
      <Section_heading heading={'Researchers of ' + name.toUpperCase()} />
      <div className="flex flex-wrap justify-around gap-3">
        {researchers.length > 0 ? (
          researchers.map((researcher: ResearcherType) => (
            <Profile_snippet_shadcn
              key={researcher.id}
              researcher={researcher}
            />
          ))
        ) : (
          <div className="flex flex-col items-center gap-y-5 text-center">
            <FaRegSadCry size="7rem" color="red" />
            <p>Sorry, Yet no researcher is enlisted from this institute!!!</p>
          </div>
        )}
      </div>
    </div>
  );
}
