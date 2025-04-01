import { Button } from '@/components/ui/button';
import React from 'react';

export default function Profile_top_section() {
  return (
    <div className="bg-custom-secondary p-5">
      <div className="content-grid mx-auto flex flex-wrap items-center justify-center gap-3 md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-5">
          <img
            className="h-24 w-24 rounded-full ring-4 ring-white"
            src="/assets/images/researchers/1.jpg"
          ></img>
          <div className="">
            <p className="text-2xl">Dr. M.M.A. Shalahuddin Qusar </p>
            <p className="text-slate-600">
              <span>Professor, </span>
              <span>Deperment of Psychiatry, </span>
              <span>BSMMU</span>
            </p>
          </div>
        </div>
        <div className="">
          <Button size="lg" variant="outline" className="mx-auto">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
}
