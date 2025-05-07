import Scale_snippet_shadcn from '../components/scale_snippet_shadcn';
import Section_heading from '../components/section_heading';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scales`, {
    cache: 'no-store', // important if you want *true* server-side fetching every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Scales() {
  const scales = await getData();
  return (
    <div className="mx-10 mb-10">
      <Section_heading heading="Scale" />
      <div className="flex flex-wrap justify-around gap-3">
        {scales?.map((scale: ScaleType) => (
          <Scale_snippet_shadcn key={scale.id} scale={scale} />
        ))}
      </div>
    </div>
  );
}
