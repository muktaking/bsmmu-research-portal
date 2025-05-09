import { getAllScaleData } from '@/api/scale';
import Scale_snippet_shadcn from '../components/scale_snippet_shadcn';
import Section_heading from '../components/section_heading';

export default async function Scales() {
  const scales = await getAllScaleData();
  return (
    <div className="mx-10 mb-10">
      <Section_heading heading="Scale" />
      <div className="flex flex-wrap justify-around gap-3">
        {scales?.map((scale: ScaleType) => (
          <Scale_snippet_shadcn key={scale.id} scale={scale} />
        ))}
      </div>
    </div>
  );
}
