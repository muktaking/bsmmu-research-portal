import React from 'react';
import Article_snippet_shadcn from './article_snippet_shadcn';
import Scale_snippet_shadcn from './scale_snippet_shadcn';

export default function Article_scale_section() {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="mb-3">
        <p className="mb-3 text-2xl font-bold">Trending Articles</p>
        <div className="">
          {[1, 2, 3, 4].map((e) => (
            <Article_snippet_shadcn key={e} />
          ))}
        </div>
      </div>
      <div className="border-t-2 border-stone-400 pt-5 md:border-l-2 md:border-t-0 md:pl-10">
        <p className="mb-3 text-2xl font-bold">Latest Scales</p>
        <div className="">
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <Scale_snippet_shadcn key={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
