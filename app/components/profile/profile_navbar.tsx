import { Button } from '@/components/ui/button';

export default function Profile_navbar() {
  return (
    <div className="content-grid mx-auto my-3 flex flex-nowrap items-center justify-center px-5 md:justify-start">
      <Button size="lg" variant="outline" className="mr-3">
        About
      </Button>
      <Button size="lg" variant="outline" className="mr-3">
        Publication
      </Button>
      <Button size="lg" variant="outline">
        Others
      </Button>
    </div>
  );
}
