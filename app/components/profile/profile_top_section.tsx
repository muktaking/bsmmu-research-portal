import { Button } from '@/components/ui/button';
import { getInstituteKey, Institute, ResearcherType } from '@/types/researcher';
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
              researcher.avatar !== 'neutral'
                ? `/assets/images/researchers/${researcher.avatar}`
                : `/assets/images/researchers/man.png`
            }
          ></img>
          <div className="">
            <p className="text-2xl">
              {researcher.firstname + ' ' + researcher.lastname}
            </p>
            <p className="text-slate-600">
              {researcher.degree && (
                <span>{researcher.degree.trim() + ', '}</span>
              )}
              {researcher.designation && (
                <span>{researcher.designation.trim() + ', '}</span>
              )}
              {researcher.institute && (
                <span>
                  {getInstituteKey(researcher.institute).toUpperCase()}
                </span>
              )}
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
