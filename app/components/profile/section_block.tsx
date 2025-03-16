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
      <div className="grid grid-cols-12 items-center pt-3">
        <p className="col-span-2 my-5 text-2xl text-slate-600 md:col-span-1">
          {header}
        </p>
        <div className="col-span-10 h-[1px] bg-gray-300 md:col-span-11"></div>
      </div>
      <div className="border-2 bg-white p-5 shadow-md">{children}</div>
    </div>
  );
}
