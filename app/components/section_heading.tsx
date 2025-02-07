import React from 'react';

export default function Section_heading({ heading }) {
  return (
    <div className="my-2 text-center">
      <p className="mb-3 inline-block border-b-4 border-sky-400 px-8 pb-3 text-2xl font-extrabold">
        {heading}
      </p>
    </div>
  );
}
