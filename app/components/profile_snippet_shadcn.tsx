import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Profile_snippet_shadcn() {
  return (
    <Card className="w-96">
      <div className="bg-custom-secondary py-5">
        <img
          className="mx-auto h-24 w-24 rounded-full ring-4 ring-white"
          src="/assets/images/researchers/1.jpg"
        ></img>
      </div>
      <CardContent className="pt-5 text-center">
        <p className="text-lg font-bold">Dr. M.M.A. Shalahuddin Qusar </p>
        <p className="font-medium">Professor</p>
        <p className="font-medium">Deperment of Psychiatry</p>
        <p className="font-medium">BSMMU</p>
        <p className="font-medium">Email : gongajolybiplob@yahoo..com</p>
      </CardContent>
      <CardFooter>
        <Button className="mx-auto bg-sky-600">More</Button>
      </CardFooter>
    </Card>
  );
}
