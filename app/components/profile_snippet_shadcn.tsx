import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getInstituteKey, ResearcherType } from '@/types/researcher';
import Link from 'next/link';

export default function Profile_snippet_shadcn({
  researcher,
}: {
  researcher: ResearcherType;
}) {
  return (
    <Card className="w-80 grow bg-gray-50">
      <CardContent className="flex gap-3 pt-5">
        <img
          className="mx-auto h-16 w-16 rounded-full ring-2 ring-white"
          src={
            researcher.image !== 'neutral'
              ? `${process.env.NEXT_PUBLIC_API_URL}/${researcher.image}`
              : `/assets/images/researchers/man.png`
          }
        ></img>
        <div className="flex-grow">
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {researcher.firstname + ' ' + researcher.lastname}
          </p>
          {researcher.designation && (
            <p className="text-sm font-medium text-slate-600">
              {researcher.designation}
            </p>
          )}
          {researcher.institute && (
            <p className="font-medium text-muted-foreground">
              Working Place at{' '}
              {getInstituteKey(researcher.institute).toUpperCase()}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="mb-auto">
        <Link
          href={`/researcher/${researcher.id}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.95] dark:bg-blue-600 dark:hover:bg-blue-500 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base"
        >
          View Profiles
        </Link>
      </CardFooter>
    </Card>
  );
}
