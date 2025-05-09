export async function getAllResearcherData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/researchers`, {
    cache: 'no-store', // important if you want *true* server-side fetching every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getResearcherDataById(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/researchers/${id}`,
    {
      cache: 'no-store', // important if you want *true* server-side fetching every request
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
