import { Badge } from '@/components/ui/badge';

export default function Article_snippet_shadcn() {
  return (
    <div className="mb-3 border-b-2 border-stone-300 pb-3">
      <div>
        <a href="#" className="font-bold hover:underline">
          Premature ejaculation among post-coronary artery stenting patients
          attending cardiology out patient department of tertiary care hospital
        </a>
        <div className="my-2">
          <Badge className="mr-3 bg-blue-500 py-1">Article</Badge>
          <span className="yas-text-muted">Mar 2005</span>
        </div>

        <p className="text-sm">
          <span className="">M M A Shalahuddin Qusar, et al.</span>
        </p>
      </div>
    </div>
  );
}

/*
title
author
journal
PMID
*/
