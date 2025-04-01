import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function Profile_snippet_shadcn() {
  return (
    <Card className="w-max bg-custom-secondary">
      <CardContent className="flex gap-3 pt-5">
        <img
          className="mx-auto h-16 w-16 rounded-full ring-2 ring-white"
          src="/assets/images/researchers/1.jpg"
        ></img>
        <div className="">
          <p className="font-bold">Dr. M.M.A. Shalahuddin Qusar </p>
          <p className="text-sm font-medium text-slate-600">Professor</p>
          <p className="text-sm font-medium text-slate-600">
            Deperment of Psychiatry, BSMMU
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/researcher/1`} className="mx-auto text-sm text-blue-600">
          View Profiles
        </Link>
      </CardFooter>
    </Card>
  );
}
