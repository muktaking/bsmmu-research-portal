import { Button } from '@/components/ui/button';
import { ResearcherType } from '@/types/researcher';
import React from 'react';

export default function Profile_top_section({
  researcher,
}: {
  researcher: ResearcherType;
}) {
  return (
    <div className="bg-custom-secondary p-5">
      <div className="content-grid mx-auto flex flex-wrap items-center justify-center gap-3 md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-5">
          <img
            className="h-24 w-24 rounded-full ring-4 ring-white"
            src={
              researcher.avatar
                ? `/assets/images/researchers/${researcher.avatar}`
                : `/assets/images/researchers/man.png`
            }
          ></img>
          <div className="">
            <p className="text-2xl">
              {researcher.firstname + ' ' + researcher.lastname}
            </p>
            <p className="text-slate-600">
              <span>{researcher.degree.trim() + ', '}</span>
              <span>{researcher.designation.trim() + ', '}</span>
              <span>{researcher.institute.trim()}</span>
            </p>
          </div>
        </div>
        <div className="">
          <Button size="lg" variant="outline" className="mx-auto">
            <a href={`mailto:${researcher.email}`}>Contact</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
