import React from 'react';

export default function Section_heading({ heading }) {
  return (
    <div className="text-center">
      <p className="text-custom-primary mb-3 inline-block border-b-4 px-5 text-2xl font-extrabold">
        {heading}
      </p>
    </div>
  );
}
