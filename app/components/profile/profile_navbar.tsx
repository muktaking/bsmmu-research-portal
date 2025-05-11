import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Profile_navbar() {
  return (
    <div className="content-grid mx-auto my-3 flex flex-nowrap items-center justify-center px-5 md:justify-start">
      <Link href="#about">
        <Button size="lg" variant="outline" className="mr-3">
          About
        </Button>
      </Link>
      <Link href="#publication">
        <Button size="lg" variant="outline" className="mr-3">
          Publication
        </Button>
      </Link>
      <Link href="#others">
        <Button size="lg" variant="outline">
          Others
        </Button>
      </Link>
    </div>
  );
}
