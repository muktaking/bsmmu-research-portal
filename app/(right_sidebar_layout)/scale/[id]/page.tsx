import { getScaleData } from '@/api/scale';
import Section_heading from '@/app/components/section_heading';
import { ScaleType } from '@/types/scale';
import { Badge } from '@/components/ui/badge';
import ScaleUsageNotice from '@/app/components/scaleUsageNotice';

type Params = Promise<{ id: number }>;

export default async function Scale({ params }: { params: Params }) {
  const { id } = await params;
  const scale: ScaleType = await getScaleData(id);
  const scaleServerLink = `${process.env.NEXT_PUBLIC_API_URL}/${scale.server_link}`;
  return (
    <div className="mx-7 mb-7">
      <Section_heading heading="Scale Summary" />
      <div className="content-grid mx-auto">
        <p className="text-xl font-bold">{scale.title}</p>
        <p className="yas-text-muted my-3">
          Bangla Validation Date: {scale.validation_year}
        </p>
        <div className="mb-3">
          <div className="mb-3 font-bold">
            Bangla Validators:{' '}
            {scale.validator_name.map((validator) => (
              <Badge key={validator} className="ml-2">
                {validator}
              </Badge>
            ))}
          </div>
          {/* <div className="flex flex-wrap gap-2">
            {[1, 2].map((e, i) => (
              <Profile_snippet_shadcn key={i} />
            ))}
          </div> */}
        </div>
        <div className="my-3">Tags: {scale.tags?.join(',')}</div>
        <div>
          <a href={scale.publication_link} className="link">
            Publication
          </a>
        </div>

        {scale.server_link && scale.server_link !== '' && (
          <div className="my-8">
            <p className="mb-2 font-bold">Document Preview</p>
            <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm">
              <iframe
                src={scaleServerLink}
                className="h-[600px] w-full"
                title="Scale PDF Document"
              />
            </div>
            <div className="mt-4">
              <a
                href={scaleServerLink}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Download Scale PDF
              </a>
            </div>
          </div>
        )}

        <div className="my-5">
          <p className="font-bold">Rule of Usage</p>
          <ScaleUsageNotice />
        </div>
      </div>
    </div>
  );
}
