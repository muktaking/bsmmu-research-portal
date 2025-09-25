import { ScaleType } from '@/types/scale';
import Link from 'next/link';

export default function Scale_snippet_shadcn({ scale }: { scale: ScaleType }) {
  return (
    <div className="mb-3 border-b-2 border-stone-300 pb-3">
      <div>
        <Link
          href={`/scale/${scale.id}`}
          className="text-blue-600 hover:underline"
        >
          <p className="font-bold">{scale.title}</p>
        </Link>

        <div>
          {scale.validator_name.map((validator) => (
            <span className="mr-2" key={validator}>
              {validator}
            </span>
          ))}

          <span className="mr-2 text-stone-400">{scale.validation_year}</span>
          <Link
            href={`${scale.publication_link}`}
            className="text-blue-600 hover:underline"
          >
            Publication
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
