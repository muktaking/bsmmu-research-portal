import { getScaleData } from '@/api/scale';
import Section_heading from '@/app/components/section_heading';

type Params = Promise<{ id: number }>;

export default async function Scale({ params }: { params: Params }) {
  const { id } = await params;
  const scale: ScaleType = await getScaleData(id);
  return (
    <div className="mx-7 mb-7">
      <Section_heading heading="Scale Summary" />
      <div className="content-grid mx-auto">
        <p className="text-xl font-bold">{scale.fullname}</p>
        <p className="yas-text-muted my-3">
          Bangla Validation Date: {scale.validation_year}
        </p>
        <div className="mb-3">
          <p className="mb-3 font-bold">Bangla Validators: {scale.validator}</p>
          {/* <div className="flex flex-wrap gap-2">
            {[1, 2].map((e, i) => (
              <Profile_snippet_shadcn key={i} />
            ))}
          </div> */}
        </div>
        <div className="my-3">Tags: {scale.tags.join(',')}</div>
        <div>
          <a href={scale.publication_link} className="link">
            Publication
          </a>
        </div>
        <div className="my-5">
          <p className="font-bold">Rule of Usage</p>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              hendrerit odio sit amet ante placerat ultricies. Suspendisse
              tincidunt neque vitae lorem consequat, nec porttitor odio
              tristique. Suspendisse in dolor eget erat faucibus finibus. Donec
              non nisl congue, fringilla sem consequat, lacinia mauris. Nam
              mattis felis eu nunc consequat, vitae ultricies erat suscipit. Ut
              sodales lacus ac ipsum congue dignissim. Fusce tristique erat eu
              auctor vulputate. Donec dignissim velit vitae dolor placerat, eu
              efficitur mauris tempus. Phasellus nec justo a nulla placerat
              dictum vitae a nulla. Sed mattis urna vel volutpat auctor. Proin
              consequat diam in accumsan consectetur. Donec feugiat lorem a
              justo sollicitudin gravida. Maecenas dapibus metus non tempus
              venenatis
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              hendrerit odio sit amet ante placerat ultricies. Suspendisse
              tincidunt neque vitae lorem consequat, nec porttitor odio
              tristique. Suspendisse in dolor eget erat faucibus finibus. Donec
              non nisl congue, fringilla sem consequat, lacinia mauris. Nam
              mattis felis eu nunc consequat, vitae ultricies erat suscipit. Ut
              sodales lacus ac ipsum congue dignissim. Fusce tristique erat eu
              auctor vulputate. Donec dignissim velit vitae dolor placerat, eu
              efficitur mauris tempus. Phasellus nec justo a nulla placerat
              dictum vitae a nulla. Sed mattis urna vel volutpat auctor. Proin
              consequat diam in accumsan consectetur. Donec feugiat lorem a
              justo sollicitudin gravida. Maecenas dapibus metus non tempus
              venenatis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
