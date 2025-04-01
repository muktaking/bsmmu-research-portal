import Link from 'next/link';

export default function Scale_snippet_shadcn() {
  return (
    <div className="mb-3 border-b-2 border-stone-300 pb-3">
      <div>
        <p className="font-bold">Beck scale for suicidal ideation</p>
        <div>
          <span className="mr-2">Prof. Md. Kamal Uddin</span>
          <span className="mr-2 text-stone-400">2005</span>
          <Link href="/scale/1" className="text-blue-600 hover:underline">
            publication link
          </Link>
        </div>
      </div>
    </div>
  );
}

/*
full_name
validator
year
link
*/
