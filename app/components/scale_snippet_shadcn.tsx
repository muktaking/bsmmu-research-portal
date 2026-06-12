import { ScaleType } from '@/types/scale';
import Link from 'next/link';
import { User, Calendar, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Scale_snippet_shadcn({ scale }: { scale: ScaleType }) {
  const validationYear = scale.validation_year
    ? new Date(scale.validation_year).getFullYear()
    : 'N/A';

  return (
    <div className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900/50">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <Link
            href={`/scale/${scale.id}`}
            className="text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
          >
            {scale.title}
          </Link>
          {scale.short_title && (
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              {scale.short_title}
            </p>
          )}
        </div>
        <Badge
          variant="secondary"
          className="hidden shrink-0 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 sm:flex"
        >
          Validated Tool
        </Badge>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-1 gap-4 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-2">
        <div className="flex items-start gap-2.5">
          <User size={18} className="mt-0.5 shrink-0 text-slate-400" />
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {scale.validator_name.map((validator, idx) => (
              <span key={validator} className="font-medium">
                {validator}
                {idx < scale.validator_name.length - 1 ? ',' : ''}
              </span>
            ))}
            {scale.validator_name.length === 0 && (
              <span className="italic">Validators unspecified</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Calendar size={18} className="shrink-0 text-slate-400" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Validated in {validationYear}
          </span>
        </div>
      </div>

      {/* Actions & Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-slate-800/50">
        <div className="flex flex-wrap gap-2">
          {scale.tags?.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-md border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500 dark:border-slate-700 dark:text-slate-400"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {scale.publication_link && (
            <Link
              href={scale.publication_link}
              target="_blank"
              className="group/link flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FileText size={16} />
              <span>Publication</span>
              <ExternalLink
                size={14}
                className="-translate-y-0.5 opacity-0 transition-all group-hover/link:translate-y-0 group-hover/link:opacity-100"
              />
            </Link>
          )}
          <Link
            href={`/scale/${scale.id}`}
            className="flex items-center gap-1.5 text-sm font-bold text-slate-900 transition-colors hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
          >
            Details
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
