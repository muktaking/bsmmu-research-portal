import { getAllScaleData } from '@/api/scale';
import Scale_snippet_shadcn from '../../components/scale_snippet_shadcn';
import Section_heading from '../../components/section_heading';
import { ScaleType } from '@/types/scale';
import PaginationControls from '@/app/components/pagination_controls';
import { getPaginatedData } from '@/lib/utils';

export default async function Scales(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const allScales: ScaleType[] = await getAllScaleData();

  const {
    currentPageData: currentScales,
    page,
    totalPages,
  } = getPaginatedData({
    searchParams,
    data: allScales,
    limit: 10,
  });

  return (
    <div className="mx-10 mb-10">
      <Section_heading heading="Scale" />
      <div className="flex flex-col gap-3">
        {currentScales?.map((scale: ScaleType) => (
          <Scale_snippet_shadcn key={scale.id} scale={scale} />
        ))}
      </div>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        basePath="/scale"
      />
    </div>
  );
}
