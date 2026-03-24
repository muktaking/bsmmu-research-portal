import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPaginatedData<T>({
  searchParams,
  data,
  limit = 10,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  data: T[] | undefined;
  limit?: number;
}): {
  currentPageData: T[];
  page: number;
  totalPages: number;
} {
  const page = Number(searchParams?.page) || 1;

  if (!data) {
    return {
      currentPageData: [],
      page,
      totalPages: 0,
    };
  }

  const total = data.length;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const end = start + limit;
  const currentPageData = data.slice(start, end);

  return {
    currentPageData,
    page,
    totalPages,
  };
}
