import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function PaginationControls({
  page,
  totalPages,
  basePath,
}: {
  page: number;
  totalPages: number;
  basePath: string;
}) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <Button variant="outline" disabled={page <= 1} asChild={page > 1}>
        {page > 1 ? (
          <Link href={`${basePath}?page=${page - 1}`}>Previous</Link>
        ) : (
          <span>Previous</span>
        )}
      </Button>
      <Button
        variant="outline"
        disabled={page >= totalPages}
        asChild={page < totalPages}
      >
        {page < totalPages ? (
          <Link href={`${basePath}?page=${page + 1}`}>Next</Link>
        ) : (
          <span>Next</span>
        )}
      </Button>
    </div>
  );
}
