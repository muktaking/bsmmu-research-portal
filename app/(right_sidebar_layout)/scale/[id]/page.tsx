import { getScaleData } from '@/api/scale';
import { ScaleType } from '@/types/scale';
import { Badge } from '@/components/ui/badge';
import ScaleUsageNotice from '@/app/components/scaleUsageNotice';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  User,
  ExternalLink,
  Download,
  Upload,
  FileText,
} from 'lucide-react';

type Params = Promise<{ id: number }>;

export default async function Scale({ params }: { params: Params }) {
  const { id } = await params;
  const scale: ScaleType = await getScaleData(id);

  const scaleServerLink = scale.server_link
    ? `${process.env.NEXT_PUBLIC_API_URL}/${scale.server_link}`
    : null;

  const validationYear = scale.validation_year
    ? new Date(scale.validation_year).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="container relative mx-auto px-4 py-12 lg:px-8">
      {/* Background Decorations */}
      <div className="absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-blue-400/5 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-orange-400/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900">
        {/* Header Section */}
        <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {scale.title}
          </h1>
          {scale.short_title && (
            <p className="text-lg font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {scale.short_title}
            </p>
          )}
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Calendar size={18} className="shrink-0 text-slate-400" />
            <span>Validated on: {validationYear}</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Validators */}
          {scale.validator_name && scale.validator_name.length > 0 && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
                <User size={20} /> Bangla Validators:
              </h2>
              <div className="flex flex-wrap gap-2">
                {scale.validator_name.map((validator) => (
                  <Badge
                    key={validator}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    {validator}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {scale.description && (
            <div>
              <h2 className="mb-3 text-lg font-bold text-slate-800 dark:text-white">
                Description:
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                {scale.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {scale.tags && scale.tags.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-bold text-slate-800 dark:text-white">
                Tags:
              </h2>
              <div className="flex flex-wrap gap-2">
                {scale.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Publication Link */}
          {scale.publication_link && (
            <div>
              <Button asChild variant="link" className="px-0 text-blue-600">
                <Link href={scale.publication_link} target="_blank">
                  <FileText size={18} className="mr-2" /> View Publication
                  <ExternalLink size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* PDF Section */}
        <div className="my-8 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white">
            Document
          </h2>
          {scaleServerLink ? (
            <div className="space-y-4">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Preview:
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-md dark:border-slate-700">
                <iframe
                  src={scaleServerLink}
                  className="h-[600px] w-full"
                  title="Scale PDF Document"
                />
              </div>
              <Button asChild className="w-full sm:w-auto">
                <a
                  href={scaleServerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download size={18} className="mr-2" /> Download Scale PDF
                </a>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-12 text-center dark:border-slate-800">
              <FileText
                size={48}
                className="mb-4 text-slate-300 dark:text-slate-700"
              />
              <p className="mb-4 text-lg font-medium text-slate-500 dark:text-slate-400">
                No PDF document available for this scale.
              </p>
              <Button asChild>
                <Link href={`/manupulation/scale/update-scale/` + id}>
                  <Upload size={18} className="mr-2" /> Upload PDF
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Usage Notice */}
        <div className="my-8 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white">
            Rule of Usage
          </h2>
          <ScaleUsageNotice />
        </div>
      </div>
    </div>
  );
}
