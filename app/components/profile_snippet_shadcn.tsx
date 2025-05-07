import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ResearcherType } from '@/types/researcher';
import Link from 'next/link';

export default function Profile_snippet_shadcn({
  researcher,
}: {
  researcher: ResearcherType;
}) {
  return (
    <Card className="w-80 grow bg-custom-secondary">
      <CardContent className="flex gap-3 pt-5">
        <img
          className="mx-auto h-16 w-16 rounded-full ring-2 ring-white"
          src={
            researcher.avatar
              ? `/assets/images/researchers/${researcher.avatar}`
              : `/assets/images/researchers/man.png`
          }
        ></img>
        <div className="flex-grow">
          <p className="font-bold">
            {researcher.firstname + ' ' + researcher.lastname}
          </p>
          <p className="text-sm font-medium text-slate-600">
            {researcher.designation}
          </p>
          <p className="text-sm font-medium text-slate-600">
            {researcher.institute}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/researcher/${researcher.id}`}
          className="ml-auto text-sm text-blue-600"
        >
          View Profiles
        </Link>
      </CardFooter>
    </Card>
  );
}
