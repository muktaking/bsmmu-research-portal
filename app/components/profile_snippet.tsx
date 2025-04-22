import { Button } from '@/components/ui/button';

export default function Profile_snippet() {
  return (
    <div className="mx-auto max-w-max shrink-0 items-center space-y-2 rounded-xl bg-sky-50 p-3 shadow-md sm:flex sm:space-x-2">
      <img
        className="mx-auto h-24 w-24 rounded-full ring-4 ring-sky-300"
        src="/assets/images/researchers/1.jpg"
      ></img>
      <div className="space-y-2 pl-4">
        <div>
          <p className="text-lg font-semibold">Dr. M.M.A. Shalahuddin Qusar</p>
          <p className="font-medium">Professor</p>
          <p className="font-medium">Deperment of Psychiatry</p>
          <p className="font-medium">BSMMU</p>
          <p className="font-medium">Email : gongajolybiplob@yahoo..com</p>
        </div>
        <Button>More</Button>
      </div>
    </div>
  );
}

/*
Name
Designation
Wing
Department
Institute
*/
