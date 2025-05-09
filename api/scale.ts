export async function getAllScaleData(): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scales`, {
    cache: 'no-store', // important if you want *true* server-side fetching every request
  });

  if (!res.ok) {
    throw new Error('Scale: Failed to fetch data');
  }

  return res.json();
}

export async function getScaleData(id: number): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scales/${id}`, {
    cache: 'no-store', // important if you want *true* server-side fetching every request
  });

  if (!res.ok) {
    throw new Error('Scale: Failed to fetch data');
  }

  return res.json();
}
