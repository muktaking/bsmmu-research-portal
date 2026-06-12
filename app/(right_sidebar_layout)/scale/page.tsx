import { getAllScaleData } from '@/api/scale';
import Scale_snippet_shadcn from '../../components/scale_snippet_shadcn';
import { ScaleType } from '@/types/scale';
import PaginationControls from '@/app/components/pagination_controls';
import { getPaginatedData } from '@/lib/utils';
import { Activity } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-12 lg:px-8">
      {/* Modern Header Section */}
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 shadow-inner">
          <Activity size={32} />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          Validated Research{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Scales
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          Access our comprehensive library of validated psychiatric assessment
          tools developed and translated for the Bangladeshi population.
        </p>
      </div>

      {/* Main Content with Background Decoration */}
      <div className="relative">
        <div className="absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-blue-400/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-orange-400/5 blur-[120px]" />

        <div className="flex flex-col gap-6">
          {currentScales?.map((scale: ScaleType) => (
            <Scale_snippet_shadcn key={scale.id} scale={scale} />
          ))}

          {currentScales?.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 py-24 text-center dark:border-slate-800">
              <Activity
                size={48}
                className="mb-4 text-slate-300 dark:text-slate-700"
              />
              <p className="text-xl font-medium text-slate-400">
                No scales found in this collection.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          basePath="/scale"
        />
      </div>
    </div>
  );
}
