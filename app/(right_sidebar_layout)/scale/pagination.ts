export function getPaginatedData<T>({
  searchParams,
  data,
  limit = 10,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  data: T[] | undefined;
  limit?: number;
}) {
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
