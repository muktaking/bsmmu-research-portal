import React from 'react';

export default function Section_block({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className="content-grid mx-auto mb-5">
      <div className="gap-x- flex flex-nowrap items-center pt-3">
        <p className="my-5 text-2xl text-slate-600">{header}</p>
        <div className="h-[1px] grow bg-gray-300"></div>
      </div>
      <div className="border-2 bg-white p-5 shadow-md">{children}</div>
    </div>
  );
}
