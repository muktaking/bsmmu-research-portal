export async function getAllArticleData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
    cache: 'no-store', // important if you want *true* server-side fetching every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getArticleDataById(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
    cache: 'no-store', // important if you want *true* server-side fetching every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
