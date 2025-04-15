import Link from 'next/link';
import React from 'react';

export default function Not_Found() {
  return (
    <div className="h-screen p-10 text-center">
      <p className="mb-5 text-3xl font-bold text-red-800">
        Sorry:) The page is not found.
      </p>
      <Link className="text-lg hover:underline" href="/">
        Go to Home
      </Link>
    </div>
  );
}
