import React from 'react';

export default function Section_heading({ heading }: { heading: string }) {
  return (
    <div className="mb-5 border-b-4 border-amber-600">
      <p className="inline-block pb-1 text-2xl font-extrabold">{heading}</p>
    </div>
  );
}
