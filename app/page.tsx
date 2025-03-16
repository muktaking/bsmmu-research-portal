import Article_scale_section from './components/article_scale_section';
import Hero from './components/hero';
import Profile_snippet_shadcn from './components/profile_snippet_shadcn';
import Section_heading from './components/section_heading';

export default function Home() {
  return (
    <div className="">
      <div className="bg-custom-primary text-white">
        <Hero />
      </div>

      <div className="mb-2 bg-custom-foreground pb-10 pt-7">
        <Section_heading heading="Top Researchers" />
        <div className="flex flex-wrap justify-around gap-5">
          {[1, 2, 3, 4].map((e) => (
            <Profile_snippet_shadcn key={e} />
          ))}
        </div>
      </div>
      {/* Section Article_scale_section */}
      <div className="my-5">
        <Article_scale_section />
      </div>
    </div>
  );
}
