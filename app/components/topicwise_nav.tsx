import Link from 'next/link';
import React from 'react';

export default function Topicwise_nav() {
  return (
    <div className="content-grid mx-auto mb-7 mt-5">
      <p className="mb-5 text-center text-2xl font-bold">Browse by Topics</p>
      <div className="flex flex-wrap justify-around gap-3">
        <Topic title="Researcher" link="/researcher" />
        <Topic title="Article" link="/article" />
        <Topic title="Scale" link="/scale" />
        <Topic title="Institute" link="/institute" />
      </div>
    </div>
  );
}

function Topic({ title, link }: { title: string; link: string }) {
  return (
    <Link href={link}>
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-600 shadow-lg shadow-gray-500/50">
        <p className="text-white">{title}</p>
      </div>
    </Link>
  );
}
