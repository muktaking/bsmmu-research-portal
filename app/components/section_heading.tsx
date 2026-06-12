export default function Section_heading({ heading }: { heading: string }) {
  return (
    <div className="mb-6">
      <p className="text-2xl font-extrabold tracking-tight text-stone-900">
        {heading}
      </p>
      <div className="mt-2 h-[3px] w-48 rounded-full bg-gradient-to-r from-amber-600 to-transparent" />
    </div>
  );
}
