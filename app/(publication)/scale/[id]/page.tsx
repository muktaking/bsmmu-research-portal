import React from 'react';
import Profile_snippet_shadcn from '@/app/components/profile_snippet_shadcn';

type Params = Promise<{ id: string }>;

export default async function Scale({ params }: { params: Params }) {
  const { id } = await params;
  return (
    <div className="m-7">
      <h3>Scale ID: {id}</h3>
      <div className="content-grid mx-auto">
        <p className="text-xl font-bold">Beck Scale for Suicidal</p>
        <p className="yas-text-muted my-3">Publish Date: January 2013</p>
        <div className="mb-3">
          <p className="mb-3 font-bold">Authors:</p>
          <div className="flex flex-wrap gap-2">
            {[1, 2].map((e, i) => (
              <Profile_snippet_shadcn key={i} />
            ))}
          </div>
        </div>
        <div className="my-3">Tags: Suicidal, Beck, Scale</div>
        <div>Publication link</div>
        <div className="my-5">
          <p className="font-bold">Rule of Usage</p>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              hendrerit odio sit amet ante placerat ultricies. Suspendisse
              tincidunt neque vitae lorem consequat, nec porttitor odio
              tristique. Suspendisse in dolor eget erat faucibus finibus. Donec
              non nisl congue, fringilla sem consequat, lacinia mauris. Nam
              mattis felis eu nunc consequat, vitae ultricies erat suscipit. Ut
              sodales lacus ac ipsum congue dignissim. Fusce tristique erat eu
              auctor vulputate. Donec dignissim velit vitae dolor placerat, eu
              efficitur mauris tempus. Phasellus nec justo a nulla placerat
              dictum vitae a nulla. Sed mattis urna vel volutpat auctor. Proin
              consequat diam in accumsan consectetur. Donec feugiat lorem a
              justo sollicitudin gravida. Maecenas dapibus metus non tempus
              venenatis
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              hendrerit odio sit amet ante placerat ultricies. Suspendisse
              tincidunt neque vitae lorem consequat, nec porttitor odio
              tristique. Suspendisse in dolor eget erat faucibus finibus. Donec
              non nisl congue, fringilla sem consequat, lacinia mauris. Nam
              mattis felis eu nunc consequat, vitae ultricies erat suscipit. Ut
              sodales lacus ac ipsum congue dignissim. Fusce tristique erat eu
              auctor vulputate. Donec dignissim velit vitae dolor placerat, eu
              efficitur mauris tempus. Phasellus nec justo a nulla placerat
              dictum vitae a nulla. Sed mattis urna vel volutpat auctor. Proin
              consequat diam in accumsan consectetur. Donec feugiat lorem a
              justo sollicitudin gravida. Maecenas dapibus metus non tempus
              venenatis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
